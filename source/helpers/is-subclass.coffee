@isSubclassOf = (sub, sup) ->
  isSubclass = new sub() instanceof sup
  isSameClass = sub is sup
  return isSubclass || isSameClass
