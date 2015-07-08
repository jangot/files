define([

    'lib/util'

], function(util) {
    return function(date) {
        date = date || new Date();

        var day     = date.getDate();
        var month   = date.getMonth() + 1;
        var year    = date.getFullYear();

        return [util.zeroField(day, 2), util.zeroField(month, 2), year].join(':');
    }
});