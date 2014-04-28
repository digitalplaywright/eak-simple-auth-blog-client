var ErrorRoute = Ember.Route.extend({
    'renderTemplate' : function() {
        switch (this.get('controller.content.code')) {
            case 401 : return this.render('401');
            default  : return this.render();
        }
    }
});

export default ErrorRoute;
