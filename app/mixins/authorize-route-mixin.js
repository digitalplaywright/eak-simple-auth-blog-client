var AuthorizeRouteMixin = Ember.Mixin.create({
  afterModel: function(model, transition) {
      try{
        Ember.DeclarativeRules.can({ activity: this.routeName, target: model });
      }catch(e){
        transition.abort();
        alert( e.message);

     }

  },
  actions: {
    error: function(reason) {
      if( reason.error().status == 401  ){
	    console.log('handle unauthorized');
      }
    }
  }

});

export default AuthorizeRouteMixin;
