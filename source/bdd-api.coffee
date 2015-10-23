if Space?

  testHandlers = []

  Space.Module.registerTestHandler = (handler) ->

  Space.Module.test = (systemUnderTest) ->
    test = null
    for handler in testHandlers
      returnValue = handler(systemUnderTest)
      test = returnValue if returnValue?
    return test
