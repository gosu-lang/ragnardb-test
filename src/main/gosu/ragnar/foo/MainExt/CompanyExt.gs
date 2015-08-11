package ragnar.foo.MainExt

uses gw.lang.reflect.features.IPropertyReference
uses ragnardb.runtime.RagnarExt
uses ragnar.foo.Main

uses java.lang.Iterable

class CompanyExt extends RagnarExt<Main.Company> {

  property get Contactss() : Iterable<Main.Contact> {
    return load(Main.Contact#CompanyId)
  }

  function load<T>(pr : IPropertyReference<T, Object>) : Iterable<T> {
    return {}
  }

}