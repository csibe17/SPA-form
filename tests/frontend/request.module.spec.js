describe("RequestHandler modul", function () {
    var RequestHandler, $http, MessageHandler, ResponseHandler, cfpLoadingBar;
    var getData,postData;

    beforeEach(angular.mock.module('request', function ($provide) {
        $provide.service('$http', function () {
            this.get = function (path) {
                return {
                    then: function (ok,error) {
                        ok();
                        return {
                            then: function (res) {
                                getData={data:"test"};
                                return {data:"test"};
                            }
                        }
                    }
                };
            };
            this.post = function (path,reqBody,obj) {
                return {
                    then: function (ok,error) {
                        ok();
                        return {
                            then: function (res) {
                                postData={data:"test"};
                                return {data:"test"};
                            }
                        }
                    }
                };
            };
        });
        $provide.service('MessageHandler', function () {
            this.clearMessages = jasmine.createSpy("MessageHandler.clearMessages() spy");
        });
        $provide.service('ResponseHandler', function () {
            this.handleSuccess = jasmine.createSpy("ResponseHandler.handleSuccess() spy");
            this.handleError = jasmine.createSpy("ResponseHandler.handleError() spy");
        });
        $provide.service('cfpLoadingBar', function () {
            this.start = jasmine.createSpy("cfpLoadingBar.start() spy");
        });
    }));

    beforeEach(angular.mock.inject(function (_RequestHandler_, _$http_, _MessageHandler_, _ResponseHandler_, _cfpLoadingBar_) {
        RequestHandler = _RequestHandler_;
        $http = _$http_;
        MessageHandler = _MessageHandler_;
        ResponseHandler = _ResponseHandler_;
        cfpLoadingBar = _cfpLoadingBar_;
    }));

    it('should exist', function () {
        expect(RequestHandler).toBeDefined();
    });

    it("should send GET request", function () {
        RequestHandler.send("GET", "/testroute");
        expect(MessageHandler.clearMessages).toHaveBeenCalled();
        expect(cfpLoadingBar.start).toHaveBeenCalled();
        expect(getData).toEqual({data:"test"});
        expect(ResponseHandler.handleSuccess).toHaveBeenCalled();
    });

    it("should send POST request", function () {
        RequestHandler.send("POST", "/testroute");
        expect(MessageHandler.clearMessages).toHaveBeenCalled();
        expect(cfpLoadingBar.start).toHaveBeenCalled();
        expect(postData).toEqual({data:"test"});
        expect(ResponseHandler.handleSuccess).toHaveBeenCalled();
    });

});
