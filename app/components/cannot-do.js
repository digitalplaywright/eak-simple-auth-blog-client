export default Ember.Component.extend({
  isEqual: function() {
  	console.log(this.get('param1').get('title'));
    return this.get('param1').get('title') == "fasfsafaf";
  }.property('param1', 'param2')
});