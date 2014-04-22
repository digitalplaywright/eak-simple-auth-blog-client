var PostsRoute = Ember.Route.extend(Ember.AuthorizedRouteMixin, {
  model: function() {
    return this.store.find('post');
  }
});

export default PostsRoute;
