describe("MessageHandler modul", function () {
    var MessageHandler;

    beforeEach(angular.mock.module('messages'));
    beforeEach(inject(function (_MessageHandler_) {
        MessageHandler = _MessageHandler_;
    }));

    it('should exist', function () {
        expect(MessageHandler).toBeDefined();
    });

    it("messages variable should have initialized", function () {
        expect(MessageHandler.getMessages()).toBeDefined();
    });

    it("should have message after addition", function () {
        MessageHandler.addMessage("test1");
        MessageHandler.addMessage("test2");
        expect(MessageHandler.getMessages().length).toBe(2);
    });

    it("should clear messages", function () {
        MessageHandler.addMessage("test1");
        expect(MessageHandler.getMessages().length).toBe(1);
        MessageHandler.clearMessages();
        expect(MessageHandler.getMessages().length).toBe(0);
    });

});
