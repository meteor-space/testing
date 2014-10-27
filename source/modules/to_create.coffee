
chai.use (chai, utils) ->

  class FakeInjector

    constructor: -> @create = sinon.spy()

  chai.Assertion.addMethod 'toCreate', (mappingName) ->

    module = @_obj

    @assert(
      module instanceof Space.Module,
      "expected #{module} to extend Space.Module",
      "",
      module
    )

    module.injector = new FakeInjector()
    module.run()

    @assert(
      module.injector.create.calledWith(mappingName),
      "expected module to create #{mappingName}.",
      "",
      mappingName
    )