package ragnardb.validation

uses gw.lang.reflect.TypeSystem
uses org.junit.*
uses ragnar.foo.Validation
uses ragnar.foo.ValidationExt.ContactExt
uses ragnardb.RagnarDB

/**
 * Created by klu on 8/11/2015.
 */
class ValidatonTest2 {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:validationtes2t;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Validation.SqlSource)
    TypeSystem.refresh(TypeSystem.getCurrentModule())
  }

  @Before
  function clearDomainDB() {
    Validation.Tables.each(\t -> t.deleteAll(true))
  }

  @Test
  function validateRequired() {
    ragnar.foo.ValidationExt.ContactExt.setConfigure(2)
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Name"
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Again"
    Assert.assertFalse(contact.IsValid)

    contact.StateId = 1
    Assert.assertTrue(contact.IsValid)

    contact.FirstName = null
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Take2"
    Assert.assertTrue(contact.IsValid)
  }
  @AfterClass
  static function afterClass() {
    RagnarDB.releaseConnection()
  }

}