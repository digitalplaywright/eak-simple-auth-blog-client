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
  }
})

Ember.AuthorizeRouteMixin = AuthorizeRouteMixin;
Ember.DeclarativeRules = new DeclarativeRules();

Ember.Application.initializer(auth);


export default App;
