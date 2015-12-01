chai.use (chai, utils) ->

  chai.Assertion.addMethod 'matchArrayOfStructs', (expected) ->

    actual = this._obj

    for struct, index in actual
      for key, type of struct.fields()
        if _.isFunction(expected[index][key])
          expected[index][key] = struct[key]

    actualString = JSON.stringify(actual, null, 2)
    expectedString = JSON.stringify(expected, null, 2)

    this.assert(
      _.isEqual(actual, expected),
      "expected #{actualString} to match #{expectedString}",
      "",
      actualString,
      expectedString
    )
