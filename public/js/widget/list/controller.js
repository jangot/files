define([

], function() {
    return function(model) {
        this['button click'] = function(e) {
            model.create();
        }
    }
});