var PostsRoute = Ember.Route.extend(Ember.DeclarativeAuthorization.AuthorizedRouteMixin, {
  actor: function(){
  	return this.store.find('post','1');
  },
  model: function() {
    return this.store.find('post');
  }
});

export default PostsRoute;

