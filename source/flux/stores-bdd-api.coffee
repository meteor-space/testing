if Space?.flux?

  # Add BDD api for testing Space.flux.Store

  Space.Module.registerTestHandler (systemUnderTest) ->
    if isSubclassOf(systemUnderTest, Space.flux.Store)
      return new Space.Module.StoreTest(this, systemUnderTest)

  class Space.Module.StoreTest

    _storeMappingId: null
    _store: null
    _app: null

    constructor: (@_app, storeClass) ->
      @_storeMappingId = @_app.injector.getIdForValue(storeClass)

    given: (state={}) ->
      for key, value of state
        if @_store._reactiveVars[key]?
          @_store._setReactiveVar key, value
        else
          @_store._setSessionVar key, value
      return this

    when: (events) ->
      @_store.on(event) for event in events
      return this

    expect: (state) ->
      storeState = {}
      storeState[key] = @_store[key]() for key of state
      expect(state).toMatch storeState
