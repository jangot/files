define([

], function() {

    var buffer = document.createElement('div');
    var otherVarsRegExp = new RegExp('<%= .+ %>', 'g');

    function getTemplateById(id) {
        var element = document.getElementById(id);

        if (!element) {
            return '';
        }

        return element.innerHTML;
    }

    function replaceVars(template, params) {
        template = template.replace(/ ( )+|\n/g, '');

        var result = template;
        for (var key in params) {
            var replaceRegExp = new RegExp('<%= ' + key + ' %>', 'g');
            result = result.replace(replaceRegExp, params[key]);
        }

        return result.replace(otherVarsRegExp, '');
    }

    return function(template, params) {
        if (template[0] === '#') {
            template = getTemplateById(template.substr(1));
        }
        if (!template) {
            throw Error('There is not template');
        };

        params = params || {};

        // TODO fix problem with table nodes
        buffer.innerHTML = replaceVars(template, params);

        return buffer.firstChild;
    }

});