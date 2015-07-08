uses ragnar.foo.Users

class HelloWorld {

  public construct() {

//    print("Hello world!!")
//    var dummyList : List<String> = {"a", "b", "c"}
//    dummyList.where( \ item -> item.toUpperCase().equals("B")).each( \ elt -> print(elt)) // b
//
//
//
//    dummyList.each( \ elt -> print("Found ${elt}, all hail the Gosu API"))



    //TODO Example#Age exists?
    var x : Users.Contact
    var y : Users.Scott


//    x = Users.Example.get().where( \ c -> c.firstName == "carson")

    print(y.FirstName)

  }

  public construct(someArg : String) {
    this()
    someArg.yellIt()
    print(String.yellSomething(someArg + ", statically"))
  }

}