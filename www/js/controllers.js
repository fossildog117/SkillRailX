angular.module('app.controllers', [])

  // nathan.liu.15@ucl.ac.uk

  .controller('profileCtrl', function ($scope, GetProfile, Token, ProfileSettings) {

    $scope.initProfileCtrl = function () {
      console.log("hello");
      GetProfile.getProfile(Token.getProperty()).then(function (response) {
        console.log(response.data);
        ProfileSettings.setProfileDetails(response.data);
        $scope.data = response.data;
        $scope.interests = $scope.data.interests;
        console.log($scope.interests);
      }, function (value) {
        console.log(value);
      });
    };

    $scope.editProfile = function () {
      console.log("hello");
    };

    $scope.initProfileCtrl();

  })

  .controller('editProfileCtrl', function ($scope, ProfileSettings, Token, EditProfile, CategoriesGET) {

    $scope.initEditProfileCtrl = function () {
      $scope.user = ProfileSettings.getProfileDetails();
    };

    $scope.initEditProfileCtrl();

    interestStatusChecker = function (title) {
      for(var itemNum = 0; itemNum < $scope.user.interests.length; itemNum++){
        if ($scope.user.interests[itemNum].title == title) {
          return true;
        }
      }
      return false;
    }

    $scope.categories = CategoriesGET.query();

    $scope.interests = [
      { title: "Content Creation", group: "Copywriting", id: 1 , checked: interestStatusChecker("Content Creation") },
      { title: "Proofreading", group: "Copywriting", id: 2 , checked: interestStatusChecker("Proofreading") },
      { title: "Video Editing", group: "Media", id: 3 , checked: interestStatusChecker("Video Editing") },
      { title: "Graphic Design", group: "Design", id: 4 , checked: interestStatusChecker("Graphic Design") },
      { title: "Translation", group: "Copywriting", id: 5 , checked: interestStatusChecker("Translation") },
      { title: "Videography", group: "Media", id: 6 , checked: interestStatusChecker("Videography")},
      { title: "Web Analytics", group: "Techies", id: 6 , checked: interestStatusChecker("Web Analytics") },
      { title: "Social Media Marketing", group: "Techies", id: 7 , checked: interestStatusChecker("Social Media Marketing") },
      { title: "SEO", group: "Techies", id: 8 , checked: interestStatusChecker("SEO") }
    ];

    $scope.saveProfileSettings = function () {

      /************Interest Edit******************/
      $scope.newInterests = [];
      var counter = 0;
      for(var itemNum = 0; itemNum < $scope.interests.length; itemNum++){
          if ($scope.interests[itemNum].checked){
            $scope.newInterests[counter] = {
                                "title": $scope.interests[itemNum].title,
                                "group": $scope.interests[itemNum].group,
                                "description": "TBC",
                                "id": $scope.interests[itemNum].id,
                              },
            counter++;
          }
      }

      /************Interest Edit******************/

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
        "interests": $scope.newInterests,
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

      // console.log(newSettings);

      EditProfile.makeRequest(newSettings, Token.getProperty()).then( function (response) {
        console.log(newSettings);
        console.log(response);
        /************Refresh Profile page******************/
      }, function (response) {
        console.log(response)
      });
    };

  })

  .controller('homeCtrl', function ($scope) {
  })

  .controller('myJobsCtrl', function ($scope) {

  })

  .controller('searchCtrl', function ($scope, CategoriesGET, Token) {
    $scope.jobs = CategoriesGET.query();
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
