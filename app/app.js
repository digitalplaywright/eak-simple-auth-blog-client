import Resolver from 'ember/resolver';
import AutoAuthenticator from 'appkit/libs/auto-authenticate';
import auth from "appkit/initializers/auth";
import AuthorizedRouteMixin from "appkit/mixins/authorized-route-mixin";


var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

Ember.AuthorizedRouteMixin = AuthorizedRouteMixin;

Ember.Application.initializer(auth);


export default App;
