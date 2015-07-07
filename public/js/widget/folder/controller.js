define([

    'lib/util',
    'services/getFileId',
    'services/fileRegistry',
    'services/message'

], function(util, getFileId, fileRegistry, message) {

    return function(model) {
        //TODO remove after delegate
        this['input change'] = change;
        this['.folder dragover'] = function(e) {
            e.stopPropagation();
            e.preventDefault();
        };
        this['.folder drop'] = function(e) {
            var id = e.dataTransfer.getData('fileId');

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

            e.stopPropagation();
            e.preventDefault();
        };
        this['.folder dragstart'] = function(e) {
            e.dataTransfer.setData('fileId', e.target.getAttribute('file-id'));
        }

        function change(e) {
            var input = e.target;
            addFiles(input.files);

            var newInput = document.createElement('input');
            newInput.setAttribute('type', 'file');
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