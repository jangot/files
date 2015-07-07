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
    }

    FolderModel.prototype = {
        setSorter: function(type, direction) {
            this.sorter = type;

            direction = direction || 1;
            this.sortDirection = direction > 0 ? 1 : -1;

            this.$$draw();
        },
        addFile: function(id) {
            if (this.files[id]) {
                throw new Error(this.files[id].name + ' - file has been added.');
            }
            this.files[id] = fileRegistry[id];
        },
        showLoader: function() {
            this.element.querySelector('.folder').classList.add('loading');
        },
        hideLoader: function() {
            this.element.querySelector('.folder').classList.remove('loading');
        },
        draw: function() {
            var tbody = this.element.querySelector('tbody');

            var field = this.sorterField;
            var direction = this.sortDirection;

            var list = util.map(this.files, fileToViewData);
            list.sort(function(fileA, fileB) {
                if (fileA.originFile[field] > fileB.originFile[field]) {
                    return 1 * direction;
                } else if (fileA.originFile[field] < fileB.originFile[field]) {
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
        var size = file.size / 1024 / 1024;
        var d = file.lastModifiedDate;

        return {
            id: id,
            originFile: file,
            name: file.name,
            size: size.toFixed(2) + 'MiB',
            date: d.getDate() + ':' + (d.getMonth() + 1) + ':' + d.getFullYear()
        }
    }

    return FolderModel;
});