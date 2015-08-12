package ragnardb.validation

uses gw.lang.reflect.TypeSystem
uses org.junit.*
uses ragnar.foo.Validation
uses ragnar.foo.inserts
uses ragnardb.RagnarDB

/**
 * Created by klu on 8/11/2015.
 */
class ValidationTest4 {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:validationtest4;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Validation.SqlSource)
    RagnarDB.execStatement(inserts.SqlSource)
    TypeSystem.refresh(TypeSystem.getCurrentModule())
  }

  @Test
  function validateUnique() {
    ragnar.foo.ValidationExt.ContactExt.setConfigure(4)
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Valid"
    Assert.assertTrue(contact.IsValid)

    contact.FirstName = "Invalid"
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Kai"
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Lu"
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = null
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Valid"
    Assert.assertTrue(contact.IsValid)
  }
  @AfterClass
  static function afterClass() {
    RagnarDB.releaseConnection()
  }

}