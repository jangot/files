define([

    'lib/util'

], function(util) {

    return function(file, cb) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var id = util.hash(e.target.result);
            cb(id);
        };
        reader.readAsDataURL(file);
    }

});