define([

    'services/transfer'

], function(transfer) {
    return function(model) {
        this['.addFolder click'] = function(e) {
            model.createFolder();
        };
        this['body drop'] = function(e) {
            if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
            } else {
                var dropFile = transfer.getValue('fileId');
                if (dropFile) {
                    var sourceModel = transfer.getValue('sourceModel');
                    sourceModel.removeFile(dropFile);
                    sourceModel.draw();

                    transfer.removeValue('fileId');
                    transfer.removeValue('sourceModel');

                    e.preventDefault();
                }
            }
        };
        this['body dragover'] = function(e) {
            e.preventDefault();
        };

    }
});