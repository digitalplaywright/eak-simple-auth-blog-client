var AuthorizeRouteMixin = Ember.Mixin.create({
  afterModel: function(model, transition) {

      console.log('## step 1: name of the route (e.g posts.index) ##');
      console.log(transition.targetName);

      console.log('## step 2: name of model ##');



      //Ember.DeclarativeRules.can({ activity: this.routeName, actor: me, object: model });

      //Method #1: Get necessary info from model

      console.log('Method #1: Get necessary info from model');

      if(DS.Model.detectInstance(model)){
            console.log("this is an instance:");
            console.log(model.constructor.typeKey);
      }else if(DS.RecordArray.detectInstance(model)){
            console.log('it is an array of:');
            console.log(model.type.typeKey);
      }

      console.log('current user is')

      console.log(this.store.find('user','current'))

      console.log('current')
      console.log(this.store.find('user',{ token: this.get('session').get('access_token') }))


      //Method #2: Get necessary info from transition
      console.log('Method #2: Get necessary info from transition');


      console.log('name of the model (even if its an array of results)');
      console.log(Ember.Inflector.inflector.singularize(transition.targetName.split('.')[0]));
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
