
class AggregateTest

  _aggregateClass: null
  _aggregate: null
  _commands: null

  constructor: (@_aggregateClass) ->

  Given: (data) ->
    if _.isArray(data)
      @_aggregate = @_aggregateClass.createFromHistory(data)
    else if data instanceof Space.messaging.Command
      @_aggregate = new @_aggregateClass(data)
    return this

  When: (@_commands) -> return this

  Expect: (expectedEvents) ->
    @_applyCommandsToAggregate()
    expect(@_aggregate.getEvents()).toMatch expectedEvents

  ExpectToFailWith: (expectedError) ->
    expect(@_applyCommandsToAggregate).to.throw expectedError.message

  _applyCommandsToAggregate: =>
    @_aggregate.handle(command) for command in @_commands if @_commands?

@TestAggregate = (aggregate) -> new AggregateTest aggregate
