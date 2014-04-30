var PostsEditController =  Ember.ObjectController.extend({
    actions: {
	    save: function() {
	      var _self = this;

	      function redirectToShow() {
	        //_self.transitionToRoute('posts.show', _self.get('model'));
	      }
	      function handleErrors(reason) {
	        // if reason instanceof DS.InvalidError
	        //  model.errors will contain the server-supplied validation errors
	        // else
	        //  isError will be true and we'll show a generic "seems bad" message
	      }


	      this.get("model").save().then(redirectToShow).catch(handleErrors);
	    },
	    view: function(post) {
	      this.transitionToRoute('posts.show',post);

	    }
	}
});

export default PostsEditController;
