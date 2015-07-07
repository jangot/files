define([

    'lib/util',
    'class/file',
    'services/message'

], function(util, File, message) {

    function FolderModel(element) {
        this.element = element;

        this.element.appendChild(util.compileTemplate('#folderTemplate'));
        this.files = {};
        this.sorterField = 'name';
        this.sortDirection = 1;
    }

    FolderModel.prototype = {
        setSorter: function(type, direction) {
            this.sorter = type;

            direction = direction || 1;
            this.sortDirection = direction > 0 ? 1 : -1;

            this.$$draw();
        },
        addFiles: function(files) {
            var filesCount = files.length;
            util.forEach(files, function(file, i) {
                var file = new File(files[i]);
                file.getId(function(id) {
                    if (this.files[id]) {
                        message.error(this.files[id].nativeFile.name + ' file has been added.')
                    } else {
                        this.files[id] = file;
                    }
                    filesCount--;
                    if (filesCount === 0) {
                        this.$$draw();
                    }
                }.bind(this));
            }.bind(this));
        },
        $$draw: function() {
            var tbody = this.element.querySelector('tbody');

            var field = this.sorterField;
            var direction = this.sortDirection;

            var list = util.map(this.files);
            list.sort(function(fileA, fileB) {
                if (fileA[field] > fileB[field]) {
                    return 1 * direction;
                } else if (fileA[field] < fileB[field]) {
                    return -1 * direction;
                } else {
                    return 0;
                }
            });

            tbody.innerHTML = '';

            list.forEach(function(file) {
                var fileItem = util.compileTemplate('#fileTemplate', file);

                // TODO remove 'querySelector' after fix tr compile problem
                tbody.appendChild(fileItem.querySelector('tr'));
            }.bind(this));
        }
    }

    return FolderModel;
});