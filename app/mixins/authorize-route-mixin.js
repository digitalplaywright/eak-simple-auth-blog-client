var AuthorizeRouteMixin = Ember.Mixin.create({
  afterModel: function(model, transition) {

      var rule = { activity: this.routeName, object: model };

      if( Ember.DeclarativeRules.cannot(rule) ){
        throw{ code: 401, route: this.routeName, message: "Unauthorized access"}
      };
  }

});

export default AuthorizeRouteMixin;
