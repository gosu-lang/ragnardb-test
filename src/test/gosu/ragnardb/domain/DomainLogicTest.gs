package ragnardb.domain

uses org.junit.*
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
    var s = new Users.Scott()
    s.FirstName = "Scott"
    s.create()

    var scott = Users.Scott.where(Users.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals("Hi, Kyle", scott.sayHi("Kyle"))
  }

  @Test
  @Ignore
  function getDomainLogicProperty() {
    var s = new Users.Scott()
    s.FirstName = "Scott"
    s.create()

    var scott = Users.Scott.where(Users.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals(42, scott.MeaningOfLife)
  }

}