angular.module('app.services', ['ngResource'])

  .service('Login', function ($http, $httpParamSerializerJQLike, $state, PopUpManager, Token, ProfileManager) {
    // POSTs login details and returns object containing either
    return {
      login: function (user) {
        this.attemptLogin(user).then(function (value) {

          if (value.status == 200) {

            var token = value.data['access_token'];
            Token.setProperty(token);

            ProfileManager.loadProfile(Token.getProperty()).then(function (response) {

              if (response.data.isStudent) {
                $state.go("tabsController.home");
              } else {
                PopUpManager.alert("You need a student account to login");
              }
            });
          }
        }, function (error) {
          PopUpManager.alert(error.statusText);
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

  .service('ProfileManager', function ($http) {

    var profileDetails = {};
    var interests  = {};

    return {

      loadProfile: function (token) {
        return $http({
          method: 'GET',
          url: url + '/api/MyProfile',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      },

      editProfile: function (newSettings, Token) {
        return $http({
          method: 'PUT',
          url: url + '/api/MyProfile',
          data: newSettings,
          headers: {
            'Authorization': 'Bearer ' + Token,
            'Content-Type': 'application/json'
          }
        });
      },

      getProfileDetails: function () {
        return profileDetails;
      },

      setProfileDetails: function (value) {
        profileDetails = value;
      },

      getInterests: function () {
        return interests;
      },

      setInterests: function (value) {
        interests = value;
      }

    }
  })

  .service('BidManager', function ($http) {

    var bid = {};

    return {
      postBid: function () {
        return $http({
          method: 'POST',
          url: url + '/api/Bid',
          headers: {
            'Content-Type': 'application/json'
          },
          data: bid
        })
      },
      setBid: function (newBid) {
        bid = newBid;
      },
      getBid: function () {
        return bid;
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
            'Authorization': 'application/json'
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

  .service('PopUpManager', function ($ionicPopup) {
    return {
      alert: function (message) {
        $ionicPopup.alert({
          title: '',
          template: message,
          okText: 'OK'
        });
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

  .service('SearchManager', function () {
    var ID = 0;
    var searchResult = "nothing";
    return {
      getID: function () {
        return ID;
      },
      setID: function (value) {
        ID = value;
      },
      getSearchResult: function() {
        return searchResult;
      },
      setSearchResult: function(value) {
        searchResult = value;
      }
    };
  })

  .factory('CategoriesGET', function ($resource) {
    return $resource(url + '/api/Categories');
  });

  var url = 'http://api.skillrail.com';
