define([

    'lib/util/compileTemplate',
    'lib/hash'

], function(compileTemplate, hash) {

    return {
        noop: function() {},
        compileTemplate: compileTemplate,
        hash: hash,
        forEach: function(object, cb) {
            //TODO need refactoring
            if (object.length) {
                for (var i = 0; i < object.length; i++) {
                    var res = cb(object[i], i);
                    if (res === false) {
                        break;
                    }
                }
            } else {
                for (var name in object) {
                    var res = cb(object[name], name);
                    if (res === false) {
                        break;
                    }
                }
            }
        },
        map: function(object, cb) {
            var result = [];
            this.forEach(object, function(value, name) {
                var newItem = value;
                if (cb) {
                    newItem = cb(value, name);
                }

                result.push(newItem)
            });

            return result;
        },
        zeroField: function(val, numSize) {
            var outZero = '';
            var zeroCount = numSize - String(val).length;
            for (var i = 0; i < zeroCount; i++) {
                outZero += '0';
            }
            return outZero+val;
        }
    }

});