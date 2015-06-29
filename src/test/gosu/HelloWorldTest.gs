uses org.junit.Assert
uses org.junit.Test

class HelloWorldTest {

  @Test
  public function myFirstGosuTest() {
    var x = new HelloWorld()
    Assert.assertNotNull(x)
    x = new HelloWorld("Welcome interns")
    Assert.assertNotNull(x)
  }

}