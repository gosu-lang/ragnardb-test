package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.IType
uses org.junit.Assert
uses org.junit.Before
uses org.junit.BeforeClass
uses org.junit.Test
uses ragnardb.RagnarDB
uses ragnar.foo.Main //TODO move to proper test resource folder such as src/test/resources/ragnar/runtime/test/MainModel.ddl
uses ragnardb.plugin.ISQLDdlType
uses ragnar.foo.ContactsOlderThan
uses ragnardb.plugin.ISQLQueryType

uses java.io.BufferedReader
uses java.io.FileReader
uses java.lang.Integer
uses java.lang.Math

class QueryBootstrapTest {

  @BeforeClass
  static function beforeClass(){
    RagnarDB.setDBUrl("jdbc:h2:mem:querystraptest;DB_CLOSE_DELAY=-1");
    RagnarDB.execStatement(Main.SqlSource)
  }

  @Before
  function clearMain(){
    Main.Tables.each(\t -> t.deleteAll(true))
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
  function basicSelectWorks(){
    var c = ContactsOlderThan.execute(3)
    Assert.assertNotNull(c);
  }

  @Test
  function basicWhereWorks(){

    var c : Main.Contact
    c = new Main.Contact()
    c.FirstName = "Kai"
    c.create()

    var x = Main.Contact.findByFirstName('Kai')
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
//    new Main.Contact(){
//      :FirstName = "Kai",
//        :LastName = "Lu",
//        :Age = 19
//    }.create()
//
    var c = new Main.Contact()
    c.FirstName = "Kai"
    c.LastName = "Lu"
    c.Age = 19
    c.create()

    var names = loadNames()
    for(name in names) {
      var y = name.split("[ \t]")
      var x = new Main.Contact()
      x.FirstName = y[0]
      x.LastName = y[1]
      x.Age = Math.ceil(Math.random()*100) as int
      x.create()
    }


//    var names = loadNames()
//    for(name in names) {
//      var x = new Main.Contact(){
//        :FirstName = name.split("[ \\s]")[0],
//          :LastName = name.split("[ \\s]")[1],
//          :Age = Math.ceil(Math.random()*100) as int
//      }.create()
//    }

//    var kai = Main.Contact.findByFirstName("Kai")
//    Assert.assertEquals("Kai", kai.FirstName)
//    Assert.assertEquals("Lu", kai.LastName)
//    Assert.assertEquals(19, kai.Age)

    var kai = Main.Contact.findByFirstName("Kai")
    Assert.assertEquals("Kai", kai.FirstName)
    Assert.assertEquals("Lu", kai.LastName)
    Assert.assertEquals(19, kai.Age)

    var sarahs = Main.Contact.findAllByFirstName("Sarah")
    for(sarah in sarahs){
      print(sarah.FirstName + " " + sarah.LastName + ", " + sarah.Age)
      Assert.assertEquals("Sarah", sarah.FirstName)
    }

    var methuselah = Main.Contact.findByAge(969)
    if(methuselah != null){
      print("Damn son, I didn't think people lived that long...")
      Assert.fail()
    }

    var lamech = Main.Contact.findAllByAge(777)
    if(lamech.iterator().hasNext()){
      print("Dammit, I just told you Methuselah wasn't real!")
      Assert.fail()
    }

    var kerrs = Main.Contact.findAllByLastName("Kerr")
    for(kerr in kerrs){
      print(kerr.FirstName + " " + kerr.LastName + ", " + kerr.Age)
      Assert.assertEquals("Kerr", kerr.LastName)
      if(kerr.FirstName == "Steve"){
        print("Wait, didn't you just win an NBA championship?")
        Assert.fail()
      }
    }
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