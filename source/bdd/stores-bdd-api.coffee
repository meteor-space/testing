# Add BDD api for testing Space.flux.Store
Space.Module.registerBddApi (app, systemUnderTest) ->
  if !Space.flux? then return
  if isSubclassOf(systemUnderTest, Space.flux.Store)
    return new Space.Module.StoreTest(app, systemUnderTest)

class Space.Module.StoreTest

  _storeMappingId: null
  _store: null
  _app: null
  _givenMessages: null

  constructor: (@_app, storeClass) ->
    @_app.reset()
    @_app.start()
    @_storeMappingId = @_app.injector.getIdForValue(storeClass)
    @_store = @_app.injector.get(@_storeMappingId)
    @_givenMessages = []

  given: (state={}) ->
    for key, value of state
      if @_store._reactiveVars[key]?
        @_store._setReactiveVar key, value
      else
        @_store._setSessionVar key, value
    return this

  when: (messages) ->
    try
      for message in messages
        if message instanceof Space.messaging.Event
          @_store.on(message)
        if message instanceof Space.messaging.Command
          @_app.send(message)
    finally
      @_app.stop()
      return this

  expect: (state) ->
    Tracker.flush()
    storeState = {}
    storeState[key] = @_store[key]() for key of state
    expect(state).toMatch storeState
