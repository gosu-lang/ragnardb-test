uses ragnar.foo.Users

class HelloWorld {

  public construct() {

    print("Hello world!!")
    var dummyList : List<String> = {"a", "b", "c"}
    dummyList.each(\elt -> print("Found '${elt}', all hail the Gosu API"))

    //TODO Contacts#Age exists?
    var x : Users.Contacts
    //print(x.Age)
  }

}