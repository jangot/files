define([

    'lib/util',
    'class/file',
    'services/message',
    'services/fileRegistry',
    'services/formatDate',
    'services/formatSize'

], function(util, File, message, fileRegistry, formatDate, formatSize) {

    function FolderModel(element) {
        this.element = element;
        this.element.appendChild(util.compileTemplate('#folderTemplate'));

        this.files = {};
        this.sorterField = 'name';
        this.sortDirection = 1;
        this.$$dirty = false;
        this.$$setSortClasses();
    }

    FolderModel.prototype = {
        setSorter: function(type) {
            this.sortDirection = this.sorterField === type ? (this.sortDirection * -1) : 1;
            this.sorterField = type;
            this.$$dirty = true;
            this.$$setSortClasses();
        },
        addFile: function(id) {
            if (this.files[id]) {
                throw new Error(this.files[id].name + ' - file has been added.');
            }
            if (!fileRegistry[id]) {
                throw new Error(id + ' does not exist.');
            }
            this.files[id] = fileToViewData(fileRegistry[id], id);
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

            var list = util.map(this.files);
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
        },
        $$setSortClasses: function() {
            var el = this.element.querySelector('.folder');
            el.classList.remove('sortBy-name');
            el.classList.remove('sortBy-lastModifiedDate');
            el.classList.remove('sortBy-size');
            el.classList.remove('sortDirection-top');
            el.classList.remove('sortDirection-bottom');

            el.classList.add('sortBy-' + this.sorterField);

            var direction = this.sortDirection > 0 ? 'top' : 'bottom';
            el.classList.add('sortDirection-' + direction);
        }
    };

    function fileToViewData(file, id) {
        return {
            id: id,
            nativeFile: file,
            name: file.name,
            size: formatSize(file.size),
            date: formatDate(file.lastModifiedDate)
        }
    }

    return FolderModel;
});