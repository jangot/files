define([

    'lib/widget',
    'widget/list/model',
    'widget/list/controller'

], function(widget, Model, Controller) {

    return function (selector) {
        return widget(selector, Model, Controller);
    }

});