define([

    'lib/util'

], function(util) {
    var container = document.querySelector('.messages');
    return {
        error: function(message) {
            var messageElement = util.compileTemplate('#messageTemplate', {
                className: 'message_error',
                message: message
            });
            container.appendChild(messageElement);

            setTimeout(function() {
                container.removeChild(messageElement);
            }, 2000);
        },
        info: function() {

        }
    }
});