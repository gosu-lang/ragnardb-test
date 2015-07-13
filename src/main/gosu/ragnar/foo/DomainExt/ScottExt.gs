package ragnar.foo.DomainExt

uses ragnar.foo.Domain
uses ragnardb.runtime.RagnarExt
uses ragnardb.runtime.SQLRecord

class ScottExt extends RagnarExt<Domain.Scott> {

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