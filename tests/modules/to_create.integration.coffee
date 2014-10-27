
describe 'Space.testing', ->

  describe 'Modules', ->

    class TestClass
      @toString: -> 'TestClass'

    class TestModule extends Space.Module

      configure: ->
        @injector.map(TestClass).asSingleton()

      run: ->
      	@injector.create TestClass

    beforeEach ->
      @module = new TestModule()

    describe '#toCreate', ->

      it 'checks if a given module creates an instance', ->
        expect(@module).toCreate TestClass