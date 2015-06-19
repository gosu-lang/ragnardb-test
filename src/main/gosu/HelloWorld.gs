class HelloWorld {

  public construct() {
    print("Hello world!!")
    var dummyList : List<String> = {"a", "b", "c"}
    dummyList.each(\elt -> print("Found '${elt}', all hail the Gosu API"))
  }

}