
{Event, Command} = Space.messaging

# ============== COMMANDS ============== #

class AddTodo extends Command
  @type 'AddTodo'
  @fields: {
    id: String
    title: String
  }

# ============== EVENTS ============== #

class TodoListCreated extends Event
  @type 'TodoListCreated'
  @fields: {
    sourceId: String
    title: String
    maxItems: Match.Integer
  }

class TodoAdded extends Event
  @type 'TodoAdded'
  @fields: {
    sourceId: String
    todoId: String
    title: String
  }

class TodoRemoved extends Event
  @type 'TodoRemoved'
  @fields: {
    sourceId: String
    todoId: String
  }

# ============== EXCEPTIONS =========== #

class TooManyItems extends Error
  name: 'TooManyItems'
  constructor: (maxItems, title) ->
    @message = "Cannot add more than #{maxItems} item to list #{title}"

class TodoList extends Space.eventSourcing.Aggregate

  _title: null
  _items: null
  _maxItems: 0

  constructor: (id, title, maxItems) ->
    super(id)
    @record new TodoListCreated {
      sourceId: id
      title: title
      maxItems: maxItems
    }

  @handle TodoListCreated, (event) ->
    @_title = event.title
    @_maxItems = event.maxItems
    @_items = []

  @handle AddTodo, (command) ->
    if @_items.length + 1 > @_maxItems
      throw new TooManyItems @_maxItems, @_title

    @record new TodoAdded {
      sourceId: @getId()
      todoId: command.id
      title: command.title
    }

  @handle TodoAdded, (event) ->
    @_items.push { id: event.todoId, title: event.title }

describe 'Space.testing - aggregates', ->

  beforeEach ->
    @id = '123'
    @title = 'testList'
    @maxItems = 1
    @list = new TodoList @id, @title, 1

  it 'can be used to test resulting events', ->
    todoId = '2'
    todoTitle = 'test'
    TestAggregate(@list)
    .Given()
    .When(new AddTodo id: todoId, title: todoTitle )
    .Then([
      new TodoListCreated(sourceId: @id, title: @title, maxItems: @maxItems)
      new TodoAdded(sourceId: @id, todoId: todoId, title: todoTitle)
    ])

  it 'supports testing errors', ->
    TestAggregate(@list)
    .Given([new TodoAdded sourceId: @id, todoId: '1', title: 'first' ])
    .When(new AddTodo id: '2', title: 'second' )
    .ThenFailWith(new TooManyItems(@maxItems, @title))
