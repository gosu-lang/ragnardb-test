package ragnardb.domain

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Domain
uses ragnardb.RagnarDB
uses ragnardb.plugin.ISQLDdlType

class DomainLogicTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:domainlogictest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement((Users as ISQLDdlType).getSqlSource())
  }

  @Before
  function clearContacts(){
    RagnarDB.execStatement( "DELETE FROM SCOTTS" );
  }

  @Test
  function getDomainLogicMethod() {
    var s = new Domain.Scott()
    s.FirstName = "Scott"
    s.create()

    var scott = Domain.Scott.where(Domain.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals("Hi, Kyle", scott.sayHi("Kyle"))
  }

  @Test
  function selfReferenceWorks() {
    var scott = new Domain.Scott() {
      :FirstName = "Scott"
    }

    Assert.assertEquals("Hi, Scott", scott.sayHiToSelf())
  }

  @Test
  function getDomainLogicProperty() {
    var s = new Domain.Scott()
    s.FirstName = "Scott"
    s.create()

    var scott = Domain.Scott.where(Domain.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertNotNull(scott)
    Assert.assertEquals(42, scott.MeaningOfLife)
  }

}