
var DeclarativeRules = Ember.Object.extend({
	
	activities: [ 
	    {
	      activity: 'posts.index',
	      actor:    'user',
	      object:   'post',
	      target:   'postsEditController'

	      can:  function(actor, object, target) {
	      	return true;
		  }
		    
	    }

	],


	activities_hash: {},

    required_properties: ["activity"],
	optional_properties: ["actor","object", "target"],
	expected_properties: [],
	hash_key_separator: "-",

    validateFormat: function(item, require_can_definition){

    	//validate required properties
    	this.required_properties.forEach(function(prop_name, index, enumerable){
    		if ( require_can_definition == false && prop_name == "can" ){

    		}else if( item[prop_name] == undefined )
			{
				var message = "Error: Missing required property ";
				message = message.concat(JSON.stringify(prop_name) );
				message = message.concat(" in: ", JSON.stringify(item) );

				throw message;
			}
			
	    });

	    if( require_can_definition == true && typeof(item["can"]) != "function")
	    {
	    	var message = "Error: Can is not a function in ";
			message = message.concat(" in: ", JSON.stringify(item) );

			throw message;

	    }


        //validate that only expected properties
	    var self = this;
  
	    var unexpected_properties = Object.keys(item).filter(function(i) {
	    	return i != "can" && self.expected_properties.indexOf(i) < 0;
	    });

	    if(unexpected_properties.length > 0)
	    {
     	    var message = "Error: Unexpected field(s) ";
			message = message.concat(JSON.stringify(unexpected_properties) );
			message = message.concat(" in: ", JSON.stringify(item) );

			throw message;

	    }


    },

    get_hash_key: function(item, require_can_definition){
    	var self = this;

		var hash_key="";

        self.validateFormat(item, require_can_definition);

		this.expected_properties.forEach(function(prop_name, index, enumerable){
            var cur_prop = item[prop_name];

			if(cur_prop != undefined){ 
			    if (index != 0)	{ hash_key = hash_key.concat(self.hash_key_separator) }		

			    if (  typeof cur_prop === 'string' ){
					hash_key = hash_key.concat(cur_prop);
				}else{
					var cur_type = 
					hash_key = hash_key.concat(self.type_of(cur_prop));
				}

			}

		});

		return hash_key;
    },

    make_activities_hash: function(){
      	var self = this;

     	this.activities.forEach(function(item, index, enumerable){
			var hash_key = self.get_hash_key(item, true);

			if( self.activities_hash.hasOwnProperty(hash_key) ){
				var message = "Error: Activity with the same definition already exists for ";
				message = message.concat( JSON.stringify(item) );

				throw message;
			}

	    	self.activities_hash[hash_key] = item.can;

	    });

    },

    init: function(){

        this.expected_properties = this.required_properties.concat(this.optional_properties);
        this.make_activities_hash();

    },
    
	type_of: function(object){

      if(DS.Model.detectInstance(object)){
      	return object.constructor.typeKey;
      }else if(DS.RecordArray.detectInstance(object)){
      	return object.type.typeKey;
      }else{

		var message = "Error: Type unhandled for ";
		message = message.concat(message, JSON.stringify(object) );

		throw message;
      }

	},

    can: function( params_hash ) {

    	var hash_key = this.get_hash_key(params_hash, false);

		if( !this.activities_hash.hasOwnProperty(hash_key) ){
			var message = "Error: no matching activity definition found for ";
			message = message.concat(JSON.stringify(params_hash) );

			throw message;
		}

		return this.activities_hash[hash_key](params_hash["actor"],
			params_hash["object"], params_hash["target"]);

    },

    cannot: function( params_hash ) {
    	return !can(params_hash);
    }



});



export default DeclarativeRules;