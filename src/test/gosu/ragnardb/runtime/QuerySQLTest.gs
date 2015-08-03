

package ragnardb.runtime

uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test

uses ragnardb.RagnarDB
uses ragnar.foo.SQLTesting
uses ragnar.foo.MultiSelectOne
uses ragnar.foo.BadQuery1

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Integer
uses java.lang.Math
uses java.util.ArrayList



/**
 * Created by klu on 7/16/2015.
 */
class QuerySQLTest {



  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(SQLTesting.SqlSource)
  }

  @Before
  function clearMain(){
    SQLTesting.Tables.each(\t -> t.deleteAll(true))
    RagnarDB.execStatement( "DELETE FROM Customers" );
  }

  function loadNames():List<String>{
    var br = new BufferedReader(new FileReader("src/test/resources/customers.txt"))
    var x = br.readLine()
    var strings = new ArrayList<String>()
    while(x != null){
      strings.add(x)
      x = br.readLine()
    }
    return strings
  }

  function loadOrders():List<Integer>{
    var br = new BufferedReader(new FileReader("src/test/resources/numbers.txt"))
    var x = br.readLine()
    var ints = new ArrayList<Integer>()
    while(x != null){
      ints.add(Integer.parseInt(x))
      x = br.readLine()
    }
    return ints
  }

  @Test
  function basicSelectTest(){
    var names = loadNames()
    var ad = 1
    for(name in names){
      var x = new SQLTesting.Customer()
      x.CustomerName = name
      x.Address = ad + " Middle St, Nowhere"
      ad++
      x.create()
    }

    var orders = loadOrders()
    var troll = 1
    for(order in orders){
      var y = new SQLTesting.Order()
      y.CustomerID = order
      y.OrderVolume = troll
      y.OrderDate = troll
      troll++
      y.create()
    }

    var MultiSelectResults = MultiSelectOne.execute()
    for(MultiSelectResult in MultiSelectResults){
      print("Order With ID of: " + MultiSelectResult.getCustomerID() + " to " + MultiSelectResult.getAddress() + " at " + MultiSelectResult.getOrderDate())
    }

  }



}

