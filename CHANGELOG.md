Changelog
=========

### 1.4.1
Use `.Expect` instead of `.Then` for BDD style aggregate tests.

### 1.4.0
Introduces aggregate tests in nice BDD style like this:
```coffeescript
TestAggregate(@list)
.Given([new TodoAdded sourceId: @id, todoId: '1', title: 'first' ])
.When(new AddTodo id: '2', title: 'second' )
.ThenFailWith(new TooManyItems(@maxItems, @title))
```

### 1.2.1

Adds `to.extend` assertion for Coffeescript classes.

### 1.1.1

Updates munit package name to avoid console warnings

### 1.1.0

Adds `toCreate` assertion for space modules which checks if
a module eagerly creates an instance of a singleton.

### 1.0.0

Initial release
