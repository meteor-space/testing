Package.describe({
  summary: 'Helpers for Testing Space Applications and Modules.',
  name: 'space:testing',
  version: '1.1.1',
  git: 'https://github.com/CodeAdventure/space-testing.git'
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'practicalmeteor:munit@2.0.2',
  ]);

  api.addFiles([
    'source/classes/depend_on.coffee',
    'source/modules/to_map.coffee',
    'source/modules/to_create.coffee',
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'space:base',
    'space:testing',
    'practicalmeteor:munit@2.0.2',
  ]);

  api.addFiles([
    'tests/classes/depend_on.integration.coffee',
    'tests/modules/to_map.integration.coffee',
    'tests/modules/to_create.integration.coffee',
  ]);

});
