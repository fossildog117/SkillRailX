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

  .controller('loginCtrl', function ($scope, Post, $http, $state, $ionicPopup, Token, GetProfile) {

    $scope.postData = {};

    $scope.login = function () {

      var user = {
        grant_type: 'password',
        username: $scope.postData.username,
        password: $scope.postData.password
      };

      Post.attemptLogin(user).then(function (value) {
        if (value.status == 200) {
          var token = value.data['access_token'];
          Token.setProperty(token);

          GetProfile.getProfile(Token.getProperty()).then(function (response) {

            if (response.data.isStudent) {
              $state.go("tabsController.home");
            } else {
              $ionicPopup.alert({
                title: '',
                template: "You need a student account to login",
                okText: 'OK'
              });
            }
          });
        }
        console.log(value);
      }, function (error) {
        $ionicPopup.alert({
          title: '',
          template: "Invalid email or password",
          okText: 'OK'
        });
        console.log(error);
      });
    };
  })

  .controller('signupCtrl', function ($scope) {

  });
