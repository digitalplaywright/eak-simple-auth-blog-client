export default Ember.Component.extend({
    isEqual: function() {
  	  var rules = this.container.lookup('rules:eval');

	  //return rules.can({ actor: can_args[0], activity: can_args[1], object: can_args[2] });
      return rules.can({ actor: this.get('param1'), activity: "edit", object: this.get('param1') });
    }.property('param1.updated_at', 'param2'), 

	testObserver: function(){                
	    console.log("here");
	    this.rerender();
	}.observes("param1.updated_at")
});