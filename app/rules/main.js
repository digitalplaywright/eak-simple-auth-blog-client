export default Ember.Object.extend({
	'edit': [
	{
		can: function(actor, object, target){
			return true;
		}

	},
	{
		actor:  "post",
		object: "post",
		can: function(actor, object, target){
			return actor.get('title')=="mydream";
		}

	}


	],
	'posts.index': {
		actor:  'post',
		object: 'post',
		can: function(actor, object, target){
			return true;
		}
	},
	'posts.show': {
		object: 'post',
		can: function(actor, object, target){
			return true;
		}
	},
	'controller:posts.edit': [
		{
			actor:  'user',
			object: 'post',
			target: 'postsEditController',
			can: function(actor, object, target){
				return true;
			}

		},
		{
			actor:  'user',
			object: 'post2',
			target: 'postsEditController',
			can: function(actor, object, target){
				return true;
			}

		}
	]
});