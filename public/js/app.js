define([

    'widget/list/widget'

], function(listWidget) {
    var list = listWidget(document.querySelector('.widgetList'));
    list.createFolder();
});