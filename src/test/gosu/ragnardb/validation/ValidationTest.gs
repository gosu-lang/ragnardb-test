package ragnardb.validation

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Validation
uses ragnar.foo.Validation.*

/**
 * Created by carson on 8/10/15.
 */
class ValidationTest {

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
  function validateFormat() {
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Name"
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Name"
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Gosu"
    Assert.assertTrue(contact.IsValid)

    contact.FirstName = ""
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Name"
    Assert.assertTrue(contact.IsValid)
  }

}