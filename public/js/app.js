define([

    'widget/list/widget'

], function(listWidget) {
    var list = listWidget(document.querySelector('html'));
    list.createFolder();

    //document
    //    .querySelector('body')
    //    .addEventListener('drop', function(e) {
    //        e.stopPropagation();
    //        e.preventDefault();
    //
    //    });
});