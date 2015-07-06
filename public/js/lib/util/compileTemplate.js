define([

], function() {

    var buffer = document.createElement('div');
    var otherVarsRegExp = new RegExp('<%= .+ %>', 'g');

    function getTemplateById(id) {
        var element = document.getElementById(id);

        if (!element) {
            return '';
        }

        var result = element.innerHTML;

        return result.replace(/ ( )+|\n/g, '');
    }

    return function(template, params) {
        if (template[0] === '#') {
            template = getTemplateById(template.substr(1));
        }
        if (!template) {
            throw Error('There is not template');
        };

        params = params || {};

        var result = template;
        for (var key in params) {
            var replaceRegExp = new RegExp('<%= ' + key + ' %>', 'g');
            result = result.replace(replaceRegExp, params[key]);
        }

        result = result.replace(otherVarsRegExp, '');

        buffer.innerHTML = result;

        return buffer.firstChild;
    }

});