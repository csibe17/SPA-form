// Used for handling the server's response
angular.module('response', [])
    .service('ResponseHandler', ["MessageHandler",
        function (MessageHandler) {
            // Handle successful AJAX
            function handleSuccess(response) {
                // parse and show all messages from response
                if (response.data.messages) {
                    for (var msg = 0; msg < response.data.messages.length; msg++) {
                        MessageHandler.addMessage(response.data.messages[msg]);
                    }
                }

                // return the response code
                return response.data;
            }

            // Handle errorful AJAX
            function handleError(response) {
                MessageHandler.addMessage({
                    message: response.statusText ? response.statusText + " occured" : "Communication error occured",
                    messageType: "danger"
                });
            }

            return {
                handleSuccess: handleSuccess,
                handleError: handleError
            };
        }
    ]);
