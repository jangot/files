define([

    'lib/widget',
    'widget/folder/model',
    'widget/folder/controller'

], function(widget, Model, Controller) {

    return function (element) {
        return widget(element, Model, Controller);
    }

});
