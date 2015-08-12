package ragnardb.validation

uses gw.lang.reflect.TypeSystem
uses org.junit.*
uses ragnar.foo.Validation
uses ragnardb.RagnarDB

/**
 * Created by klu on 8/11/2015.
 */
class ValidationTest3 {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:validationtest3;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Validation.SqlSource)
    TypeSystem.refresh(TypeSystem.getCurrentModule())
  }

  @Before
  function clearDomainDB() {
    Validation.Tables.each(\t -> t.deleteAll(true))
  }

  @Test
  function validateLength() {
    ragnar.foo.ValidationExt.ContactExt.setConfigure(3)
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Valid"
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "A"
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "PASSWORLDFIELD"
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "ValidName"
    Assert.assertTrue(contact.IsValid)

    contact.LastName = null
    Assert.assertFalse(contact.IsValid)
  }
  @AfterClass
  static function afterClass() {
    RagnarDB.releaseConnection()
  }

}