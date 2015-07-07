define([

    'lib/util',

    'widget/folder/widget'

], function(util, folderWidget) {

    function ListModel(element) {
        this.element = element;
    }

    ListModel.prototype = {
        createFolder: function() {
            var newFolderContainer = util.compileTemplate('<div class="widgetList-content-folder"></div>');
            this.element.querySelector('.widgetList-content').appendChild(newFolderContainer);

            folderWidget(newFolderContainer);
        }
    };

    return ListModel;
});