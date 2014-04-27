var AuthorizeRouteMixin = Ember.Mixin.create({
  unauthorized_error: null,
  afterModel: function(model, transition) {
      var self = this;
      try{
        Ember.DeclarativeRules.can({ activity: this.routeName, target: model });
      }catch(e){
        //transition.abort();
        self.unauthorized_error = e.message;
        Ember.Logger.error(e.message);
        //this.set('session.attemptedTransition', transition);
        //this.transitionToRoute('unauthorized',e);
     }

  },
  'renderTemplate' : function() {
     var message = this.unauthorized_error;

     switch(this.get('unauthorized_error')){
      case null : return this.render();
      default: return this.render('401');

     }
  
  }

});

export default AuthorizeRouteMixin;
