// Used for validating all inputs of the user
angular.module('clientValidator', [])
    .service('ClientValidatorService', function () {
        var _status = {
            ok: 1,
            error: 2,
            off: 3
        };

        // Private method to store specific validators
        function getValidator(type) {
            var validators = {
                "name": new XRegExp("^[\\p{L} ]+$"),///^\\p{L}+$/,
                "occupation": /^[a-zA-Z \'\&\/\-\(\),]*$/,//new XRegExp("^[\\p{L} \'\&\/\-\(\)]*$"),
                "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            };

            return validators[type];
        }

        // Public method to validate field
        function validateField(fieldObj) {
            if (fieldObj.value === "") {
                return _status.off;
            }
            else if (getValidator(fieldObj.name).test(fieldObj.value)) {
                return _status.ok;
            }
            else {
                return _status.error;
            }
        }

        return {
            validateField: validateField
        };

    });
