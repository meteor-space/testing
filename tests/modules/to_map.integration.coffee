
describe 'Space.testing', ->

  describe 'Modules', ->

    class TestClass
      @toString: -> 'TestClass'

    class TestModule extends Space.Module

      configure: ->
        @injector.map(TestClass).asSingleton()
        @injector.map('ToSingleton').toSingleton TestClass
        @injector.map('ToClass').toClass TestClass
        @injector.map('ToStaticValue').toStaticValue TestClass
        @injector.map('AsStaticValue').asStaticValue()
        @injector.map('ToValue').toValue(TestClass)
        @injector.map('ToReturnValue').toReturnValueOf(TestClass)

    beforeEach ->
      @module = new TestModule()

    describe '#toMap', ->

      it 'checks if a given module maps as singletons', ->
        expect(@module).toMap(TestClass).asSingleton()

      it 'checks if a given module maps to singleton', ->
        expect(@module).toMap('ToSingleton').toSingleton TestClass

      it 'checks if a given module maps to class', ->
        expect(@module).toMap('ToClass').toClass TestClass

      it 'checks if a given module maps something to static value', ->
        expect(@module).toMap('ToStaticValue').toStaticValue TestClass

      it 'checks if a given module maps something as static value', ->
        expect(@module).toMap('AsStaticValue').asStaticValue()

      it 'checks if a given module maps something to value', ->
        expect(@module).toMap('ToValue').toValue(TestClass)

      it 'checks if a given module maps something to return value', ->
        expect(@module).toMap('ToReturnValue').toReturnValueOf(TestClass)