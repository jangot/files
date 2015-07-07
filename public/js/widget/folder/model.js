define([

    'lib/util',
    'class/file',
    'services/message',
    'services/fileRegistry'

], function(util, File, message, fileRegistry) {

    function FolderModel(element) {
        this.element = element;
        this.element.appendChild(util.compileTemplate('#folderTemplate'));

        this.files = {};
        this.sorterField = 'name';
        this.sortDirection = 1;
        this.$$dirty = false;
    }

    FolderModel.prototype = {
        setSorter: function(type) {
            this.sortDirection = this.sorter === type ? (this.sortDirection * -1) : 1;
            this.sorter = type;

            this.draw();
        },
        addFile: function(id) {
            if (this.files[id]) {
                throw new Error(this.files[id].name + ' - file has been added.');
            }
            if (!fileRegistry[id]) {
                throw new Error(id + ' does not exist.');
            }
            this.files[id] = fileRegistry[id];
            this.$$dirty = true;
        },
        removeFile: function(id) {
            if (this.files[id]) {
                delete this.files[id];
                this.$$dirty = true;
            }
        },
        showLoader: function() {
            this.element.querySelector('.folder').classList.add('loading');
        },
        hideLoader: function() {
            this.element.querySelector('.folder').classList.remove('loading');
        },
        draw: function() {
            if (!this.$$dirty) {
                return;
            }
            this.$$dirty = false;

            var tbody = this.element.querySelector('tbody');
            var field = this.sorterField;
            var direction = this.sortDirection;

            var list = util.map(this.files, fileToViewData);
            list.sort(function(fileA, fileB) {
                if (fileA.nativeFile[field] > fileB.nativeFile[field]) {
                    return 1 * direction;
                } else if (fileA.nativeFile[field] < fileB.nativeFile[field]) {
                    return -1 * direction;
                } else {
                    return 0;
                }
            });

            tbody.innerHTML = '';

            list.forEach(function(fileData) {
                var fileItem = util.compileTemplate('#fileTemplate', fileData);

                // TODO remove 'querySelector' after fix tr compile problem
                var tr = fileItem.querySelector('tr');
                tbody.appendChild(tr);
            }.bind(this));
        }
    };

    function fileToViewData(file, id) {
        var d = file.lastModifiedDate;
        var size = (file.size / 1024 / 1024).toFixed(2);
        if (size == 0.00) {
            size = 0.01;
        }

        return {
            id: id,
            nativeFile: file,
            name: file.name,
            size: size + 'MiB',
            date: d.getDate() + ':' + (d.getMonth() + 1) + ':' + d.getFullYear()
        }
    }

    return FolderModel;
});