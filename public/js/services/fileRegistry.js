define([

], function() {

    return {
        add: function(id, file) {
            if (id && file) {
                this[id] = file;
            }
        }
    }

});