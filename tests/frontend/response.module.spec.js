describe("ResponseHandler modul", function () {
    var MessageHandler, ResponseHandler;

    beforeEach(angular.mock.module('response', function ($provide) {
        $provide.service('MessageHandler', function () {
            this.addMessage = jasmine.createSpy("addMessage() spy");
        });
    }));

    beforeEach(angular.mock.inject(function (_ResponseHandler_, _MessageHandler_) {
        ResponseHandler = _ResponseHandler_;
        MessageHandler = _MessageHandler_;
    }));

    it('should exist', function () {
        expect(ResponseHandler).toBeDefined();
    });

    it("should handle success", function () {
        var data = ResponseHandler.handleSuccess({data: {messages: ["message1", "message2"]}});
        expect(MessageHandler.addMessage.calls.count()).toEqual(2);
        expect(data.messages.length).toEqual(2);
    });

    it("should handle errors", function () {
        ResponseHandler.handleError({statusText: "status"});
        expect(MessageHandler.addMessage).toHaveBeenCalled();
    });

});
