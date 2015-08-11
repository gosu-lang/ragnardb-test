package ragnar.foo.ValidationExt

uses ragnar.foo.Validation
uses ragnar.foo.Validation.*

uses ragnardb.api.IModelConfig
uses ragnardb.runtime.RagnarExt

class ContactExt  extends RagnarExt<Validation.Contact> {
  private static var configLevel = 1;

  static function setConfigure(Level:int){
    configLevel = Level
  }

  override function configure(cfg : IModelConfig) {
    if(configLevel == 1){
      cfg.clearValidators()
      cfg.addValidation(Contact#FirstName, \ val -> {
        if(val?.length() < 1) throw "First name must be non-empty"
      })
      cfg.validateFormat(Contact#LastName, "Gosu")
    } else if(configLevel == 2){
      cfg.clearValidators()
      cfg.requiredFields({Contact#FirstName, Contact#LastName, Contact#StateId})
    } else if(configLevel == 3){
      cfg.clearValidators()
      cfg.lengthBetween(Contact#FirstName, 5,10)
      cfg.requiredFields({Contact#LastName})
    } else if(configLevel == 4){
      cfg.clearValidators()
      cfg.requiredFields({Contact#FirstName})
      cfg.unique(Contact#FirstName)
    }
  }


}