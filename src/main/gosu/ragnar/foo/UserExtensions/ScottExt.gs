package ragnar.foo.UserExtensions

uses ragnardb.runtime.SQLRecord

class ScottExt extends SQLRecord {

  construct(table:String, id:String) {
    super(table, id)
  }

  public function sayHi(arg : String) : String {
    return("Hi, ${arg}")
  }

  property get MeaningOfLife() : int {
    return 42
  }

}