uses ragnar.foo.Domain.*
uses ragnar.foo.foo // via PropertiesTypeLoader

class HelloWorld {

  public construct() {

    print("Getting PropertiesType foo.hello:" + foo.hello)
    print("Getting PropertiesType foo.bye:" + foo.bye)
    print("Getting PropertiesType foo.asdf:" + foo.asdf)
//    print("Hello world!!")
//    var dummyList : List<String> = {"a", "b", "c"}
//    dummyList.where( \ item -> item.toUpperCase().equals("B")).each( \ elt -> print(elt)) // b
//
//
//
//    dummyList.each( \ elt -> print("Found ${elt}, all hail the Gosu API"))



    //TODO Example#Age exists?
    var y : Scott

//    x = Main.Example.get().where( \ c -> c.firstName == "carson")

    print(y.FirstName)

  }

  public construct(someArg : String) {
    this()
    someArg.yellIt()
    print(String.yellSomething(someArg + ", statically"))
  }

}