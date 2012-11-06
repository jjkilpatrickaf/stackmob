//------------------------------------------------------------------------------
//
// Namespace definitions
//
//------------------------------------------------------------------------------

if ( spotted == undefined )
	var spotted = {};

spotted.auth = {};
spotted.geolocation = {};

//------------------------------------------------------------------------------ 
//
// Auth classes
//
//------------------------------------------------------------------------------

spotted.auth.Auth = function() {

	this.loggedIn = false;

	this.createUser = function(user){
		var createUser = new StackMob.User(user);

		createUser.create({
			success: function(model) {
				console.debug(model);
				console.log('createUser success');
				$.mobile.changePage('#login');
			},
			error: function(model, response) {
				console.debug(model);
				console.debug(response);				
			}
		});
	};

	this.login = function(user) {
		var user = new StackMob.User(user);
		user.login(false, {
			success: function(model) {
				this.loggedIn = true;
				console.log('login success');
				$.mobile.changePage('#home');
			},
			error: function(model, response){
				this.loggedIn = false;
			}
		});
	};

	this.logout = function(user) {
		var user = new StackMob.User(user);
		user.logout();
		$.mobile.changePage('#start');
	};

	this.loadFacebook = function(appId, channelUrl) {
		window.fbAsyncInit = function() {
	        FB.init({
	            appId      : appId, // App ID
	            channelUrl : channelUrl, // Channel File
				status     : true, // check login status
				cookie     : true, // enable cookies to allow the server to access the session
				xfbml      : true  // parse XFBML
			});
		};

		(function(d){
			var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = '//connect.facebook.net/en_US/all.js';
			d.getElementsByTagName('head')[0].appendChild(js);
		}(document));
	};

	this.facebookCreateUser = function(user) {
		FB.login(function(response) {
			if (response.authResponse) {
				var accessToken = response.authResponse.accessToken;

			FB.api('/me', function(response) {
			 	var user = new StackMob.User({ username: response.email });
			  	user.createUserWithFacebook(accessToken, {
			    	success: function(model) {
			      		console.debug(model);
			    	},
			    	error: function(model, response) {
			      		console.debug(model);
			      		console.debug(response);
			    	}
			  	});
			});

			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'email'});
	};

	this.facebookLinkUser = function(user) {
		FB.login(function(response) {
		  if (response.authResponse) {
		    var accessToken = response.authResponse.accessToken;

		    FB.api('/me', function(response) {
		    	console.log(response);
		      	user.linkUserWithFacebook(accessToken, {
			        success: function(model) {
			         	console.debug(model);
			        },
			        error: function(model, response) {
			         	console.debug(model);
			         	console.debug(response);
			        }
		      	});
		    });

		  } else {
		    console.log('User cancelled login or did not fully authorize.');
		  }
		}, {scope: 'email'});
	};

	this.facebookLogin = function(repsonse){
		FB.login(function(response) {
			if (response.authResponse) {
				var accessToken = response.authResponse.accessToken;
				var user = new StackMob.User();
				user.loginWithFacebookToken(accessToken, false, {
					success: function(model) {
						console.debug(model);
						$.mobile.changePage('#home');
					},
					error: function(model, response) {
						console.debug(model);
						console.debug(response);
					}
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'email'});
	};

};