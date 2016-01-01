chai.use (chai, utils) ->

  chai.Assertion.addMethod 'containArrayOfStructs', (expected) ->

    actual = this._obj

    untestedProperties = ['timestamp', 'version', 'meta']

    for struct, index in actual
      for key, type of struct.fields()
        if _.isFunction(expected[index][key])
          # Check that the actual value is of the expected type
          check struct[key], expected[index][key]
          # Copy over the actual value, so that they are equal
          expected[index][key] = struct[key]
        else if _.contains(untestedProperties, key)
          delete expected[index][key]
          delete struct[key]

    # Format for error messages
    actualString = JSON.stringify(actual, null, 2)

    for struct, index in expected
      structString = JSON.stringify(struct, null, 2)
      this.assert(
        _.any(actual, (item) -> _.isEqual(item, struct) ),
        "Expected Struct #{structString} not contained in #{actualString}"
      )
