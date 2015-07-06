define([

    'lib/util'

], function(util) {

    return function(selector, ModelClass, WidgetController) {
        ModelClass = ModelClass || util.noop;
        WidgetController = WidgetController || util.noop;

        var element = document.querySelector(selector);
        var model = new ModelClass(element);
        var controller = new WidgetController(model);

        for (var name in controller) {
            var eventSelector = name.split(' ')[0];
            var event = name.split(' ')[1];
            if (selector && event) {
                var eventElement = element.querySelector(eventSelector);
                if (eventElement) {
                    eventElement.addEventListener(event, controller[name].bind(controller))
                }
            }
        }

        return model;
    }

});