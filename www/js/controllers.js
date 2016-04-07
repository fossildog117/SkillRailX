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
      { title: "Web Analytics", group: "Techies", id: 7 , checked: interestStatusChecker("Web Analytics") },
      { title: "Social Media Marketing", group: "Techies", id: 8 , checked: interestStatusChecker("Social Media Marketing") },
      { title: "SEO", group: "Techies", id: 9 , checked: interestStatusChecker("SEO") }
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

   .controller('homeCtrl', function ($scope, PublicProjects) {

    $scope.initHome = function () {
      PublicProjects.getPublicProjects().then(function (value) {

        $scope.items = value.data.items;

        console.log(value.data.items);
      }, function (error) {
        console.log(error);
      })
    };

    $scope.jobSelected = function (item) {
      console.log("user clicked button");
      console.log(item)
    };

    $scope.initHome();

  })

  .controller('myJobsCtrl', function ($scope) {

  })

  .controller('searchCtrl', function ($scope, CategoriesGET, categoryID) {
    $scope.categories = CategoriesGET.query();
    $scope.openCategory = function(catId) {
      categoryID.setProperty(catId);
      console.log(catId);
    }
  })

  .controller('search2Ctrl', function ($scope, categoryID) {
    var checker = function (object) {
      if (object == 0) {
        return {title: "Results"};
      } else {
        return object;
      }
    }
      $scope.category = checker(categoryID.getProperty());
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
