var Post = DS.Model.extend({
  title:      DS.attr('string'),  
  details:    DS.attr('string'),
  created_at: DS.attr('date')
});

export default Post;