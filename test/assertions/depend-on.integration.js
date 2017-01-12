describe('Space.testing', () => {

  describe('Classes', function() {

    class TestClass {
      static initClass() {
        this.prototype.Dependencies = {
          first: 'first',
          second: 'second'
        };
      }
    }
    TestClass.initClass();

    describe('#dependOn', function() {

      it('checks if a given class depends on other stuff', () =>
        expect(TestClass).to.dependOn({
          first: 'first',
          second: 'second'
        }));

      it('throws nice error if expectations fail', function() {
        const fail = () => expect(TestClass).to.dependOn({first: 'first'});
        expect(fail).to.throw(Error);
      });
    });
  });
});
