define([

    'lib/util',
    'services/getFileId',
    'services/fileRegistry',
    'services/message'

], function(util, getFileId, fileRegistry, message) {

    return function(model) {
        this['input change'] = change;

        this['.folder dragover'] = function(e) {
            var id = e.dataTransfer.getData('fileId');
            console.log(e, id);
            if (!model.files[id]) {
                e.preventDefault();
            }
        };
        this['.folder drop'] = function(e) {
            var id = e.dataTransfer.getData('fileId');

            console.log(id);
            if (id) {
                try {
                    model.addFile(id);
                    model.draw();
                } catch (e) {
                    message.error(e.message);
                }

            } else {
                addFiles(e.dataTransfer.files);
            }
        };
        this['.folder dragstart'] = function(e) {
            var id = e.target.getAttribute('file-id');

            e.dataTransfer.setData('fileId', id);
            model.removeFile(id);
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