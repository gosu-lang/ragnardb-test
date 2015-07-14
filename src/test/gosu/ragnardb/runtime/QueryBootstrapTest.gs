package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.IType
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Main //TODO move to proper test resource folder such as src/test/resources/ragnar/runtime/test/MainModel.ddl
uses ragnar.foo.Main.*
uses ragnardb.plugin.ISQLDdlType
uses ragnar.foo.ContactsOlderThan
uses ragnar.foo.myQuery2
uses ragnar.foo.myQuery3
uses ragnar.foo.myQuery5
uses ragnardb.plugin.ISQLQueryType

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Integer
uses java.lang.Math
uses java.util.ArrayList

class QueryBootstrapTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Main.SqlSource)
  }

  @Before
  function clearMain(){
    Main.Tables.each(\t -> t.deleteAll(true))
    RagnarDB.execStatement( "DELETE FROM Contacts" );
  }

  function loadNames():List<String>{
    var br = new BufferedReader(new FileReader("src/test/resources/names.txt"))
    var x = br.readLine()
    var strings = new ArrayList<String>()
    while(x != null){
      strings.add(x)
      x = br.readLine()
    }
    return strings
  }

  @Test
  function basicSelectWorks(){
    var c = ContactsOlderThan.execute(3)
    Assert.assertNotNull(c);
  }

  @Test
  function basicWhereWorks(){

    var c : Contact
    c = new Contact()
    c.FirstName = "Kai"
    c.create()

    var x = Contact.findByFirstName('Kai')
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
//    new Contact(){
//      :FirstName = "Kai",
//        :LastName = "Lu",
//        :Age = 19
//    }.create()
//
    var c = new Contact()
    c.FirstName = "Kai"
    c.LastName = "Lu"
    c.Age = 19
    c.create()

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random()*100) as int
      x.create()
    }


//    var names = loadNames()
//    for(name in names) {
//      var x = new Contact(){
//        :FirstName = name.split("[ \\s]")[0],
//          :LastName = name.split("[ \\s]")[1],
//          :Age = Math.ceil(Math.random()*100) as int
//      }.create()
//    }

//    var kai = Contact.findByFirstName("Kai")
//    Assert.assertEquals("Kai", kai.FirstName)
//    Assert.assertEquals("Lu", kai.LastName)
//    Assert.assertEquals(19, kai.Age)

    var kai = Contact.findByFirstName("Kai")
    Assert.assertEquals("Kai", kai.FirstName)
    Assert.assertEquals("Lu", kai.LastName)
    Assert.assertEquals(19, kai.Age)

    var sarahs = Contact.findAllByFirstName("Sarah")
    for(sarah in sarahs){
      print(sarah.FirstName + " " + sarah.LastName + ", " + sarah.Age)
      Assert.assertEquals("Sarah", sarah.FirstName)
    }

    var methuselah = Contact.findByAge(969)
    if(methuselah != null){
      print("Damn son, I didn't think people lived that long...")
      Assert.fail()
    }

    var lamech = Contact.findAllByAge(777)
    if(lamech.iterator().hasNext()){
      print("Dammit, I just told you Methuselah wasn't real!")
      Assert.fail()
    }

    var kerrs = Contact.findAllByLastName("Kerr")
    for(kerr in kerrs){
      print(kerr.FirstName + " " + kerr.LastName + ", " + kerr.Age)
      Assert.assertEquals("Kerr", kerr.LastName)
      if(kerr.FirstName == "Steve"){
        print("Wait, didn't you just win an NBA championship?")
        Assert.fail()
      }
    }

    var mQ1 = ContactsOlderThan.execute(98)
    for(mQ11 in mQ1){
      print(mQ11.FirstName)
    }

    var mQ2 = myQuery2.execute("Kai")
    for(mQ22 in mQ2){
      print(mQ22.getFirstName())
    }

    var mQ3 = myQuery3.execute()
    for(mQ33 in mQ3){
      print(mQ33)
    }

    var mQ5 = myQuery5.execute("Kai")
    print(mQ5)
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