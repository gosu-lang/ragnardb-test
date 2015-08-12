package ragnardb.validation

uses gw.lang.reflect.TypeSystem
uses org.junit.*
uses ragnar.foo.ValidationExt.ContactExt
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
    TypeSystem.refresh(TypeSystem.getCurrentModule())
  }

  @Before
  function clearDomainDB() {
    Validation.Tables.each(\t -> t.deleteAll(true))
  }

  @Test
  function validateFormat() {
    ContactExt.setConfigure(1)
    var contact = new Validation.Contact()
    Assert.assertFalse(contact.IsValid)
    var isSaved = contact.save()
    Assert.assertFalse(isSaved)
    var errors = contact.errors
    for(var error in errors.values()){
      for(var errorMsg in error){
        print(errorMsg)
      }
    }

    contact.FirstName = "Name"
    Assert.assertFalse(contact.IsValid)

    contact.LastName = "Name"
    Assert.assertFalse(contact.IsValid)
    isSaved = contact.save()
    Assert.assertFalse(isSaved)
    errors = contact.errors
    for(var error in errors.values()){
      for(var errorMsg in error){
        print(errorMsg)
      }
    }

    contact.LastName = "Gosu"
    Assert.assertTrue(contact.IsValid)
    isSaved = contact.save()
    Assert.assertTrue(isSaved)

    contact.FirstName = ""
    Assert.assertFalse(contact.IsValid)

    contact.FirstName = "Name"
    Assert.assertTrue(contact.IsValid)
  }

  @AfterClass
  static function afterClass() {
    RagnarDB.releaseConnection()
  }


}