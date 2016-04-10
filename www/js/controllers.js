angular.module('app.controllers', ['ngRoute'])

  // nathan.liu.15@ucl.ac.uk

  .controller('profileCtrl', function ($ionicScrollDelegate, $ionicSlideBoxDelegate, $scope, $rootScope, $route, $state, $timeout, Token, ProfileManager) {

    $scope.user = {};

    function setUser (input) {
      $scope.user = input;
    }

    $scope.initProfileCtrl = function () {
      console.log("HELLO");
      ProfileManager.loadProfile(Token.getProperty()).then(function (response) {

        console.log(response.data);
        setUser(response.data);
        ProfileManager.setProfileDetails(response.data);

      }, function (value) {
        console.log(value);
      });
    };

    $scope.refresh = function () {
      $scope.initProfileCtrl();
    };

    $rootScope.$on('saveSuccess', function (event, data) {
      setUser(data);
    });

    $scope.initProfileCtrl();

    //**********************************CSS*********************************//

    $ionicSlideBoxDelegate.update();
    $scope.onUserDetailContentScroll =  function onUserDetailContentScroll(){
      var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
      var scrollView = scrollDelegate.getScrollView();
      $scope.$broadcast('userDetailContent.scroll', scrollView);
    }

  })





  .controller('editProfileCtrl', function ($state, $route, $scope, $rootScope, PopUpManager, ProfileManager, Token, CategoriesGET) {

    $scope.initEditProfileCtrl = function () {

      $scope.user = ProfileManager.getProfileDetails();
      $scope.temp = $scope.user;

      interestStatusChecker = function (title) {
        for (var itemNum = 0; itemNum < $scope.user.interests.length; itemNum++) {
          if ($scope.user.interests[itemNum].title == title) {
            return true;
          }
        }
        return false;
      };

      $scope.interests = [
        {title: "Content Creation", group: "Copywriting", id: 1, checked: interestStatusChecker("Content Creation")},
        {title: "Proofreading", group: "Copywriting", id: 2, checked: interestStatusChecker("Proofreading")},
        {title: "Video Editing", group: "Media", id: 3, checked: interestStatusChecker("Video Editing")},
        {title: "Graphic Design", group: "Design", id: 4, checked: interestStatusChecker("Graphic Design")},
        {title: "Translation", group: "Copywriting", id: 5, checked: interestStatusChecker("Translation")},
        {title: "Videography", group: "Media", id: 6, checked: interestStatusChecker("Videography")},
        {title: "Web Analytics", group: "Techies", id: 7, checked: interestStatusChecker("Web Analytics")},
        {title: "Social Media Marketing", group: "Techies", id: 8, checked: interestStatusChecker("Social Media Marketing")},
        {title: "SEO", group: "Techies", id: 9, checked: interestStatusChecker("SEO")}
      ];

    };

    $scope.categories = CategoriesGET.query();

    $scope.saveProfileSettings = function () {

      /************Interest Edit******************/
      $scope.newInterests = [];
      var counter = 0;
      console.log($scope.interests.length);
      for (var itemNum = 0; itemNum < $scope.interests.length; itemNum++) {
        if ($scope.interests[itemNum].checked) {
          $scope.newInterests[counter] = {
            "title": $scope.interests[itemNum].title,
            "group": $scope.interests[itemNum].group,
            "description": "TBC",
            "id": $scope.interests[itemNum].id
          };
          counter++;
        }
      }

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

      ProfileManager.editProfile(newSettings, Token.getProperty()).then(function (response) {
         console.log(response.data);
         ProfileManager.setProfileDetails(response.data);
         ProfileManager.setInterests($scope.newInterests);

         $rootScope.$emit('saveSuccess', newSettings);

         PopUpManager.alert('Your settings have been successfully saved');

       }, function (response) {
         ProfileManager.setProfileDetails(newSettings);
         console.log(response)
       })
     };

     $scope.initEditProfileCtrl();

   })










  .controller('homeCtrl', function ($scope, PublicProjects, $state, JobManager) {

    $scope.initHome = function () {
      PublicProjects.getPublicProjects().then(function (value) {
        $scope.items = value.data.items;
        console.log(value.data.items);
      }, function (error) {
        console.log(error);
      })
    };

    $scope.jobSelected = function (listing) {
      JobManager.setTempJob(listing);
      $state.go('tabsController.publicJobs');
    };

    $scope.initHome();
  })









  .controller('publicJobsCtrl', function ($scope, JobManager, $state) {

    $scope.viewedListing = {};

    $scope.initMyJobsCtrl = function () {
      $scope.viewedListing = JobManager.getTempJob();
      console.log($scope.viewedListing);
    };

    $scope.newBid = function () {
      $state.go('tabsController.createBid');
    };

    $scope.initMyJobsCtrl();

  })











  .controller('createBidCtrl', function ($scope, JobManager, BidManager) {

    // currently configuring bids
    $scope.postBid = function () {
      var user = JobManager.getTempJob();
      var bid = {
        // Configure Bid
        'bid' : this.newBid,
        'description' : this.newDescription
      };

      console.log(bid);
      console.log(BidManager.getBids());

      BidManager.setBid(bid);
      BidManager.addBid(bid);
      BidManager.postBid().then(function (value) {
        // Configure if POST is successful
      }, function (error) {
        // Handle error
      });
    }

  })






  .controller('myJobsCtrl', function ($state, $scope, BidManager) {

    $scope.bidsList = [];

    $scope.initSearchCtrl = function () {
      console.log("hello success");

      if (BidManager.getBids().length == 0) {
        $scope.bidsList = [{'description' : "You currently have no bids"}];
      } else {
        $scope.bidsList = BidManager.getBids();
      }
    };

    $scope.userProposals = function (item) {

      BidManager.setBid(item);
      $state.go();

    };

    $scope.initSearchCtrl();
  })







  .controller('searchCtrl', function ($scope, $state, SearchManager, CategoriesGET) {

    $scope.categories = CategoriesGET.query();
    $scope.searchResult = "";

    $scope.openCategory = function(categoryID, searchFor) {

      SearchManager.setID(categoryID);
      SearchManager.setSearchResult(searchFor);


    }


  })







  .controller('search2Ctrl', function ($state, $scope, JobManager, SearchManager, PublicProjects) {

    var checker = function (object) {
      if (object == 0) {
        return {title: "Results"};
      } else {
        return object;
      }
    };

    $scope.category = checker(SearchManager.getID());

    PublicProjects.getPublicProjects().then(function (value) {

      $scope.items = value.data.items;
      $scope.searchResult = SearchManager.getSearchResult();

      console.log(value.data.items);
      }, function (error) {
      console.log(error);
    })

    $scope.jobSelected = function (listing) {
      JobManager.setTempJob(listing);
      $state.go('tabsController.publicJobs');
    };

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

  .controller('signupCtrl', function ($scope, $exceptionHandler, PopUpManager, SignUp, Login) {

    $scope.initSignupCtrl = function () {
      console.log("hello");
    };

    $scope.signup = function () {

      try {

        if ($scope.postData.password != null && $scope.postData.confirmPassword != null && $scope.postData.email != null && $scope.postData.firstName != null && $scope.postData.lastName != null && $scope.postData.phoneNumber != null) {
          if ($scope.postData.password == $scope.postData.confirmPassword) {
            var newUser = {
              "username": $scope.postData.email,
              "password": $scope.postData.password,
              "firstName": $scope.postData.firstName,
              "lastName": $scope.postData.lastName,
              "phoneNumber": $scope.postData.phoneNumber,
              "isStudent": true,
              "studentEmail": $scope.postData.email,
              "companyName": ""
            };

            var user = {
              grant_type: 'password',
              username: newUser.username,
              password: newUser.password
            };

            SignUp.attemptToRegister(newUser).then(function () {

              Login.login(user);

            }, function (error) {

              // Handle error

              if (error.statusText == "Internal Server Error") {
                // Log in the user
                Login.login(user);
              } else {
                // Popup showing error message
                PopUpManager.alert($scope.postData.email + ' has already been taken :(');
              }
            })
          } else {
            PopUpManager.alert("Passwords do not match");
          }
        } else {
          PopUpManager.alert("Please fill in all fields");
        }
      } catch (TypeError) {
        PopUpManager.alert("Please fill in all fields");
        $exceptionHandler(TypeError);
      }
    };

    $scope.initSignupCtrl();

  });
