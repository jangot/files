define([

], function() {
    return function(model) {
        //TODO remove after delegate
        this['input change'] = change;

        function change(e) {
            var input = e.target;
            model.addFiles(input.files);

            var newInput = document.createElement('input');
            newInput.setAttribute('type', 'file');
            input.parentNode.insertBefore(newInput, input);
            input.parentNode.removeChild(input);

            newInput.addEventListener('change', change);
        }
    }
});