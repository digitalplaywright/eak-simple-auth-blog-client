var PostsRoute = Ember.Route.extend(Ember.AuthorizeRouteMixin, {
  model: function() {
    return this.store.find('post');
  }
});

export default PostsRoute;

