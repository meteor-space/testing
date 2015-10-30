
{Event, Command} = Space.messaging

# ============== COMMANDS ============== #

class CreateTodoList extends Command
  @type 'CreateTodoList'
  @fields: {
    title: String
    maxItems: Match.Integer
  }

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
    title: String
    maxItems: Match.Integer
  }

class TodoAdded extends Event
  @type 'TodoAdded'
  @fields: {
    todoId: String
    title: String
  }

class TodoRemoved extends Event
  @type 'TodoRemoved'
  @fields: {
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

  commandMap: -> {

    CreateTodoList: (command) ->
      @record new TodoListCreated {
        sourceId: @getId()
        title: command.title
        maxItems: command.maxItems
      }

    AddTodo: (command) ->
      if @_items.length + 1 > @_maxItems
        throw new TooManyItems @_maxItems, @_title
      @record new TodoAdded {
        sourceId: @getId()
        todoId: command.id
        title: command.title
      }

  }

  eventMap: -> {

    TodoListCreated: (event) ->
      @_title = event.title
      @_maxItems = event.maxItems
      @_items = []

    TodoAdded: (event) -> @_items.push { id: event.todoId, title: event.title }
  }

class TodoListRouter extends Space.eventSourcing.Router
  Aggregate: TodoList
  InitializingCommand: CreateTodoList
  RouteCommands: [AddTodo]

class TodoListApplication extends Space.Application

  RequiredModules: ['Space.eventSourcing']

  Configuration: {
    appId: 'TodoListApplication'
    eventSourcing: {
      commitsCollection: new Mongo.Collection('test_commits_collection')
    }
  }

  beforeStart: -> @injector.map(TodoListRouter).asSingleton()

  afterStart: ->
    @reset()
    @injector.create(TodoListRouter)

describe 'Space.testing - aggregates', ->

  beforeEach ->
    @id = '123'
    @title = 'testList'
    @maxItems = 1

  it 'can be used to test resulting events', ->

    todoId = '2'
    todoTitle = 'test'

    TodoListApplication.test(TodoList)
    .given(
      new CreateTodoList targetId: @id, title: @title, maxItems: @maxItems
    )
    .when([
      new AddTodo targetId: @id, id: todoId, title: todoTitle
    ])
    .expect([
      new TodoListCreated(
        sourceId: @id
        version: 1
        title: @title
        maxItems: @maxItems
      )
      new TodoAdded(
        sourceId: @id
        version: 2
        todoId: todoId
        title: todoTitle
      )
    ])

  it 'supports testing errors', ->

    TodoListApplication.test(TodoList)
    .given([
      new TodoListCreated(
        sourceId: @id
        version: 1
        title: @title
        maxItems: @maxItems
      ),
      new TodoAdded(
        sourceId: @id
        version: 2
        todoId: '1'
        title: 'first'
      )
    ])
    .when([
      new AddTodo(targetId: @id, id: '2', title: 'second')
    ])
    .expectToFailWith(
      new TooManyItems(@maxItems, @title)
    )
