define([

], function() {
    return {
        kept: {},
        putValue: function(name, value) {
            this.kept[name] = value;
        },
        getValue: function(name) {
            return this.kept[name];
        },
        removeValue: function(name) {
            delete this.kept[name];
        }
    }
});