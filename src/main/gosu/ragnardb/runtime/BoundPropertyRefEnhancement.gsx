package ragnardb.runtime

uses gw.lang.reflect.features.BoundPropertyReference
uses ragnardb.plugin.ISQLTableType
uses ragnardb.plugin.SQLColumnPropertyInfo

enhancement BoundPropertyRefEnhancement<R extends SQLRecord> : BoundPropertyReference<R, Object> {

  function addListener(action : IListenerAction<R>) {
    (this.getPropertyInfo() as IHasListenableProperties).addListener(action)
  }

}
