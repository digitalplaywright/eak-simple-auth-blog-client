var AuthorizeRouteMixin = Ember.Mixin.create({
  afterModel: function(model, transition) {
      Ember.DeclarativeRules.can({ activity: this.routeName, object: model });
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
