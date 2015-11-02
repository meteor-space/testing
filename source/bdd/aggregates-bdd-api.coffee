# Add BDD api for testing Space.eventSourcing.Aggregate
Space.Module.registerBddApi (app, systemUnderTest) ->
  if !Space.eventSourcing? then return
  if isSubclassOf(systemUnderTest, Space.eventSourcing.Aggregate)
    return new Space.Module.AggregateTest(app)

class Space.Module.AggregateTest

  constructor: (@_app) ->
    @_app.start()
    @fakeDates = sinon.useFakeTimers('Date')
    @_messages = []
    @_publishedEvents = []
    @_expectedEvents = []
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
      @_messages.push data
    return this

  when: (messages) ->
    @_messages = @_messages.concat messages
    return this

  expect: (expectedEvents) ->
    if _.isFunction(expectedEvents)
      @_expectedEvents = expectedEvents()
    else
      @_expectedEvents = expectedEvents
    @_test = =>
      @_sendMessagesThroughApp()
      expect(@_publishedEvents).toMatch @_expectedEvents
    @_run()

  expectToFailWith: (expectedError) ->
    @_test = => expect(@_sendMessagesThroughApp).to.throw expectedError.message
    @_run()

  _run: ->
    @_eventBus.onPublish @_addPublishedEvents
    @_test()
    @_cleanup()

  _addPublishedEvents: (event) =>
    unless @_ignoreNextEvent
      @_publishedEvents.push(event)
    else
      @_ignoreNextEvent = false

  _cleanup: ->
    @fakeDates.restore()
    @_app.reset()

  _sendMessagesThroughApp: =>
    for message in @_messages
      if message instanceof Space.messaging.Command
        @_app.send(message)
      else
        @_ignoreNextEvent = true
        @_app.publish message
