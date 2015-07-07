package ragnardb.runtime

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnardb.plugin.ISqlDdlType
uses ragnar.foo.Contacts

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Math

/**
 * Created by pjennings on 7/2/2015.
 */
class SQLConstraintTest {



  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    //RagnarDB.execStatement((Contacts as ISqlDdlType).getSqlSource())
  }

  @Before
  function clearContacts(){
    RagnarDB.execStatement("DELETE FROM CONTACTS");
  }




  @Test
  function basicIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = Contacts.Contact.init()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isIn({"Cameron","Watson"})).Count
    Assert.assertEquals(oneOfMany, 18)

  }

  @Test
  function emptyIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = Contacts.Contact.init()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Contacts.Contact.where(Contacts.Contact#LastName.isIn({})).Count
    Assert.assertEquals(oneOfZero,0)

  }

  @Test
  function singleIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = Contacts.Contact.init()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Contacts.Contact.where(Contacts.Contact#LastName.isIn({"Watson"})).Count
    Assert.assertEquals(oneOfZero,10)

  }

  @Test
  function basicIsLike() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = Contacts.Contact.init()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")).Count
    Assert.assertEquals(oneOfMany,13)

  }

  @Test
  function andorStatement(){
    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = Contacts.Contact.init()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany =
        Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")
        .andAlso(Contacts.Contact#LastName.isLike("%ther%"))).Count

    Assert.assertEquals(oneOfMany,9)

    oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")
        .orElse(Contacts.Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(22,oneOfMany)

    oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")
        .andAlso(Contacts.Contact#LastName.isLike("%ther%"))
        .orElse(Contacts.Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(18,oneOfMany)



      }



  function loadNames():List<String>{
    var br = new BufferedReader(new FileReader("src/test/resources/names.txt"))
    var x = br.readLine()
    var strings = {"Sammy Chan"}
    while(x != null){
      strings.add(x)
      x = br.readLine()
    }
    return strings
  }

}