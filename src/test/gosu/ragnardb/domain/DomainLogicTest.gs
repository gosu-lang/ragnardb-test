package ragnardb.domain

uses org.junit.Assert
uses org.junit.Test

uses ragnar.foo.Users
uses ragnar.foo.Users.Scott


class DomainLogicTest {

  @Test
  function getDomainLogicProperty() {
    var scott = Users.Scott.where(Users.Scott#FirstName.isEqualTo("Scott")).first()
    Assert.assertEquals(42, scott.MeaningOfLife())
    Assert.assertEquals("Hey, Kyle", scott.sayHi("Kyle"))
  }

}