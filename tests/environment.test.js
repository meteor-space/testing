describe('setting the testing environment', function() {

  it('sets a testing flag', function() {
    expect(Meteor.isTesting).to.be.true;
  });

});