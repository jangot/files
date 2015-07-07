define([

    'lib/util'

], function(util) {

    return function(element, ModelClass, WidgetController) {
        ModelClass = ModelClass || util.noop;
        WidgetController = WidgetController || util.noop;

        var model = new ModelClass(element);
        var controller = new WidgetController(model);

        for (var name in controller) {
            var eventSelector = name.split(' ')[0];
            var event = name.split(' ')[1];
            if (eventSelector && event) {
                var eventElement = element.querySelector(eventSelector);
                if (eventElement) {
                    //TODO user delegate
                    eventElement.addEventListener(event, controller[name].bind(controller))
                }
            }
        }

        return model;
    }

});