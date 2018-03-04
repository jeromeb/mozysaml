// validate contact form

var app = angular.module("samlGen", []);

app.controller('main', function($scope, $parse, $timeout, $http, $timeout, $interval) {


    $scope.identityProviders = [{
        value: 'ms',
        label: 'Microsoft Azure AD'
    }, {
        value: 'gg',
        label: 'Google SAML Apps'
    }];
    $timeout($scope.saml = {
        idp: {
            value: 'ms',
            label: 'Microsoft Azure AD'
        }
    }, 0);

    // $timeout($scope.samlResult = { "status": true, "authurl": "https:\/\/login.microsoftonline.com\/ad\/saml2?SAMLRequest=fZJRT8IwFIX%2FytL3bWyCJg1bMiFGEpBFpom81a1Ak7Z39nYo%2Fnq7LkR9gNf23J7zndspMiVbWnT2oJ%2F5R8fRBl9KaqT%2BIiOd0RQYCqSaKY7U1nRTrJY0jUa0NWChBkn%2BjFyfYIjcWAGaBIt5Rlbr7RsJXrlBd5QR9yYJSgNH0XDz5OycAr5PTovY8YVGy7R1slEyDkd3YXJbpTd0ktLxZEuCuYsuNOsfz8jB2hZpHEvYCx0pURtA2FnQUmge1aBi1sQ9YeoNPcW90I3Q%2B%2BsA74MI6WNVlWG53lQkKM5QM9DYKW423BxFzV%2Bel79JmGs4jZTDGexx8Cf5tI9BPaHJz7kvqKc%2B81nsJ1vaF7WYlyBFfQoewCjmOrq0tiRK%2FCJFE%2B68lHLFhCyaxnBExyIlfM4MZ9aVb03HSZwPrv8%2FSf4D", "samlEndpoint": "https:\/\/sts.windows.net\/ad\/", "decryptedRequest": "<samlp:AuthnRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\" xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\" ID=\"MOZY\" Version=\"2.0\" ProviderName=\"Mozy\" IssueInstant=\"2014-07-16T23:52:45Z\" Destination=\"https:\/\/login.microsoftonline.com\/ad\/saml2\" ProtocolBinding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" AssertionConsumerServiceURL=\"https:\/\/auth2.mozy.com\/asd\/saml\"><saml:Issuer>https:\/\/auth2.mozy.com\/asd\/saml<\/saml:Issuer><samlp:NameIDPolicy Format=\"urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress\" AllowCreate=\"true\"\/><\/samlp:AuthnRequest>" }, 0);

    $scope.submitSAML = function(samlData) {
        $timeout(function() {
            $scope.getSAML(samlData);
        }, 500);


    };

    $scope.getSAML = function(samlData) {
        // console.log(samlData);

        var config = {
            params: samlData,
            headers: { 'Accept': 'application/json' }
        };

        $http.get("process.php", config).then(function(response) {
            //console.log(response);
            $scope.samlResult = response.data;
            //$scope.authUrl = $scope.samlResult.authurl;
            //$scope.samlEndpoint = $scope.samlResult.samlEndpoint;

            // process response here..

            //console.log($scope.AuthURL);
        }, function(response) {

        });


    };
    app.directive('prettyprint', function() {
        return {
            restrict: 'C',
            link: function postLink(scope, element, attrs) {
                element.text(vkbeautify.xml(scope.dom, 4));
            }
        };
    });

});
