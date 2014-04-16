var PostsRoute = Ember.Route.extend({
  model: function(){
      return this.findAll("post");
  }
});

export default PostsRoute;
