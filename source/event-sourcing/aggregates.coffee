
class AggregateTest

  _aggregate: null
  _command: null

  constructor: (@_aggregate) ->

  Given: (events) ->
    @_aggregate.replayHistory(events) if events?
    return this

  When: (@_command) -> return this

  Then: (expectedEvents) ->
    @_aggregate.handle @_command
    expect(@_aggregate.getEvents()).toMatch expectedEvents

  ThenFailWith: (expectedError) ->
    expect(=> @_aggregate.handle @_command).to.throw expectedError.message

@TestAggregate = (aggregate) -> new AggregateTest aggregate
