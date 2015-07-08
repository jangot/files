define([

    'lib/util'

], function(util) {

    return function(element, ModelClass, WidgetController) {
        ModelClass = ModelClass || util.noop;
        WidgetController = WidgetController || util.noop;

        var model = new ModelClass(element);
        var controller = new WidgetController(model);

        util.forEach(controller, function(action, name) {
            var eventSelector = name.split(' ')[0];
            var event = name.split(' ')[1];
            if (eventSelector && event) {
                var eventElements = element.querySelectorAll(eventSelector);
                util.forEach(eventElements, function(eventElement) {
                    eventElement.addEventListener(event, controller[name].bind(controller))
                });
            }
        });

        return model;
    }

});