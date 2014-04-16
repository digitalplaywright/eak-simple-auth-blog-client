var PostsShowController =  Ember.ObjectController.extend({
	actions: {
	    edit: function(post) {
	      this.transitionToRoute('posts.edit',post);

	    }
	}
});

export default PostsShowController;
