chai.use (chai, utils) ->

  class FakeInjector

    constructor: ->

      @mappings =
        toClass: sinon.spy()
        toSingleton: sinon.spy()
        asSingleton: sinon.spy()
        asStaticValue: sinon.spy()
        toStaticValue: sinon.spy()
        toValue: sinon.spy()
        toReturnValueOf: sinon.spy()

      @map = sinon.stub().returns @mappings

  chai.Assertion.addMethod 'toMap', (mappingName) ->

    module = @_obj

    @assert(
      module instanceof Space.Module,
      "expected #{module} to extend Space.Module",
      "",
      module
    )

    module.injector = new FakeInjector()
    module.configure()

    @assert(
      module.injector.map.calledWith(mappingName),
      "expected module to map #{mappingName}.",
      "",
      mappingName
    )

    @_expectedMappingName = mappingName

    return this

  chai.Assertion.addMethod 'toClass', (expectedClass) ->

    module = this._obj

    mapping = toClass: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.toClass.calledWith(expectedClass),
      "expected module to map #{@_expectedMappingName} to class #{expectedClass}.",
      "",
      expectedClass
    )

  chai.Assertion.addMethod 'asSingleton', ->

    module = this._obj

    mapping = asSingleton: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.asSingleton.callCount is 1,
      "expected module to map #{@_expectedMappingName} as singleton.",
      "",
      @_expectedMappingName
    )

  chai.Assertion.addMethod 'toSingleton', (expectedClass) ->

    module = this._obj

    mapping = toSingleton: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.toSingleton.calledWith(expectedClass),
      "expected module to map #{@_expectedMappingName} to singleton of #{expectedClass}.",
      "",
      expectedClass
    )

  chai.Assertion.addMethod 'toStaticValue', (expectedValue) ->

    module = this._obj

    mapping = toStaticValue: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.toStaticValue.calledWith(expectedValue),
      "expected module to map #{@_expectedMappingName} to static value #{expectedValue}.",
      "",
      expectedValue
    )

  chai.Assertion.addMethod 'asStaticValue', ->

    module = this._obj

    mapping = asStaticValue: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.asStaticValue.callCount is 1,
      "expected module to map #{@_expectedMappingName} as static value.",
      "",
      @_expectedMappingName
    )

  chai.Assertion.addMethod 'toValue', (expectedValue) ->

    module = this._obj

    mapping = toValue: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.toValue.calledWith(expectedValue),
      "expected module to map #{@_expectedMappingName} to value #{expectedValue}.",
      "",
      expectedValue
    )

  chai.Assertion.addMethod 'toReturnValueOf', (expectedFunction) ->

    module = this._obj

    mapping = toReturnValueOf: sinon.spy()
    module.injector.map.withArgs(@_expectedMappingName).returns mapping
    module.start()

    @assert(
      mapping.toReturnValueOf.calledWith(expectedFunction),
      "expected module to map #{@_expectedMappingName} to return value of #{expectedFunction}.",
      "",
      expectedFunction
    )
