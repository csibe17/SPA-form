angular.module('form', [])
    .controller('FormController', ["$scope", "$window", "MessageHandler", "RequestHandler", "ClientValidatorService", "AutoCompleteService",
        function ($scope, $window, MessageHandler, RequestHandler, ClientValidatorService, AutoCompleteService) {
            $scope.form = {
                data: {
                    name: "",
                    email: "",
                    occupation: "",
                    birthday: "",
                    occupationList: []
                },
                statuses: {
                    occupationsList: false
                },
                errors: {}
            };

            $scope.filterValue = "";

            $scope.form.data.birthday = new Date("1990-01-01");
            $scope.birtdayOptions = {
                minDate: new Date("1900-01-01"),
                maxDate: new Date(),
                showWeeks: false,
                datepickerMode: 'year',
                yearColumns: 4,
                yearRows: 5
            };

            RequestHandler.create({});
            RequestHandler.send("GET", "getOccupations").then(function (res) {
                console.log(res);
                $scope.form.data.occupationList = res.occupations;
            });

            MessageHandler.addMessage({message: 'Welcome! Please fill in all fields.', messageType: 'info'});
            $scope.messages = MessageHandler.getMessages();

            $scope.registerClick = function () {
                var sendData = $scope.form.data;
                sendData.birthday = moment($scope.form.data.birthday).format('YYYY-MM-DD');

                RequestHandler.create(sendData);
                RequestHandler.send("POST", "addUser").then(function (res) {
                    // scroll to top of the page
                    $window.scrollTo(0, 0);
                    // clear fields after success
                    if (res.code === 200) {
                        $scope.form.data = {
                            name: "",
                            email: "",
                            occupation: "",
                            birthday: new Date("1990-01-01")
                        };
                        $scope.form.errors = {};
                    }
                });
                $scope.messages = MessageHandler.getMessages();
            };

            $scope.fieldBlur = function (event) {
                ClientValidatorService.validateField({name: event.target.name, value: event.target.value})
                $scope.form.errors = ClientValidatorService.getErrors();
            };

            $scope.occupationKeyUp = function (event) {
                $scope.form.statuses.occupationsList = true;
                $scope.filterValue = event.target.value;
                if (event.keyCode == 9 || event.keyCode == 13) {
                    $scope.form.statuses.occupationsList = false;
                }
            };

            $scope.toogleDropdown = function () {
                if ($scope.form.statuses.occupationsList == true) {
                    $scope.form.statuses.occupationsList = false;
                }
                else {
                    $scope.form.statuses.occupationsList = true;
                }
            };

            $scope.selectItem = function (value) {
                $scope.form.data.occupation = value;
                ClientValidatorService.validateField({name: 'occupation', value: value})
                $scope.form.statuses.occupationsList = false;
            };

            $scope.$watch("form.data.occupation", function (newValue, oldValue) {
                    
                }
            );

            $scope.occupationKeyDown = function (event) {

            };
        }
    ]);