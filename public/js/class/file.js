define([

], function() {

    function getViewSize(file) {
        var size = file.size / 1024 / 1024;

        return size.toFixed(2) + 'MiB';
    }

    function getViewDate(file) {
        var d = file.lastModifiedDate;

        return d.getDate() + ':' + (d.getMonth() + 1) + ':' + d.getFullYear();
    }

    function File(nativeFile) {
        this.id = null;
        this.nativeFile = nativeFile;

        this.name = nativeFile.name;
        this.size = getViewSize(nativeFile);
        this.date = getViewDate(nativeFile);
    }

    File.prototype = {
        getId: function(cb) {
            if (this.id) {
                cb(this.id);
            } else {
                readData(this.nativeFile, function(data) {
                    this.id = data;
                    cb(this.id);
                }.bind(this));
            }
        }
    };

    function readData(file, cb) {
        var reader = new FileReader();
        reader.onload = function (e) {
            cb(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    return File;
});