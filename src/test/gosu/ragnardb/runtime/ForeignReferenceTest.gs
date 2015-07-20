package ragnardb.runtime

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Main
uses ragnardb.RagnarDB

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Math

/**
 * Created by pjennings on 7/15/2015.
 */


/**
 * Created by pjennings on 7/2/2015.
 */
class ForeignReferenceTest {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:sqlconstrainttest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Main.SqlSource)
  }

  @Before
  function clearMain() {
    Main.Tables.each(\t -> t.deleteAll(true))
  }


  @Test
  function basicForeignReferences() {

    var names = loadNames()
    for (name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random() * 100) as int
      x.create()

    }

    var propertiesWorkLikeThis = Main.Contact#LastName
    var instance = new Main.Contact()
    instance.StateId = 1
    var query = instance.State
    var result = query.getSQLString()

    Assert.assertEquals("SELECT states.*  FROM states   WHERE Id = ?    ", result)

    var stateInstance = new Main.State()
    stateInstance.Id = 1
    var newQuery = stateInstance.Contact
    var newResult = newQuery.getSQLString()

    Assert.assertEquals("SELECT contacts.*  FROM contacts   WHERE StateId = ?    ", newResult)

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
