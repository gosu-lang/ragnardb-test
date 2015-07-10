package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.features.IPropertyReference
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Contacts
uses ragnardb.plugin.ISQLDdlType

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
    RagnarDB.execStatement((Contacts as ISQLDdlType).getSqlSource())
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
      var x = new Contacts.Contact()
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
      var x = new Contacts.Contact()
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
      var x = new Contacts.Contact()
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
      var x = new Contacts.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }
    var oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")).Count
    Assert.assertEquals(oneOfMany,13)

    //Example.Contact.select().join(Example.Contact.

  }

  @Test
  function andorStatement(){
    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contacts.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }


    //var result = Contacts.Contact.select().join(Contacts.Contact)

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

  @Test
  function JoinStatement() {
    var names = loadNames()
    for (name in names) {
      var y = name.split("[ \t]")
      var x = new Contacts.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.StateId = 1 //Checking doubling effect for joins
      x.create()

    }

    var z = new Contacts.State()
    z.Id = 1;
    z.Name = "NC"
    z.create()
    z = new Contacts.State()
    z.Id = 1;
    z.Name = "NY"
    z.create()


    var result = Contacts.Contact.select().crossJoin(Contacts.State).Count
    result = Contacts.Contact.select().innerJoin(Contacts.State).Count

    result = Contacts.Contact.select().join(Contacts.State)
        .on(Contacts.Contact#StateId.isEqualTo(Contacts.State#Id))
        .Count

    //Just checking for successful query execution
    /*
    result = Contacts.Contact.select().leftJoin(Contacts.State)
        .on(Contacts.Contact#StateId.isEqualTo(Contacts.State#Id))
        .Count

    result = Contacts.Contact.select().rightJoin(Contacts.State)
        .on(Contacts.Contact#StateId.isEqualTo(Contacts.State#Id))
        .Count

    result = Contacts.Contact.select().leftOuterJoin(Contacts.State)
        .on(Contacts.Contact#StateId.isEqualTo(Contacts.State#Id))
        .Count

    */

    //Assert.assertEquals(2002,result)
  }

  @Test
  function fullComparatorTest() {

    var names = loadNames()
    var count = 1
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contacts.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Id = count
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
      count = count + 1
    }

    var oneOfMany = Contacts.Contact.where(
        Contacts.Contact#Id.isNotEqualTo(10)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Contacts.Contact.where(
        Contacts.Contact#Id.isGreaterThan(2)).Count
    Assert.assertEquals(oneOfMany, 999)

    oneOfMany = Contacts.Contact.where(
        Contacts.Contact#Id.isGreaterOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Contacts.Contact.where(
        Contacts.Contact#Id.isLessThan(2)).Count
    Assert.assertEquals(oneOfMany, 1)

    oneOfMany = Contacts.Contact.where(
        Contacts.Contact#Id.isLessOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 2)





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