package ragnardb.validation

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Validation
uses ragnar.foo.inserts
uses ragnardb.RagnarDB

/**
 * Created by klu on 8/11/2015.
 */
class ValidationTest4 {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:validationtest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Validation.SqlSource)
    RagnarDB.execStatement(inserts.SqlSource)
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
  }

}