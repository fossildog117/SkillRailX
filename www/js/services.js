angular.module('app.services', ['ngResource'])

  .service('Login', function ($http, $httpParamSerializerJQLike, $state, $ionicPopup, Token, GetProfile) {
    // POSTs login details and returns object containing either
    return {
      login: function (user) {
        this.attemptLogin(user).then(function (value) {

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
        }, function (error) {
          $ionicPopup.alert({
            title: '',
            template: error.statusText,
            okText: 'OK'
          });
          console.log(error);
        });
      },

      attemptLogin: function (user) {
        return $http({
          method: 'POST',
          url: url + '/Token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(user)
        });
      }
    }
  })

  .factory('SignUp', function ($http) {
    return {
      attemptToRegister: function (newUser) {
        return $http({
          method: 'POST',
          url: url + '/api/Account/Register',
          headers: {
            'Content-Type': 'application/json'
          },
          data: newUser
        })
      }
    }
  })

  .factory('GetProfile', function ($http) {
    // Gets the profile details via HTTP request

    return {
      getProfile: function(token) {
        return $http({
          method: 'GET',
          url: url + '/api/MyProfile',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      }
    }
  })

  .service('EditProfile', function ($http) {
    return {
      makeRequest: function (newSettings, Token) {
        return $http({
          method: 'PUT',
          url: url + '/api/MyProfile',
          data: newSettings,
          headers: {
            'Authorization': 'Bearer ' + Token,
            'Content-Type': 'application/json'
          }
        });
      }
    }
  })

  .service('PublicProjects', function ($http, Token) {
    return {
      getPublicProjects: function () {
        return $http({
          method: 'GET',
          url: url + '/api/PublicProject',
          headers: {
            'Authorization': 'Bearer ' + Token.getProperty()
          }
        })
      }
    }
  })

  .service('ProfileSettings', function() {
    // Stores the GET request from MyProfile
    var profileDetails = {};

    return {
      getProfileDetails: function () {
        return profileDetails;
      },
      setProfileDetails: function (value) {
        profileDetails = value;
      }
    }
  })

  .service('JobManager', function () {

    var tempJob = {};

    return {
      postBid: function (bid) {
        return $http({
          method: 'POST',
          url: url + 'api/Bid',
          headers: {
            'Authorization' : 'application/json'
          },
          data: bid
        })
      },
      getTempJob: function () {
        return tempJob;
      },
      setTempJob: function (jobListing) {
        tempJob = jobListing;
      }
    }
  })

  .service('Token', function () {
    // Stores Token

    var Token = 'Token';

    return {
      getProperty: function () {
        return Token;
      },
      setProperty: function (value) {
        Token = value;
      }
    };
  })

  .service('categoryID', function () {
    var ID = 0;
    return {
      getProperty: function () {
        return ID;
      },
      setProperty: function (value) {
        ID = value;
      }
    };
  })

  .service('interestsServ', function () {
    var interests = {};
    return {
      getProperty: function () {
        return interests;
      },
      setProperty: function (value) {
        interests = value;
      }
    };
  })

  .factory('CategoriesGET', function ($resource) {
    return $resource(url + '/api/Categories');
  });





  var url = 'http://api.skillrail.com';
