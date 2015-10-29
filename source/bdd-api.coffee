if Space?

  registeredBddApis = []

  Space.Module.registerBddApi = (api) -> registeredBddApis.push api

  Space.Module.test = (systemUnderTest, app=null) ->
    test = null
    isModule = isSubclassOf(this, Space.Module)
    isApplication = isSubclassOf(this, Space.Application)

    # Wrap modules into stub app to make dependency injection work
    if !app?
      if isApplication
        app = this
      else
        app = Space.Application.create RequiredModules: [this.publishedAs]

    test = api(app, systemUnderTest) for api in registeredBddApis

    if not test? then throw new Error "No testing API found for #{systemUnderTest}"
    return test
