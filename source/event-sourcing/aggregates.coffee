
Space.Application.testAggregate = (aggregateClass) ->

  # Setup the test app
  app = new this()
  app.injector.get('Space.eventSourcing.Configuration').useInMemoryCollections = true
  app.start()

  return new AggregateTest app, aggregateClass

class AggregateTest

  _app: null
  _aggregateClass: null
  _aggregate: null
  _commands: null
  _commitStore: null
  _eventBus: null
  _publishedEvents: null

  constructor: (@_app, @_aggregateClass) ->
    @_app.reset() # Cleanup all existing collection data
    @clock = sinon.useFakeTimers('Date')
    @_commands = []
    @_publishedEvents = []
    @_commitStore = @_app.injector.get 'Space.eventSourcing.CommitStore'
    @_eventBus = @_app.injector.get 'Space.messaging.EventBus'

  given: (data) ->

    if _.isArray(data)
      # We have to add a commit with the historic events
      changes = events: data, commands: []
      aggregateId = data[0].sourceId
      version = data[0].version ? 1
      @_commitStore.add changes, aggregateId, version - 1

    else if data instanceof Space.messaging.Command
      # We just send the command through the app and let
      # it handle the creation and saving of the aggregate
      @_commands.push data

    return this

  when: (commands) ->
    @_commands = @_commands.concat commands
    return this

  expect: (expectedEvents) ->
    @_eventBus.onPublish @_addPublishedEvents
    @_sendCommandsThroughApp()
    expect(@_publishedEvents).toMatch expectedEvents
    @_cleanup()

  expectToFailWith: (expectedError) ->
    expect(@_sendCommandsThroughApp).to.throw expectedError.message
    @_cleanup()

  _addPublishedEvents: (event) => @_publishedEvents.push event

  _cleanup: -> @clock.restore()

  _sendCommandsThroughApp: =>
    @_app.send(command) for command in @_commands
