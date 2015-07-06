define([

    'lib/util'

], function(util) {

    function ListModel(element) {
        this.element = element;
    }

    ListModel.prototype = {
        create: function() {
            var newFolderContainer = util.compileTemplate('#fileTemplate', {test: 'HI'});
            this.element.appendChild(newFolderContainer);
        }
    };

    return ListModel;
});