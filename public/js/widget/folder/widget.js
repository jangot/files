define([

    'lib/widget',
    'widget/folder/model',
    'widget/folder/controller'

], function(widget, Model, Controller) {

    return function (selector) {
        return widget(selector, Model, Controller);
    }

});