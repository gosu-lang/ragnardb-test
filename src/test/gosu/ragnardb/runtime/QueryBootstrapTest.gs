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

uses java.lang.Integer

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

  @Test
  function basicWhereWorks(){

//    new Contacts.Contacts(){
//      :FirstName = "Carson",
//      :LastName = "Gross",
//      :Age = 39
//    }.create()
//
    var x = Contacts.Contacts.findById(11)

//    var carson = Contact.where( Contact#FirstName.isEqualTo( "Carson" ) ).first()
//
//    Assert.assertEquals( "Carson", carson.FirstName )
//    Assert.assertEquals( "Gross", carson.LastName )
//    Assert.assertEquals( 39, carson.Age )
//
//    Assert.assertNull(Contact.where(Contact#FirstName.isEqualTo("Scott")).first())
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