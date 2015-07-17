package ragnardb.runtime

uses gw.lang.reflect.IPropertyInfo
uses ragnardb.plugin.ISQLTableType
uses ragnardb.plugin.SQLColumnPropertyInfo

enhancement SQLColumnPropertyInfoEnhancement : SQLColumnPropertyInfo {

  function addListeneronPI(action : IListenerAction) {
//    (this as IPropertyInfo)
  }

}
