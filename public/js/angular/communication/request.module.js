// Used for creating and sending the server request
angular.module('request', [])
    .service('RequestHandler', ["$http", "MessageHandler", "ResponseHandler", "cfpLoadingBar",
        function ($http, MessageHandler, ResponseHandler, cfpLoadingBar) {
            var requestBody = {};

            function create(data) {
                requestBody = data;
            }

            function send(reqType, path) {
                // clear visible messages
                MessageHandler.clearMessages();
                // start loading animation
                cfpLoadingBar.start();

                // GET request
                if (reqType === "GET") {
                    return $http.get(path)
                        .then(ResponseHandler.handleSuccess, ResponseHandler.handleError)
                        .then(function (res) {
                            // handle response code in the controller
                            return res;
                        });
                }

                // POST request
                if (reqType === "POST") {
                    return $http.post(path, requestBody, {})
                        .then(ResponseHandler.handleSuccess, ResponseHandler.handleError)
                        .then(function (res) {
                            // handle response code in the controller
                            return res;
                        });
                }
            }

            return {
                create: create,
                send: send
            };
        }
    ]);
