var User = DS.Model.extend({
  email: DS.attr('string'),  
  token: DS.attr('string')

});

export default User;