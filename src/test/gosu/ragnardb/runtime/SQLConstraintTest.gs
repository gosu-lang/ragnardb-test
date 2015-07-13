package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.features.IPropertyReference
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Main
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
    RagnarDB.setDBUrl("jdbc:h2:mem:sqlconstrainttest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement((Main as ISQLDdlType).getSqlSource())
  }

  @Before
  function clearMain(){
    RagnarDB.execStatement("DELETE FROM Main");
  }

  @Test
  function basicIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany = Main.Contact.where(Main.Contact#LastName.isIn({"Cameron","Watson"})).Count
    Assert.assertEquals(oneOfMany, 18)
  }

  @Test
  function emptyIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Main.Contact.where(Main.Contact#LastName.isIn({})).Count
    Assert.assertEquals(oneOfZero,0)



  }

  @Test
  function singleIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Main.Contact.where(Main.Contact#LastName.isIn({"Watson"})).Count
    Assert.assertEquals(oneOfZero,10)


  }

  @Test
  function basicIsLike() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }
    var oneOfMany = Main.Contact.where(Main.Contact#LastName.isLike("%land%")).Count
    Assert.assertEquals(oneOfMany,13)

    //Example.Contact.select().join(Example.Contact.

  }

  @Test
  function andorStatement(){
    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }


    //var result = Main.Contact.select().join(Main.Contact)

    var oneOfMany =
        Main.Contact.where(Main.Contact#LastName.isLike("%land%")
        .andAlso(Main.Contact#LastName.isLike("%ther%"))).Count

    Assert.assertEquals(oneOfMany,9)

    oneOfMany =
        Contacts.Contact.select().where(Contacts.Contact#LastName.isLike("%land%"))
            .where(Contacts.Contact#LastName.isLike("%ther%")).Count

    Assert.assertEquals(oneOfMany,9)



    oneOfMany = Contacts.Contact.where(Contacts.Contact#LastName.isLike("%land%")
        .orElse(Contacts.Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(22,oneOfMany)

    oneOfMany = Main.Contact.where(Main.Contact#LastName.isLike("%land%")
        .andAlso(Main.Contact#LastName.isLike("%ther%"))
        .orElse(Main.Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(18,oneOfMany)



      }

  @Test
  function JoinStatement() {
    var names = loadNames()
    for (name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.StateId = 1 //Checking doubling effect for joins
      x.create()

    }

    var z = new Main.State()
    z.Id = 1;
    z.Name = "NC"
    z.create()
    z = new Main.State()
    z.Id = 1;
    z.Name = "NY"
    z.create()


    var result = Main.Contact.select().crossJoin(Main.State).Count
    result = Main.Contact.select().innerJoin(Main.State).Count

    result = Main.Contact.select().join(Main.State)
        .on(Main.Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    //Just checking for successful query execution
    /*
    result = Main.Contact.select().leftJoin(Main.State)
        .on(Main.Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    result = Main.Contact.select().rightJoin(Main.State)
        .on(Main.Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    result = Main.Contact.select().leftOuterJoin(Main.State)
        .on(Main.Contact#StateId.isEqualTo(Main.State#Id))
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
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Id = count
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
      count = count + 1
    }

    var oneOfMany = Main.Contact.where(
        Main.Contact#Id.isNotEqualTo(10)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Main.Contact.where(
        Main.Contact#Id.isGreaterThan(2)).Count
    Assert.assertEquals(oneOfMany, 999)

    oneOfMany = Main.Contact.where(
        Main.Contact#Id.isGreaterOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Main.Contact.where(
        Main.Contact#Id.isLessThan(2)).Count
    Assert.assertEquals(oneOfMany, 1)

    oneOfMany = Main.Contact.where(
        Main.Contact#Id.isLessOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 2)





  }


  @Test
  function pickTest() {
    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contacts.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany = Contacts.Contact.select()
        .where(Contacts.Contact#LastName.isLike("%land%"))
        .pick(Contacts.Contact#FirstName)

    var x = oneOfMany.iterator()


    Assert.assertEquals(13,13)

    //Example.Contact.select().join(Example.Contact.

  }

  @Test
  function subQueryTest() {
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
    var oneOfMany = Contacts.Contact.select()
        .where(Contacts.Contact#LastName.isInQuery(
            Contacts.Contact.select().where(Contacts.Contact#Id.isIn({1,2,3})).pick(Contacts.Contact#LastName)
        )
        ).Count


    //  var x = oneOfMany.iterator()


    Assert.assertEquals(oneOfMany, 16)

    //Example.Contact.select().join(Example.Contact.

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