define([

], function() {

    return function(file, cb) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //TODO use md5
            cb(e.target.result);
        };
        reader.readAsDataURL(file);
    }

});