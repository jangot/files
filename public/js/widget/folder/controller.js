define([

    'lib/util',
    'services/getFileId',
    'services/fileRegistry',
    'services/message',
    'services/transfer'

], function(util, getFileId, fileRegistry, message, transfer) {

    return function(model) {
        this['input change'] = change;

        this['.folder dragover'] = function(e) {
            if (transfer.getValue('fileId')) {
                e.preventDefault();
            }
        };
        this['.folder drop'] = function(e) {
            var id = transfer.getValue('fileId');

            if (id) {
                try {
                    var sourceModel = transfer.getValue('sourceModel');
                    if (sourceModel !== model) {
                        model.addFile(id);
                        model.draw();

                        sourceModel.removeFile(id);
                        sourceModel.draw();
                    }
                } catch (e) {
                    message.error(e.message);
                }

                transfer.removeValue('fileId');
                transfer.removeValue('sourceModel');
            } else {
                addFiles(e.dataTransfer.files);
            }
        };
        this['.folder dragstart'] = function(e) {
            var id = e.target.getAttribute('file-id');

            transfer.putValue('fileId', id);
            transfer.putValue('sourceModel', model);
        };

        function change(e) {
            var input = e.target;
            addFiles(input.files);

            //TODO remove after delegate
            var newInput = document.createElement('input');
            newInput.setAttribute('type', 'file');
            newInput.setAttribute('multiple', '');
            input.parentNode.insertBefore(newInput, input);
            input.parentNode.removeChild(input);

            newInput.addEventListener('change', change);
        }

        function addFiles(files) {
            var length = files.length;
            model.showLoader();
            util.forEach(files, function(file) {
                getFileId(file, function(id) {

                    if (!file.type) {
                        message.error(file.name + ' - it is not a file.');
                    } else {
                        fileRegistry.add(id, file);
                        try {
                            model.addFile(id);
                        } catch (e) {
                            message.error(e.message);
                        }
                    }

                    length--;
                    if (length === 0) {
                        model.draw();
                        model.hideLoader();
                    }
                });
            });
        }
    }
});