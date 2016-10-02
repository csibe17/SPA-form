// Used for handling messages
angular.module('messages', [])
	.service('MessageHandler', [
        function() {
            var messages = [];

            function clearMessages() {
                messages = [];
            }

            function addMessage(newMessage) {
                //newMessage.message=newMessage.message.replace(/\n/g, "<br/>");
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
