var PostsController =  Ember.ObjectController.extend({
	actions: {
	    createNew: function() {
	      this.transitionToRoute('posts.new');

	    },
	    edit: function(post) {
	      this.transitionToRoute('posts.edit',post);

	    },
	    view: function(post) {
	      this.transitionToRoute('posts.show',post);

	    }
	}

});

export default PostsController;
