package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.features.IPropertyReference
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Main
uses ragnar.foo.Main.*
uses ragnardb.plugin.ISQLDdlType

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Long
uses java.lang.Math

/**
 * Created by pjennings on 7/2/2015.
 */
class SQLConstraintTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:sqlconstrainttest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Main.SqlSource)
  }

  @Before
  function clearMain(){
    Main.Tables.each(\t -> t.deleteAll(true))
  }



  @Test
  function basicIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfMany = Contact.where(Main.Contact#LastName.isIn({"Cameron","Watson"})).Count
    Assert.assertEquals(oneOfMany, 18)
  }

  @Test
  function emptyIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Contact.where(Contact#LastName.isIn({})).Count
    Assert.assertEquals(oneOfZero,0)



  }

  @Test
  function singleIsIn() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }

    var oneOfZero = Contact.where(Contact#LastName.isIn({"Watson"})).Count
    Assert.assertEquals(oneOfZero,10)


  }

  @Test
  function basicIsLike() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }
    var oneOfMany = Contact.where(Contact#LastName.isLike("%land%")).Count
    Assert.assertEquals(oneOfMany,13)

    //Example.Contact.select().join(Example.Contact.

  }

  @Test
  function andorStatement(){
    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }


    //var result = Contact.select().join(Contact)

    var oneOfMany =
        Contact.where(Contact#LastName.isLike("%land%")
        .andAlso(Contact#LastName.isLike("%ther%"))).Count

    Assert.assertEquals(oneOfMany,9)

    oneOfMany = Contact.where(Contact#LastName.isLike("%land%")
        .orElse(Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(22,oneOfMany)

    oneOfMany = Contact.where(Contact#LastName.isLike("%land%")
        .andAlso(Contact#LastName.isLike("%ther%"))
        .orElse(Contact#FirstName.isEqualTo("Donna"))).Count

    Assert.assertEquals(18,oneOfMany)



      }

  @Test
  function JoinStatement() {
    var names = loadNames()
    for (name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
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


    var result = Contact.select().crossJoin(Main.State).Count
    result = Contact.select().innerJoin(Main.State).Count

    result = Contact.select().join(Main.State)
        .on(Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    result = Main.Contact.select().join(Main.State)
        .on(Main.Contact#StateId.isEqualTo(Main.State#Id))
        .join(Main.Company)
        .on(Main.Contact#LastName.isEqualTo(Main.Company#Name))
        .Count

    //Just checking for successful query execution
    /*
    result = Contact.select().leftJoin(Main.State)
        .on(Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    result = Contact.select().rightJoin(Main.State)
        .on(Contact#StateId.isEqualTo(Main.State#Id))
        .Count

    result = Contact.select().leftOuterJoin(Main.State)
        .on(Contact#StateId.isEqualTo(Main.State#Id))
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
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Id = count
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
      count = count + 1
    }

    var oneOfMany = Contact.where(
        Contact#Id.isNotEqualTo(10)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Contact.where(
        Contact#Id.isGreaterThan(2)).Count
    Assert.assertEquals(oneOfMany, 999)

    oneOfMany = Contact.where(
        Contact#Id.isGreaterOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 1000)

    oneOfMany = Contact.where(
        Contact#Id.isLessThan(2)).Count
    Assert.assertEquals(oneOfMany, 1)

    oneOfMany = Contact.where(
        Contact#Id.isLessOrEqual(2)).Count
    Assert.assertEquals(oneOfMany, 2)





  }


  @Test
  function TestOrderBy() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }


    var oneOfMany = Main.Contact.select().where(Main.Contact#LastName.isLike("%land%"))
        .orderBy({Main.Contact#Id.asc(), Main.Contact#StateId.desc()})



    Assert.assertEquals(oneOfMany.Count,13)

    //Example.Contact.select().join(Example.Contact.


  }


  @Test
  function TestLimitOffset() {

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()
    }


    var oneOfMany = Main.Contact.select().where(Main.Contact#LastName.isLike("%land%"))
        .orderBy({Main.Contact#Id.asc(), Main.Contact#StateId.desc()}).limit(10)


    oneOfMany = Main.Contact.select().where(Main.Contact#LastName.isLike("%s%"))
        .orderBy({Main.Contact#Id.asc(), Main.Contact#StateId.desc()}).limit(10).offset(10)





    Assert.assertEquals(oneOfMany.Count,10)

    //Example.Contact.select().join(Example.Contact.


  }

  @Test
  function IsNullTest() {

    var names = loadNames()

      var x = new Main.Contact()
      x.FirstName = "Patrick"
      x.LastName = "Jennings"
      x.Age = 5
      x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()


    var oneOfMany = Main.Contact.select().where(Main.Contact#Age.isNull())

    Assert.assertEquals(oneOfMany.Count, 2)


    oneOfMany = Main.Contact.select().where(Main.Contact#Age.isNotNull())

    Assert.assertEquals(oneOfMany.Count,1)

    //Example.Contact.select().join(Example.Contact.


  }


  @Test
  function UnionTest() {

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()


    var oneOfMany = Main.Contact.select().where(Main.Contact#Age.isNull()).union(
       Main.Contact.select().where(Main.Contact#Age.isNotNull())
    )

    Assert.assertEquals(oneOfMany.Count, 3)

    //From here just checking for sucessful execution



    var y = Main.Contact.select().where(Main.Contact#Age.isNull()).unionAll(
        Main.Contact.select().where(Main.Contact#Age.isNotNull())).Count

    y = Main.Contact.select().where(Main.Contact#Age.isNull()).intersect(
        Main.Contact.select().where(Main.Contact#Age.isNotNull())).Count


    y = Main.Contact.select().where(Main.Contact#Age.isNull()).except(
        Main.Contact.select().where(Main.Contact#Age.isNotNull())).Count





    //Example.Contact.select().join(Example.Contact.


  }

  @Test
  function NotTest() {

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()


    var oneOfMany = Main.Contact.select().where(SQLConstraint.not(Main.Contact#Age.isNull())
    )



    Assert.assertEquals(oneOfMany.Count,1)






  }

  @Test
  function CountTest(){

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    var oneOfMany = Main.Contact.select().where(SQLConstraint.not(Main.Contact#Age.isNull())).count(Main.Contact#FirstName)

    for (one in oneOfMany){
      Assert.assertEquals( new Long(1) ,one )
    }


    oneOfMany = Main.Contact.select().count()

    for (one in oneOfMany){
      Assert.assertEquals( new Long(3) ,one )
    }
  }

  @Test
  function MaxMinTest(){

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 6
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 4
    x.create()

    var oneOfMany = Main.Contact.select().max(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(6 ,one )
    }

    oneOfMany = Main.Contact.select().min(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(4 ,one )
    }

    oneOfMany = Main.Contact.select().sum(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(new Long(15) ,one )
    }

    oneOfMany = Main.Contact.select().avg(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(5 ,one )
    }
  }

  @Test
  function DistinctTest(){

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 4
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 6
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 6
    x.create()

    var oneOfMany = Main.Contact.select().countDistinct(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals( new Long(3) ,one )
    }


    oneOfMany = Main.Contact.select().maxDistinct(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(6 ,one )
    }

    oneOfMany = Main.Contact.select().minDistinct(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(4 ,one )
    }

    oneOfMany = Main.Contact.select().sumDistinct(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(new Long(15) ,one )
    }

    oneOfMany = Main.Contact.select().avgDistinct(Main.Contact#Age)

    for (one in oneOfMany){
      Assert.assertEquals(5 ,one )
    }

  }

  @Test
  function StringAggregateTest(){

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Laurel"
    x.LastName = "Jennings"
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.create()

    var oneOfMany = Main.Contact.select().groupConcat(Main.Contact#FirstName)

    for (one in oneOfMany){
      Assert.assertEquals( "Patrick,Laurel,Patrick" ,one )
    }


    oneOfMany = Main.Contact.select().count().groupConcatDistinct(Main.Contact#FirstName)

    for (one in oneOfMany){
      Assert.assertEquals( "Laurel,Patrick" ,one )
    }
  }

  @Test
  function groupByTest(){

    var names = loadNames()

    var x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 5
    x.create()

    x = new Main.Contact()
    x.FirstName = "Laurel"
    x.LastName = "Jennings"
    x.Age = 4
    x.create()

    x = new Main.Contact()
    x.FirstName = "Patrick"
    x.LastName = "Jennings"
    x.Age = 6
    x.create()

    var oneOfMany = Main.Contact.select().sum(Main.Contact#Age).groupBy(Main.Contact#FirstName)

    var y = 1
    for (one in oneOfMany){
      if(y == 1) {
        Assert.assertEquals(new Long(4), one)
      } else {
        Assert.assertEquals(new Long(11), one)
      }
      y++
    }

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