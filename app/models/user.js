var User = DS.Model.extend({
  email: DS.attr('string'),  
  token: DS.attr('string'),
  posts: DS.hasMany('post')

});

export default User;