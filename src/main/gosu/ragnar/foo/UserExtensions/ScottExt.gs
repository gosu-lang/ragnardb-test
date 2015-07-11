package ragnar.foo.UserExtensions

uses ragnar.foo.Users
uses ragnardb.runtime.RagnarExt
uses ragnardb.runtime.SQLRecord

class ScottExt extends RagnarExt<Users.Scott> {

  construct(table:String, id:String) {
    super(table, id)
  }

  public function sayHi(arg : String) : String {
    return("Hi, ${arg}")
  }

  property get MeaningOfLife() : int {
    return 42
  }

  function sayHiToSelf() : String {
    return Self.sayHi(Self.FirstName)
  }

}