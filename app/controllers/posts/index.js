var PostsController =  Ember.ObjectController.extend({
	cur_actor: function(){
		return this.store.find('post','1');
	},
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
