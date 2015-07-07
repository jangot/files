define([

], function() {
    return function(model) {
        this['.addFolder click'] = function(e) {
            model.createFolder();
        };
        this['body drop'] = function(e) {
            if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
            }
        };
        this['body dragover'] = function(e) {
            if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
            }
        };

    }
});