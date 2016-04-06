angular.module('app.services', ['ngResource'])

  .factory('Post', function ($http, $httpParamSerializerJQLike) {
    // POSTs login details and returns object containing either
    return {
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

  .factory('SuggestedJobsServ', function ($resource) {
    return $resource('https://data.skillrail.com/Products');
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

  .service('PublicProjects', function ($http) {
    return {
      getPublicProjects: function (Token) {
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


  // .factory('CategoriesGET', function ($http) {
  //   return {
  //     getCategories: function() {
  //       return $http({
  //         method: 'GET',
  //         url: url + '/api/Categories',
  //         headers: {
  //           'Authorization': 'Bearer ' + token
  //         }
  //       });
  //     }
  //   }
  // })

  .factory('CategoriesGET', function ($resource) {
    return $resource(url + '/api/Categories');
  });




  var url = 'http://api.skillrail.com';
