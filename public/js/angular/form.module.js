// Main controller of the form
angular.module('form', [])
    .controller('FormController', ["$scope", "$window", "MessageHandler", "RequestHandler", "ClientValidatorService",
        function ($scope, $window, MessageHandler, RequestHandler, ClientValidatorService) {
            // initialize all data
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

            // initialize the occupationlist by getting the list from the server
            RequestHandler.create({});
            RequestHandler.send("GET", "getOccupations").then(function (res) {
                $scope.form.data.occupationList = res.occupations;
            });

            // show welcome message
            MessageHandler.addMessage({message: 'Welcome! Please fill in all fields.', messageType: 'info'});
            $scope.messages = MessageHandler.getMessages();

            // click handler of the Register button
            $scope.registerClick = function () {
                var sendData = $scope.form.data;
                sendData.birthday = moment($scope.form.data.birthday).format('YYYY-MM-DD');

                RequestHandler.create(sendData);
                RequestHandler.send("POST", "addUser").then(function (res) {
                    // scroll to top of the page
                    $window.scrollTo(0, 0);
                    // clear fields after success
                    if (res.code === 200) {
                        $scope.form.data.name = "";
                        $scope.form.data.email = "";
                        $scope.form.data.occupation = "";
                        $scope.form.data.birthday = new Date("1990-01-01");
                        $scope.form.errors = {};
                        $scope.filterValue = "";
                    }
                });
                $scope.messages = MessageHandler.getMessages();
            };

            // onblur event of all input fields
            $scope.fieldBlur = function (event) {
                // validate field
                ClientValidatorService.validateField({name: event.target.name, value: event.target.value})
                $scope.form.errors = ClientValidatorService.getErrors();
            };

            // keyup event on the occupation field
            $scope.occupationKeyUp = function (event) {
                $scope.form.statuses.occupationsList = true;
                $scope.filterValue = event.target.value;
                // on TAB and ENTER key hide the list
                if (event.keyCode == 9 || event.keyCode == 13) {
                    $scope.form.statuses.occupationsList = false;
                }
            };

            // show/hide occupation list dropdown
            $scope.toogleDropdown = function () {
                if ($scope.form.statuses.occupationsList == true) {
                    $scope.form.statuses.occupationsList = false;
                }
                else {
                    $scope.form.statuses.occupationsList = true;
                }
            };

            // select an item from the occupation dropdown
            $scope.selectItem = function (value) {
                $scope.form.data.occupation = value;
                ClientValidatorService.validateField({name: 'occupation', value: value})
                $scope.form.statuses.occupationsList = false;
            };

        }
    ]);