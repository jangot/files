define([

    'widget/list/widget'

], function(listWidget) {
    var list = listWidget(document.querySelector('html'));
    list.createFolder();
});
