package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.IType
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Contacts //TODO move to proper test resource folder such as src/test/resources/ragnar/runtime/test/Contacts.ddl
uses ragnardb.plugin.ISqlDdlType

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Integer
uses java.lang.Math

class QueryBootstrapTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement((Contacts as ISqlDdlType).getSqlSource())
  }

  @Before
  function clearContacts(){
    RagnarDB.execStatement( "DELETE FROM CONTACTS" );
  }

  function loadNames():List<String>{
    var br = new BufferedReader(new FileReader("src/test/resources/names.txt"))
    var x = br.readLine()
    var strings = {"Sammy Chan"}
    while(x != null){
      strings.add(x)
      x = br.readLine()
    }
    return strings
  }

  @Test
  function basicWhereWorks(){

    var c : Contacts.Contact
    c = Contacts.Contact.init()
    c.FirstName = "Kai"
    c.create()

    var x = Contacts.Contact.findByFirstName('Kai')
    Assert.assertEquals("Kai", x.FirstName)

//    var carson = Contact.where( Contact#FirstName.isEqualTo( "Carson" ) ).first()
//
//    Assert.assertEquals( "Carson", carson.FirstName )
//    Assert.assertEquals( "Gross", carson.LastName )
//    Assert.assertEquals( 39, carson.Age )
//
//    Assert.assertNull(Contact.where(Contact#FirstName.isEqualTo("Scott")).first())
  }

  @Test
  function basicSelects(){
//    new Contacts.Contact(){
//      :FirstName = "Kai",
//        :LastName = "Lu",
//        :Age = 19
//    }.create()
//


//    var names = loadNames()
//    for(name in names) {
//      var x = new Contacts.Contact(){
//        :FirstName = name.split("[ \\s]")[0],
//          :LastName = name.split("[ \\s]")[1],
//          :Age = Math.ceil(Math.random()*100) as int
//      }.create()
//    }

//    var kai = Contacts.Contact.findByFirstName("Kai")
//    Assert.assertEquals("Kai", kai.FirstName)
//    Assert.assertEquals("Lu", kai.LastName)
//    Assert.assertEquals(19, kai.Age)


  }




//  @Test
//  function basicMultipleContact(){
//
//    new Contact(){
//        :FirstName = "Carson",
//        :LastName = "Gross",
//        :Age = 39
//        }.create()
//
//    new Contact(){
//        :FirstName = "Carson",
//        :LastName = "Gross",
//        :Age = 6
//        }.create()
//
//
//    var carson = Contact.where( Contact#FirstName.isEqualTo( "Carson" ) ).first()
//
//    Assert.assertEquals( "Carson", carson.FirstName )
//    Assert.assertEquals( "Gross", carson.LastName )
//    Assert.assertEquals( 39, carson.Age )
//
//  }

}