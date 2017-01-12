describe('Space.testing', function() {

  describe('Classes', () => {

    class BaseClass {}
    class TestClass extends BaseClass {}

    describe('#extend', () => {

      it('checks if a given ES6 class extends another', () => {
        expect(TestClass).to.extend(BaseClass);
      });

      it('checks if a given CoffeScript class extends another', () => {
        class FakeCoffeeScriptClass {}
        // fake CS inheritance structure
        FakeCoffeeScriptClass.__super__ = {
          constructor: BaseClass
        };

        expect(FakeCoffeeScriptClass).to.extend(BaseClass);
      });

      it('throws error if expectations fail', () => {
        const fail = () => expect(TestClass).to.extend({});
        expect(fail).to.throw(Error);
      });
    });
  });
});
