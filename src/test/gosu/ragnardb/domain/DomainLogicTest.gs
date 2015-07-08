package ragnardb.domain

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Users
uses ragnardb.RagnarDB
uses ragnardb.plugin.ISQLDdlType

class DomainLogicTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement((Users as ISQLDdlType).getSqlSource())
  }

  @Before
  function clearContacts(){
    RagnarDB.execStatement( "DELETE FROM SCOTTS" );
  }

  @Test
  function getDomainLogicMethod() {
    var s = Users.Scott.init()
    s.FirstName = "Scott"
    s.create()

    var scott = Users.Scott.where(Users.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals("Hey, Kyle", scott.sayHi("Kyle"))
  }

  @Test
  function getDomainLogicProperty() {
    var s = Users.Scott.init()
    s.FirstName = "Scott"
    s.create()

    var scott = Users.Scott.where(Users.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals(42, scott.MeaningOfLife)
  }

}