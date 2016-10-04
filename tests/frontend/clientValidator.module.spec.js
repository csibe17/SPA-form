describe("ClientValidatorService modul", function () {
    var ClientValidatorService;

    beforeEach(angular.mock.module('clientValidator'));
    beforeEach(inject(function (_ClientValidatorService_) {
        ClientValidatorService = _ClientValidatorService_;
    }));

    it('should exist', function () {
        expect(ClientValidatorService).toBeDefined();
    });

    it("should validate name - OK", function () {
        var result = ClientValidatorService.validateField({name:"name",value:"John"});
        expect(result).toEqual(1);
    });

    it("should validate occupation - OK", function () {
        var result = ClientValidatorService.validateField({name:"occupation",value:"Farmer"});
        expect(result).toEqual(1);
    });

    it("should validate email - OK", function () {
        var result = ClientValidatorService.validateField({name:"email",value:"john@mail.com"});
        expect(result).toEqual(1);
    });

    it("should validate name - NOK", function () {
        var result = ClientValidatorService.validateField({name:"name",value:"John26"});
        expect(result).toEqual(2);
    });

    it("should validate occupation - NOK", function () {
        var result = ClientValidatorService.validateField({name:"occupation",value:"Farmer26"});
        expect(result).toEqual(2);
    });

    it("should validate email - NOK", function () {
        var result = ClientValidatorService.validateField({name:"email",value:"johnmail.com"});
        expect(result).toEqual(2);
    });

    it("should validate name - OFF", function () {
        var result = ClientValidatorService.validateField({name:"name",value:""});
        expect(result).toEqual(3);
    });

    it("should validate occupation - OFF", function () {
        var result = ClientValidatorService.validateField({name:"occupation",value:""});
        expect(result).toEqual(3);
    });

    it("should validate email - OFF", function () {
        var result = ClientValidatorService.validateField({name:"email",value:""});
        expect(result).toEqual(3);
    });

});
