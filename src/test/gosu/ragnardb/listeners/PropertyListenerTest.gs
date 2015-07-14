package ragnardb.listeners

uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnar.foo.Domain
uses ragnardb.RagnarDB
uses ragnardb.plugin.SQLTableType
uses ragnardb.runtime.IHasListenableProperties
uses ragnardb.runtime.SQLRecord

class PropertyListenerTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:PropertyListenerTest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Domain.SqlSource)
  }

  @Before
  function clearContacts(){
    RagnarDB.execStatement( "DELETE FROM CONTACTS" );
  }

  @Test
  function listenForPropertyChange() {
    var c = new Domain.Contact()
    c.FirstName = "Brian"
    c.Id = 42
    c.create()

    Assert.assertEquals("Brian", c.FirstName)
    Assert.assertNull(c.LastName)

    print("Preparing to add listener to Domain.Contact")
    Domain.Contact.addListener(Domain.Contact#FirstName, \ theType -> {
      print("Updating FirstName............ and setting last name to Doe")
      (theType as Domain.Contact).LastName = "Doe"
    })
    print("Done adding listener.")

//    (c as SQLTableType).addListener(c#FirstName, \ etx -> {
//      /*etx.equals("John") ?*/
//      print("Updating FirstName: " + etx.toString())
//      /*etx#LastName = "Doe"*/ //this should be etx.LastName, and etx should know its own type
//    })

    c = Domain.Contact.findById(42)
    print("listener should be firing next")
    c.FirstName = "John"
    print("listener should have just fired")
    c.Id = 42
    (c as SQLRecord).update()

    c.Id = 99
    (c as SQLRecord).update()

    c = Domain.Contact.findById(42)

    var d = Domain.Contact.findAllById(99) //no-op

    Assert.assertEquals("John", c.FirstName)
//    Assert.assertNull(c.LastName)
    Assert.assertEquals("Doe", c.LastName)

    Assert.assertFalse(d.isHasElements()) //d is empty
  }

}