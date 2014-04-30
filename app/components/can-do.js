export default Ember.Component.extend({
    isEqual: function() {
  	  console.log(this.get('param1').get('title'));
  	  console.log('isEqual here');
      return this.get('param1').get('title') == this.get('param2');
    }.property('param1.updated_at', 'param2'), 
	testObserver: function(){                
	    console.log("here");
	    this.rerender();
	}.observes("param1.updated_at").on('param2.updated_at')
});