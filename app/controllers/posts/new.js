var PostsController =  Ember.ObjectController.extend({
	actions: {
	    save: function() {
	      this.get("model").save().then(function() {
		    this.transitionTo('service.index');
		  }, function() {
		   console.log('fuck, it failed');
		  });
	    }
	}
});

export default PostsController;
