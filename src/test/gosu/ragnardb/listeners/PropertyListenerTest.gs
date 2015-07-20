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

    propRef.addListener( \ contact -> {
      print("Updating FirstName")
      contact.LastName = "BAZ"
      return contact.FirstName.toUpperCase()
    })

    context.FirstName = "Bar"

    Assert.assertEquals("BAR", context.FirstName)
    Assert.assertEquals("BAZ", context.LastName)

    propRef.clearListeners()
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
      return contact.FirstName
    })

    print("Done adding listener.")

    boundPropRef.set("Kyle")

    print("Done firing listener.")

    Assert.assertEquals("Kyle", c.FirstName)
    Assert.assertEquals("Moore", c.LastName)

    boundPropRef.clearListeners()
  }

  @Test
  function instanceAndPropertyListeners() {
    var c = new Domain.Contact()
    c.FirstName = "Brian"
    c.Id = 42
    c.create()

    Assert.assertEquals("Brian", c.FirstName)
    Assert.assertNull(c.LastName)

    //add bound listener
    c#FirstName.addListener( \ contact -> {
      print("appending 'foo' to ${contact.FirstName}")
      return contact.FirstName + "foo"
    })

    //add property listener
    Domain.Contact#FirstName.addListener( \ contact -> {
      print("upcasing ${contact.FirstName}")
      return contact.FirstName.toUpperCase()
    })

    c.FirstName = "Foo"

    Assert.assertEquals("FOOFOO", c.FirstName)

    Domain.Contact#FirstName.clearListeners() //clear everything

    c.FirstName = "foo"

    Assert.assertEquals("foo", c.FirstName)

  }

}