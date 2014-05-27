var Post = DS.Model.extend({
  title:      DS.attr('string'),  
  details:    DS.attr('string'),
  created_at: DS.attr('date'),

  updated_at: DS.attr('date'),

  user: DS.belongsTo('user'),

  computeUpdatedAt: function() {
    // some side effect of salutation changing
    //this.set('updated_at', new Date() );
    return new Math.random();
  }.property('title', 'details')
});

export default Post;