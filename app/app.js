import Resolver from 'ember/resolver';
import AutoAuthenticator from 'appkit/libs/auto-authenticate';
import auth from "appkit/initializers/auth";
import AuthorizeRouteMixin from "appkit/mixins/authorize-route-mixin";
import DeclarativeRules from 'appkit/libs/declarative-rules';
import RulesMain from 'appkit/rules/main';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});


Ember.Application.initializer({
  name: 'my rules lib initializer',
  initialize: function (container, application) {
    container.register('rules:main', RulesMain);

    container.injection('route', 'rules', 'rules:main');
    container.injection('controller', 'rules', 'rules:main');
 
    container.register('rules:eval', DeclarativeRules);

    container.lookup('rules:eval').setup(container);

    container.injection('route', 'declarative-rules', 'rules:eval');
    container.injection('controller', 'declarative-rules', 'rules:eval');
  }
})


Handlebars.registerHelper("can", function(actor, activity, object, fn)
{
  var context = (fn.contexts && fn.contexts[0]) || this;
  var args = [actor, activity ,object, fn];
  var options   = args.pop();


  var canAction = function(can_args)
  {
    var rules = context.container.lookup('rules:eval');
    console.log('calling for');
    console.log(can_args);

    return rules.can({ actor: can_args[0], activity: can_args[1], object: can_args[2] });

  };

  // Gather all bound property names to pass in order to observe them
  var properties = options.types.reduce(function(results, type, index) {
    if (type === 'ID') {
      results.push(args[index]);
    }
    return results;
  }, []);


 // Resolve actual values for all params to pass to the conditional callback
  var normalizer = function() {
    return Ember.Handlebars.resolveParams(context, args, options);
  };
 
  return Ember.Handlebars.bind.call(context, 'content', options, true, canAction, normalizer, properties );
});

Handlebars.registerHelper("ifData", function(property, fn)
{
  var context = (fn.contexts && fn.contexts[0]) || this;
  var args    = [property];

  var canAction = function(can_args)
  {
    alert('I was called for '+can_args[0].get('id'));
    return true;
  };

   // Resolve actual values for all params to pass to the conditional callback
  var normalizer = function() {
    return Ember.Handlebars.resolveParams(context, args, fn);
  };
 
  return Ember.Handlebars.bind.call(context, 'content', fn, true, canAction, normalizer, args);
});



Handlebars.registerHelper("cannot", function(actor, action, object, fn)
{
  var context = (fn.contexts && fn.contexts[0]) || this;


  var cannotAction = function(result)
  {
    var rules = context.container.lookup('rules:eval');

    return rules.cannot({activity: result[1], actor: result[0], object: result[2] });

  };

  var args = [actor, action ,object, fn];
  var options   = args.pop();

  // Gather all bound property names to pass in order to observe them
  var properties = options.types.reduce(function(results, type, index) {
    if (type === 'ID') {
      results.push(args[index]);
    }
    return results;
  }, []);


 // Resolve actual values for all params to pass to the conditional callback
  var normalizer = function() {
    return Ember.Handlebars.resolveParams(context, [actor, action ,object, fn], fn);
  };
 
  return Ember.Handlebars.bind.call(context, 'content', fn, true, cannotAction, normalizer, properties );
});



Ember.AuthorizeRouteMixin = AuthorizeRouteMixin;
Ember.DeclarativeRules = new DeclarativeRules();

Ember.Application.initializer(auth);


export default App;
