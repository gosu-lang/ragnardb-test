package ragnardb.runtime

uses gw.lang.reflect.features.PropertyReference

/**
 * Created by kmoore on 2015-07-17.
 */
enhancement PropertyRefEnhancement<R extends SQLRecord> : PropertyReference<R, Object> {

  function addListener(action : IListenerAction<R>) {
    (this.getPropertyInfo() as IHasListenableProperties).addListener(action)
  }

}
