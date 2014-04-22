var AuthorizedRouteMixin = Ember.Mixin.create({
  afterModel: function(posts, transition) {
  	  console.log('name of the route (e.g posts.index):');
      console.log(transition.targetName);
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

export default AuthorizedRouteMixin;
