/**
 * Created by kmoore on 6/29/15.
 */
enhancement StringEnhancement : String {

  public function yellIt() : String {
    return this.toUpperCase()
  }

  static function yellSomething(arg : String) : String {
    return arg.yellIt()
  }

}
