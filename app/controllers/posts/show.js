var PostsShowController =  Ember.ObjectController.extend({
	actions: {
	    edit: function(post) {
	      this.transitionToRoute('posts.edit',post);

	    },
	    viewAll: function() {
	      this.transitionToRoute('posts.index');

	    }

	}
});

export default PostsShowController;
