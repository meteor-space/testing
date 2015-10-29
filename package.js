Package.describe({
  summary: 'Helpers for Testing Space Applications and Modules.',
  name: 'space:testing',
  version: '2.0.1',
  git: 'https://github.com/meteor-space/testing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'underscore',
    'reactive-var',
    'reactive-dict',
    'space:base@3.1.0',
    'practicalmeteor:munit@2.1.5',
  ]);

  api.addFiles([
    'source/helpers/is-subclass.coffee',
    'source/classes/depend_on.coffee',
    'source/classes/extend.coffee',
    'source/sinon/to_match.coffee',
    'source/bdd-api.coffee',
    'source/event-sourcing/aggregates.coffee',
    'source/flux/stores-bdd-api.coffee',
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'mongo',
    'underscore',
    'space:testing',
    'space:event-sourcing@2.0.0',
    'space:flux@0.6.0',
    'practicalmeteor:munit@2.1.5',
  ]);

  api.addFiles([
    'tests/classes/depend_on.integration.coffee',
    'tests/classes/extend.spec.coffee',
    'tests/sinon/to_match.integration.coffee',
    'tests/event-sourcing/aggregates.spec.coffee',
  ]);

});
