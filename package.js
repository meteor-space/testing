Package.describe({
  summary: 'Helpers for Testing Space Applications and Modules.',
  name: 'space:testing',
  version: '1.4.0',
  git: 'https://github.com/meteor-space/testing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'practicalmeteor:munit@2.1.4',
  ]);

  api.addFiles([
    'source/classes/depend_on.coffee',
    'source/classes/extend.coffee',
    'source/modules/to_map.coffee',
    'source/modules/to_create.coffee',
    'source/sinon/to_match.coffee',
    'source/event-sourcing/aggregates.coffee',
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'space:base',
    'space:event-sourcing@1.1.0',
    'space:testing',
    'practicalmeteor:munit@2.1.4',
  ]);

  api.addFiles([
    'tests/classes/depend_on.integration.coffee',
    'tests/classes/extend.spec.coffee',
    'tests/modules/to_map.integration.coffee',
    'tests/modules/to_create.integration.coffee',
    'tests/sinon/to_match.integration.coffee',
    'tests/event-sourcing/aggregates.spec.coffee',
  ]);

});
