angular.module('app.controllers', [])

  // nathan.liu.15@ucl.ac.uk

  .controller('profileCtrl', function ($scope, GetProfile, Token, ProfileSettings) {

    $scope.initProfileCtrl = function () {
      console.log("hello");
      GetProfile.getProfile(Token.getProperty()).then(function (response) {
        console.log(response.data);
        ProfileSettings.setProfileDetails(response.data);
        $scope.data = response.data;
      }, function (value) {
        console.log(value);
      });
    };

    $scope.editProfile = function () {

      // Configure additional set up if needed

      console.log("hello");

    };

    $scope.initProfileCtrl();

  })

  .controller('editProfileCtrl', function ($scope, ProfileSettings, Token, EditProfile) {

    $scope.initEditProfileCtrl = function () {
      $scope.user = ProfileSettings.getProfileDetails();
    };

    $scope.initEditProfileCtrl();

    $scope.saveProfileSettings = function () {

      var newSettings = {
        "firstName": $scope.user.firstName,
        "lastName": $scope.user.lastName,
        "title": null,
        "uniqueUrl": null,
        "aboutMe": $scope.user.aboutMe,
        "description": null,
        "pictureUrl": "/Content/layouts/layout3/img/avatar.png",
        "averageRating": 0,
        "completedProjects": 0,
        "isStudent": true,
        "studentEmail": "sample@sample.com",
        "companyName": null,
        "interests": [],
        "skills": null,
        "ongoingProjects": 0,
        "completeProjects": 0,
        "failedProjects": 0,
        "currentUniversity": $scope.user.currentUniversity,
        "currentCourse": $scope.user.currentCourse,
        "graduationYear": null,
        "location": null,
        "id": 0
      };

      console.log(newSettings);

      EditProfile.makeRequest(newSettings, Token.getProperty()).then( function (response) {
        console.log(response);
      }, function (response) {
        console.log(response)
      });
    };

  })

  .controller('homeCtrl', function ($scope) {

  })

  .controller('myJobsCtrl', function ($scope) {

  })

  .controller('searchCtrl', function ($scope) {

  })

  .controller('search2Ctrl', function ($scope) {

  })

  // **********************************************************
  // **                                                      **
  // **                 Business Sign Up                     **
  // **                                                      **
  // **********************************************************

  .controller('businessProfileCtrl', function ($scope) {

  })

  .controller('businessHomeCtrl', function ($scope) {

  })

  .controller('businessSearchCtrl', function ($scope) {

  })

  .controller('businessSearch2Ctrl', function ($scope) {

  })

  // **********************************************************
  // **                                                      **
  // **                 Login and Sign Up                    **
  // **                                                      **
  // **********************************************************

    .controller('loginCtrl', function ($scope, Login) {

    $scope.postData = {};

    $scope.login = function () {

      var user = {
        grant_type: 'password',
        username: $scope.postData.username,
        password: $scope.postData.password
      };

      Login.login(user);

    };
  })

  .controller('signupCtrl', function ($scope, $exceptionHandler, $ionicPopup, SignUp, Login) {

    $scope.initSignupCtrl = function () {
      console.log("hello");
    };

    $scope.signup = function () {

      try {

        if ($scope.postData.password != null && $scope.postData.confirmPassword != null && $scope.postData.email != null && $scope.postData.firstName != null && $scope.postData.lastName != null && $scope.postData.phoneNumber != null) {
          if ($scope.postData.password == $scope.postData.confirmPassword) {
            var newUser = { "username": $scope.postData.email, "password": $scope.postData.password, "firstName": $scope.postData.firstName, "lastName": $scope.postData.lastName, "phoneNumber": $scope.postData.phoneNumber, "isStudent": true, "studentEmail": $scope.postData.email, "companyName": ""};

            var user = {
              grant_type: 'password',
              username: newUser.username,
              password: newUser.password
            };

            SignUp.attemptToRegister(newUser).then( function () {

              Login.login(user);

            }, function (error) {

              // Handle error

              if (error.statusText == "Internal Server Error") {
                // Log in the user
                Login.login(user);
              } else {
                // Popup showing error message
                $scope.error($scope.postData.email + ' has already been taken :(');
              }

            })

          } else {
            $scope.error("Passwords do not match");
          }
        } else {
          $scope.error("Please fill in all fields");
        }
      } catch (TypeError) {
        $scope.error("Please fill in all fields");
        $exceptionHandler(TypeError);
      }
    };

    $scope.error = function (errorMessage) {
      $ionicPopup.alert({
        title: '',
        template: errorMessage,
        okText: 'OK'
      });
    };


    $scope.initSignupCtrl();

  });
