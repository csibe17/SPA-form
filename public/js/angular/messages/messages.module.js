angular.module('messages', [])
	.service('MessageHandler', [
        function() {
            var messages = [];

            function clearMessages() {
                messages = [];
            }

            function addMessage(newMessage) {
                messages.push(newMessage);
            }

            function getMessages() {
                return messages;
            }

            return {
                clearMessages: clearMessages,
                addMessage: addMessage,
                getMessages: getMessages
            };
        }
    ]);
