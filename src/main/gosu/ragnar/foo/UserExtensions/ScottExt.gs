package ragnar.foo.UserExtensions

uses ragnardb.runtime.SQLRecord

class ScottExt extends SQLRecord {

  construct(tableName : String, idColumn : String) {
    super(tableName, idColumn)
  }

  function sayHi(arg : String) : String {
    return("Hi, ${arg}")
  }

  property get MeaningOfLife() : int {
    return 42
  }

}