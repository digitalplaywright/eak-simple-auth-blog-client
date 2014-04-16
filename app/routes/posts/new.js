var PostsRoute = Ember.Route.extend({
  model: function(){
      return this.store.createRecord("post");
  }
});

export default PostsRoute;
