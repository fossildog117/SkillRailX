angular.module('app.services', ['ngResource'])

  .factory('Post', function ($resource) {
    // POSTs login details and returns object containing either
    // a token or an error message
    return $resource('https://data.skillrail.com/Token');
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
          url: 'https://data.skillrail.com/api/MyProfile',
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
          url: 'https://data.skillrail.com/api/MyProfile',
          data: newSettings,
          headers: {
            'Authorization': 'Bearer ' + Token,
            'Content-Type': 'application/json'
          }
        });
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
  });
