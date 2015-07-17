package ragnardb.listeners

uses gw.lang.reflect.features.BoundPropertyReference
uses gw.lang.reflect.features.PropertyReference
uses org.junit.*
uses ragnar.foo.Domain
uses ragnardb.RagnarDB
uses ragnardb.plugin.SQLColumnPropertyInfo
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

//  @Ignore
  @Test
  function createPropertyListener() {
    var propRef = Domain.Contact#FirstName

    Assert.assertTrue(propRef typeis PropertyReference)
    Assert.assertTrue(propRef.getPropertyInfo() typeis SQLColumnPropertyInfo)
    Assert.assertFalse(propRef typeis IHasListenableProperties)
    Assert.assertTrue(propRef.getPropertyInfo() typeis IHasListenableProperties)
    print("Domain.Contact#FirstName's PropertyInfo owner is: " + propRef.getPropertyInfo().getOwnersType().getName())

    var context = new Domain.Contact() {
        :FirstName = "Foo"
    }

    Assert.assertEquals("Foo", propRef.get(context))

    propRef.addListener(\contact -> {
      print("Updating FirstName")
//      var fn = contact.FirstName
//      contact.FirstName = fn.toUpperCase()
      contact.LastName = "BAZ"
      return contact.FirstName.toUpperCase()
    })

    context.FirstName = "Bar"

    Assert.assertEquals("Bar", context.FirstName)
    Assert.assertEquals("BAZ", context.LastName)

    (propRef.getPropertyInfo() as SQLColumnPropertyInfo).clearListeners()
  }

  @Test
  function createInstanceListener() {
    var c = new Domain.Contact()
    c.FirstName = "Brian"
    c.Id = 42
    c.create()

    var boundPropRef = c#FirstName
    boundPropRef.get()

    print("Preparing to add instance listener")
    Assert.assertTrue(boundPropRef typeis BoundPropertyReference)
    Assert.assertTrue(boundPropRef.getPropertyInfo() typeis SQLColumnPropertyInfo)
    Assert.assertFalse(boundPropRef typeis IHasListenableProperties)
    Assert.assertTrue(boundPropRef.getPropertyInfo() typeis IHasListenableProperties)
    print("c#FirstName's PropertyInfo owner is: " + boundPropRef.getPropertyInfo().getOwnersType().getName())
    Assert.assertEquals("Brian", boundPropRef.get())

    boundPropRef.addListener(\contact -> {
      print("Updating FirstName")
      contact.LastName = "Moore"
    })

    print("Done adding listener.")

    boundPropRef.set("Kyle")

    print("Done firing listener.")

    Assert.assertEquals("Kyle", c.FirstName)
    Assert.assertEquals("Moore", c.LastName)

//    c#FirstName
//        addListener( \ contact -> {
//      print("Updating FirstName")
//    })

//    Assert.assertEquals(1, c#FirstName.getListeners())

    (boundPropRef.getPropertyInfo() as SQLColumnPropertyInfo).clearListeners()
  }

  @Ignore
  @Test
  function listenForPropertyChange() {
    var c = new Domain.Contact()
    c.FirstName = "Brian"
    c.Id = 42
    c.create()

    Assert.assertEquals("Brian", c.FirstName)
    Assert.assertNull(c.LastName)

    print("Preparing to add listener to Domain.Contact")
//    Domain.Contact.addListener(Domain.Contact#FirstName, \ contact -> {
//      print("Updating FirstName............ and setting last name to Doe")
//      contact.LastName = "Doe"
//    })
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