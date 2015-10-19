if Space?.flux?
  # Add BDD api as method on application instances
  Space.flux.Store.given = ->
    storeClass = this
    # Create a simple space application with the store mapped as singleton
    # so we dont have to provide all dependencies manually
    app = Space.Application.create {
      RequiredModules: ['Space.flux']
      onInitialize: -> @injector.map('Store').toSingleton(storeClass)
      onStart: -> @injector.create 'Store'
    }
    app.start()
    test = new StoreIntegrationTest app.injector.get('Store')
    test.given.apply test, arguments
    return test

class StoreIntegrationTest

  _store: null

  constructor: (@_store) ->

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

  expectState: (state) ->
    storeState = {}
    storeState[key] = @_store[key]() for key of state
    expect(state).toMatch storeState
