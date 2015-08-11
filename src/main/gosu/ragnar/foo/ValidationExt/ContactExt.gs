package ragnar.foo.ValidationExt

uses ragnar.foo.Validation
uses ragnar.foo.Validation.*

uses ragnardb.api.IModelConfig
uses ragnardb.runtime.RagnarExt

class ContactExt  extends RagnarExt<Validation.Contact> {

  override function configure(cfg : IModelConfig) {

    cfg.addValidation(Contact#FirstName, \ val -> {
      if(val?.length() < 1) throw "First name must be non-empty"
    })

    cfg.validateFormat(Contact#LastName, "Gosu")

  }

}