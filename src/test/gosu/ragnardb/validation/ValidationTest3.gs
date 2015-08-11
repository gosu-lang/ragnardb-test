package ragnardb.validation

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Validation
uses ragnardb.RagnarDB

/**
 * Created by klu on 8/11/2015.
 */
class ValidationTest3 {

  @BeforeClass
  static function beforeClass() {
    RagnarDB.setDBUrl("jdbc:h2:mem:validationtest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Validation.SqlSource)
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

}