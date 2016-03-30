"use strict";angular.module("webApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap","angular-jwt"]).config(["$routeProvider","$locationProvider",function(a,b){a.otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("webApp").controller("ContactCtrl",["$scope",function(a){a.dropdownElements=[{reason:"Problème technique"},{reason:"Don"},{reason:"Commentaire"},{reason:"Entreprise"}],a.showContactForm=!0,a.submit=function(){a.isFormValid()?a.showContactForm=!1:(a.contactForm.username.$touched=!0,a.contactForm.reason.$touched=!0,a.contactForm.email.$touched=!0,a.contactForm.message.$touched=!0)},a.isFormValid=function(){return a.contactForm.$valid}}]),angular.module("webApp").config(["$routeProvider",function(a){a.when("/contact",{templateUrl:"app/contact/contact.html",controller:"ContactCtrl"})}]);var myApp=angular.module("webApp");myApp.controller("favoritesController",["$scope","$http","FavoritesService",function(a,b,c){a.datas=[],a.showServerError=!1,a.showUnauthorizedError=!1,a.getFilms=function(){c.getAll().query({},function(c){a.datas=[];for(var d=0;d<c.length;d++)1==c[d].status?c[d].status=!0:c[d].status=!1,b.get("https://omdbapi.com/",{params:{i:c[d].movie_id},timeout:5e3}).then(function(b){return function(c){c.data.apiId=b.id,c.data.isFavorite=!0,c.data.isSelected=b.status,a.datas.push(c.data)}}(c[d]));a.showServerError=!1,a.showUnauthorizedError=!1},function(b){a.datas=[],401==b.data.error.code?a.showUnauthorizedError=!0:a.showServerError=!0})},a.addFavorite=function(b){c.change()["delete"]({id:a.datas[b].apiId}),a.datas.splice(b,1)},a.addSelected=function(b){a.datas[b].isSelected?c.change().update({id:a.datas[b].apiId,movie_id:a.datas[b].imdbID,status:1}):c.change().update({id:a.datas[b].apiId,movie_id:a.datas[b].imdbID,status:0})},a.getFilms()}]),angular.module("webApp").config(["$routeProvider",function(a){a.when("/favorites",{templateUrl:"app/favorites/favorites.html",controller:"favoritesController"})}]);var myApp=angular.module("webApp");myApp.controller("inscriptionController",["$scope","RegisterPost",function(a,b){a.showForm=!0,a.serverError=!1,a.answer={},a.isValid=function(){return a.inscriptionForm.$valid},a.submit=function(){a.isValid()?b.save({email:a.emailM,password:a.passwordM,firstname:a.firstName,lastname:a.nameM},function(b){a.answer=b,a.serverError=!1,a.showForm=!1},function(b){a.answer=b,a.serverError=!0}):(a.inscriptionForm.firstnameInput.$touched=!0,a.inscriptionForm.nameInput.$touched=!0,a.inscriptionForm.emailInput.$touched=!0,a.inscriptionForm.passwordInput.$touched=!0,a.inscriptionForm.confirmPasswordInput.$touched=!0)}}]),myApp.directive("confirmPassword",function(){return{require:"ngModel",scope:{otherModelValue:"=confirmPassword"},link:function(a,b,c,d){d.$validators.confirmPassword=function(b){return b==a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}}),angular.module("webApp").config(["$routeProvider",function(a){a.when("/inscription",{templateUrl:"app/inscription/inscription.html",controller:"inscriptionController"})}]);var myApp=angular.module("webApp");myApp.service("RegisterPost",["$resource",function(a){var b="https://crispesh.herokuapp.com/api";return a(b+"/register/:id",{id:"@id"})}]);var myApp=angular.module("webApp");myApp.controller("loginController",["$scope","LoginPost","$rootScope","$cookies","ConnectionService",function(a,b,c,d,e){a.showForm=!0,a.userConnected=e.getUser().userConnected,a.serverError=!1,a.valid=function(){return a.loginForm.$valid},a.submit=function(){a.valid()?b.save({username:a.emailM,password:a.passwordM},function(b){a.showForm=!1,a.serverError=!1,e.setUser({userJwt:b.token,userEmail:b.data.username,userConnected:!0})},function(b){a.serverError=!0}):(a.loginForm.emailInput.$touched=!0,a.loginForm.passwordInput.$touched=!0)},a.disconnect=function(){a.showForm=!0,e.clearUser(),a.userConnected=e.getUser().userConnected}}]),angular.module("webApp").config(["$routeProvider",function(a){a.when("/login",{templateUrl:"app/login/login.html",controller:"loginController"})}]);var myApp=angular.module("webApp");myApp.service("LoginPost",["$resource",function(a){var b="https://crispesh.herokuapp.com/api";return a(b+"/login_check/:id",{id:"@id"})}]),angular.module("webApp").controller("mainCtrl",function(){}),angular.module("webApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"app/main/main.html",controller:"mainCtrl"})}]);var myApp=angular.module("webApp");myApp.controller("newMoviesController",["$scope","$http",function(a,b){a.showMovies=!1,a.showServerError=!1,a.datas=[],a.getFilms=function(){b.get("https://omdbapi.com/",{params:{s:"the",y:2016,type:"movie"},timeout:5e3}).then(function(b){return"False"==b.data.Response?(a.showMovies=!1,void(a.showServerError=!0)):(a.showMovies=!0,a.showServerError=!1,void(a.datas=b.data.Search))},function(){a.showMovies=!1,a.showServerError=!0})},a.getFilms()}]),angular.module("webApp").config(["$routeProvider",function(a){a.when("/newMovies",{templateUrl:"app/newMovies/newMovies.html",controller:"newMoviesController"})}]);var myApp=angular.module("webApp");myApp.controller("searchController",["$scope","$http","FavoritesService",function(a,b,c){a.showMovies=!1,a.showEmptyError=!1,a.showServerError=!1,a.showNoResultError=!1,a.totalResults=0,a.datas=[],a.fillSelected=function(){c.getAll().query({},function(b){for(var c in b)for(var d in a.datas)b[c].movie_id==a.datas[d].imdbID&&(a.datas[d].isFavorite=!0,a.datas[d].apiId=b[c].id,1==b[c].status?a.datas[d].isSelected=!0:a.datas[d].isSelected=!1)},function(b){a.showServerError=!0,a.showMovies=!1,a.showNoResultError=!1,a.datas=[]})},a.submit=function(){return void 0===a.searchM&&(a.searchM=""),a.searchM.length<2?(a.showEmptyError=!0,a.showServerError=!1,a.showMovies=!1,void(a.showNoResultError=!1)):(a.showEmptyError=!1,void b.get("https://omdbapi.com/",{params:{s:a.searchM,type:"movie"},timeout:5e3}).then(function(b){return"False"==b.data.Response?(a.showServerError=!1,a.showMovies=!1,void(a.showNoResultError=!0)):(a.showServerError=!1,a.showMovies=!0,a.showNoResultError=!1,a.totalResults=b.data.totalResults,a.datas=b.data.Search,void a.fillSelected())},function(){a.showServerError=!0,a.showMovies=!1,a.showNoResultError=!1,a.datas=[]}))},a.addFavorite=function(b){a.datas[b].isFavorite?c.createNew().save({movie_id:a.datas[b].imdbID},function(d){a.datas[b].apiId=d.id,c.change().update({id:a.datas[b].apiId,movie_id:a.datas[b].imdbID,status:0})}):c.change()["delete"]({id:a.datas[b].apiId}),a.datas[b].selected=!1},a.addSelected=function(b){console.log(a.datas[b]),a.datas[b].isSelected?c.change().update({id:a.datas[b].apiId,movie_id:a.datas[b].imdbID,status:1}):c.change().update({id:a.datas[b].apiId,movie_id:a.datas[b].imdbID,status:0})}}]),angular.module("webApp").config(["$routeProvider",function(a){a.when("/search",{templateUrl:"app/search/search.html",controller:"searchController"})}]);var myApp=angular.module("webApp");myApp.factory("ConnectionService",["$rootScope",function(a){var b=function(){var b={userEmail:"Connexion",userConnected:!1};void 0===a.globals&&(a.globals={}),a.globals.user=b,localStorage.setItem("globals.user",JSON.stringify(b))};return{setUser:function(b){void 0===a.globals&&(a.globals={}),a.globals.user=b,localStorage.setItem("globals.user",JSON.stringify(b)),a.$broadcast("updateUser")},getUser:function(){return void 0===a.globals?(a.globals={},a.globals.user=JSON.parse(localStorage.getItem("globals.user"))):void 0===a.globals.user&&(a.globals.user=JSON.parse(localStorage.getItem("globals.user"))),null==a.globals.user&&b(),a.globals.user},clearUser:function(){b(),a.$broadcast("updateUser")}}}]);var myApp=angular.module("webApp");myApp.service("FavoritesService",["$resource",function(a){var b="https://crispesh.herokuapp.com/api";return{getAll:function(){return a(b+"/favs/me")},createNew:function(){return a(b+"/favs/",{movie_id:"@movie_id"})},change:function(){return a(b+"/favs/:id",{id:"@id",movie_id:"@movie_id",status:"@status"},{update:{method:"PUT"}})}}}]);var myApp=angular.module("webApp");myApp.directive("focusMe",["$timeout",function(a){return{scope:{trigger:"@focusMe"},link:function(b,c){b.$watch("trigger",function(b){"true"===b&&a(function(){c[0].focus()})})}}}]),angular.module("webApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("webApp").controller("NavbarCtrl",["$scope","$location","$cookies","$rootScope","ConnectionService",function(a,b,c,d,e){a.$on("updateUser",function(b){a.updateMenu()}),a.updateMenu=function(){a.menu=[{title:"Accueil",link:"/"},{title:"Nouveautés",link:"/newMovies"},{title:"Recherche",link:"/search"}],e.getUser().userConnected&&a.menu.push({title:"Favoris",link:"/favorites"}),a.menu.push({title:"Inscription",link:"/inscription"},{title:"Contact",link:"/contact"},{title:e.getUser().userEmail,link:"/login"})},a.updateMenu(),a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("webApp").run(["$templateCache",function(a){a.put("app/contact/contact.html",'<link rel=stylesheet href=contact.css><div ng-controller=ContactCtrl><div class=jumbotron><h1>Contact</h1></div><div class=container><form novalidate class=form-horizontal name=contactForm ng-show=showContactForm><div class=form-group><label class="control-label col-xs-3">Nom de l\'utilisateur</label><div class=col-xs-4><input class=form-control name=username placeholder="Nom d\'utilisateur" ng-model=username required ng-pattern="/[a-zA-Z -]+/" focus-me="true"> <span ng-show="contactForm.username.$error.pattern && !contactForm.username.$error.required" style=color:red>Le nom d\'utilisateur est non-valide.</span> <span ng-show="contactForm.username.$touched && contactForm.username.$error.required" style=color:red>Le nom d\'utilisateur est requis.</span></div></div><div class=form-group><label class="control-label col-xs-3">Raison du contact</label><div class=col-xs-4><select class=form-control title=Choisir... name=reason required ng-model=reason><option ng-repeat="element in dropdownElements"><div>{{element.reason}}</div></option></select><span ng-show="contactForm.reason.$touched && contactForm.reason.$error.required" style=color:red>La raison est requise.</span></div></div><div class=form-group><label class="col-xs-3 control-label">Email</label><div class=col-sm-6><input class=form-control type=email name=email placeholder=Email required ng-model=email> <span ng-show="contactForm.email.$touched && contactForm.email.$error.required" style=color:red>Le email est requis.</span> <span ng-show="contactForm.email.$touched && contactForm.email.$error.email" style=color:red>Le email est non-valide.</span></div></div><div class=form-group><label class="col-xs-3 control-label">Message</label><div class=col-sm-9><textarea class=form-control name=message rows=5 placeholder="Votre message..." required ng-model=message></textarea><span ng-show="contactForm.message.$touched && contactForm.message.$error.required" style=color:red>Le message est requis.</span></div></div><div class=form-group><div class="col-xs-offset-3 col-xs-10"><button id=idSubmitButton class="btn btn-primary" type=submit name=button ng-click=submit()>Envoyer</button></div></div></form></div><br><div class=form-horizontal ng-show=!showContactForm><div id=confirmationId class=form-group><label class="control-label col-xs-3">Nom d\'utilisateur</label><div class=col-xs-9>{{username}}</div></div><div class=form-group><label class="control-label col-xs-3">Raison</label><div class=col-xs-9>{{reason}}</div></div><div class=form-group><label class="control-label col-xs-3">Email</label><div class=col-xs-9>{{email}}</div></div><div class=form-group><label class="control-label col-xs-3">Message</label><p class=col-xs-9>{{message}}</p></div></div></div>'),a.put("app/favorites/favorites.html",'<link rel=stylesheet href=favorites.css><div ng-controller=favoritesController><div class=jumbotron><h1>Films de l\'année 2016</h1></div><span id=serverErrorId ng-show=showServerError style=color:red>Une erreur est survenue pendant l\'appel du serveur. <a onclick="location.reload(true); return false"><button>Actualiser</button></a></span> <span id=unauthorizedErrorId ng-show=showUnauthorizedError style=color:red>Vous n\'êtes pas autorisé à visiter cette page.</span><div ng-show="datas!=[]"><h2 style=text-align:center>Nombre de films : {{datas.length}}</h2><ng-include src="\'components/favorites/favorites.tiles.html\'"></ng-include></div></div><br><br><br>'),a.put("app/inscription/inscription.html",'<link rel=stylesheet href=inscription.css><div ng-controller=inscriptionController><div class=jumbotron><h1>Inscription</h1></div><div id=serverErrorId ng-show=serverError style=color:red>Une erreur serveur est survenue<br><div ng-repeat="data in answer.data.errors">{{data.property_path}}: {{data.message}}<br></div></div><div class=container><form novalidate class=form-horizontal name=inscriptionForm ng-show=showForm><div class=form-group ng-class=control-group><label class="control-label col-xs-3">Prénom</label><div class=col-xs-6><input class=form-control name=firstnameInput ng-model=firstName required ng-pattern="/^[A-Za-z -]{3,}$/" focus-me="true"> <span ng-show="inscriptionForm.firstnameInput.$touched && inscriptionForm.firstnameInput.$error.required" style=color:red>Requis</span> <span ng-show="inscriptionForm.firstnameInput.$touched && !inscriptionForm.firstnameInput.$error.required && inscriptionForm.firstnameInput.$viewValue.length<3" style=color:red>Trois charactères et plus.</span> <span ng-show="inscriptionForm.firstnameInput.$touched && !inscriptionForm.firstnameInput.$error.required && inscriptionForm.firstnameInput.$error.pattern && inscriptionForm.firstnameInput.$viewValue.length>=3" style=color:red>Le prénom doit être valide.</span></div></div><div class=form-group><label class="control-label col-xs-3">Nom</label><div class=col-xs-6><input class=form-control name=nameInput ng-model=nameM required ng-pattern="/^[A-Za-z -]{3,}$/"> <span ng-show="inscriptionForm.nameInput.$touched && inscriptionForm.nameInput.$error.required" style=color:red>Requis</span> <span ng-show="inscriptionForm.nameInput.$touched && !inscriptionForm.nameInput.$error.required && inscriptionForm.nameInput.$viewValue.length<3" style=color:red>Trois charactères et plus.</span> <span ng-show="inscriptionForm.nameInput.$touched && !inscriptionForm.nameInput.$error.required && inscriptionForm.nameInput.$error.pattern && inscriptionForm.nameInput.$viewValue.length>=3" style=color:red>Le nom doit être valide.</span></div></div><div class=form-group><label class="control-label col-xs-3">Addresse courriel</label><div class=col-xs-6><input class=form-control type=email name=emailInput ng-model=emailM required> <span ng-show="inscriptionForm.emailInput.$touched && inscriptionForm.emailInput.$error.required" style=color:red>Requis</span> <span ng-show="inscriptionForm.emailInput.$touched && inscriptionForm.emailInput.$error.email" style=color:red>L\'addresse couriel doit être valide.</span></div></div><div class=form-group><label class="control-label col-xs-3">Mot de passe</label><div class=col-xs-6><input class=form-control name=passwordInput ng-model=passwordM type=password ng-pattern="/.{3,}/" required> <span ng-show="inscriptionForm.passwordInput.$touched && inscriptionForm.passwordInput.$error.required" style=color:red>Requis</span> <span ng-show="inscriptionForm.passwordInput.$touched && inscriptionForm.passwordInput.$error.pattern" style=color:red>Trois charactères et plus</span></div></div><div class=form-group><label class="control-label col-xs-3">Confirmation du mot de passe</label><div class=col-xs-6><input class=form-control name=confirmPasswordInput ng-model=confirmPasswordM type=password required confirm-password="passwordM"> <span ng-show="inscriptionForm.confirmPasswordInput.$touched && inscriptionForm.confirmPasswordInput.$error.required" style=color:red>Requis</span> <span ng-show="inscriptionForm.confirmPasswordInput.$touched && !inscriptionForm.confirmPasswordInput.$error.required && inscriptionForm.confirmPasswordInput.$error.confirmPassword" style=color:red>Le mot de passe n\'est pas semblable.</span> <span ng-show="inscriptionForm.confirmPasswordInput.$touched && !inscriptionForm.confirmPasswordInput.$error.required && !inscriptionForm.confirmPasswordInput.$error.confirmPassword" style=color:green>Confirmé</span></div></div><div class=form-group><div class="col-xs-offset-3 col-xs-10"><button id=idSubmitButton class="btn btn-primary" type=submit ng-click=submit()>Confirmer</button></div></div></form></div><br><br><div ng-show=!showForm><h4>Nom :</h4><p id=confirmationId>{{firstName}} {{nameM}}</p><h4>Addresse couriel :</h4><p>{{emailM}}</p><h4>Le mot de passe fait {{passwordM.length}} charactères</h4><p>Merci de participer au Grand Projet!</p><br></div></div>'),a.put("app/login/login.html",'<link rel=stylesheet href=inscription.css><div ng-controller=loginController><div class=jumbotron><h1>Login</h1></div><div ng-show=!userConnected><div id=serverErrorId ng-show=serverError style=color:red>Courriel ou mot de passe invalide</div><div class=container><form novalidate class=form-horizontal name=loginForm ng-show=showForm><div class=form-group ng-class=control-group><label class="control-label col-xs-3">Courriel</label><div class=col-xs-6><input class=form-control type=email name=emailInput ng-model=emailM required focus-me=true> <span id=emailError1Id ng-show="loginForm.emailInput.$touched && loginForm.emailInput.$error.required" style=color:red>Requis</span> <span id=emailError2Id ng-show="loginForm.emailInput.$touched && loginForm.emailInput.$error.email" style=color:red>L\'addresse couriel doit être valide.</span></div></div><div class=form-group><label class="control-label col-xs-3">Mot de passe</label><div class=col-xs-6><input class=form-control name=passwordInput ng-model=passwordM type=password ng-pattern="/.{3,}/" required> <span id=passwordError1Id ng-show="loginForm.passwordInput.$touched && loginForm.passwordInput.$error.required" style=color:red>Requis</span> <span id=passwordError2Id ng-show="loginForm.passwordInput.$touched && loginForm.passwordInput.$error.pattern" style=color:red>Trois charactères et plus</span></div></div><div class=form-group><div class="col-xs-offset-3 col-xs-10"><button id=idSubmitButton class="btn btn-primary" type=submit ng-click=submit()>Confirmer</button></div></div><br><br></form></div><div ng-show=!showForm><h4 id=confirmationId>Connexion réussit</h4><p>Merci de participer au Grand Projet!</p><br><br></div></div><div ng-show=userConnected><center><p>Vous êtes déjà connecté</p><input id=idDisconnectButton class="btn btn-default" type=button value=Déconnexion ng-click="disconnect()"></center><br><br><br></div></div>'),a.put("app/main/main.html","<link rel=stylesheet href=main.css><div ng-controller=mainCtrl><div class=jumbotron><h1 class=text-uppercase>Hello World !</h1></div><div><h3 style=text-align:center>Bienvenue sur le TP1 du cours d'Application Web !</h3><br><p class=lead>Ce projet présente différentes fonctionalités demandées dans le cadre du cours de Programmation d'application Web :</p><div class=list-group><a ng-href=/newMovies class=list-group-item>Les nouveaux films de 2016</a> <a ng-href=/search class=list-group-item>Un moteur de recherche de films avec OMDB API</a> <a ng-href=/inscription class=list-group-item>La possibilité de s'incrire</a> <a ng-href=/contact class=list-group-item>Un formulaire de contact pour communiquer avec les membres de l'équipe de développement</a></div></div></div><br>"),a.put("app/newMovies/newMovies.html",'<link rel=stylesheet href=newMovies.css><div ng-controller=newMoviesController><span id=serverErrorId ng-show=showServerError style=color:red>Une erreur est survenue pendant l\'appel du serveur. <a onclick="location.reload(true); return false"><button>Actualiser</button></a></span><div ng-show=showMovies><div class=jumbotron><h1>Films de l\'année 2016</h1></div><div class=row><center><div class=col-xs-6 ng-repeat="data in datas | limitTo:6"><div><div class="tile blue"><span ng-if="data.Poster!=\'N/A\'"><img ng-src="{{data.Poster}}"></span> <span ng-show="data.Poster==\'N/A\'"><img ng-src="movie-placeholder.jpg"></span><h3>{{data.Title}}</h3></div></div></div></center></div></div></div>'),a.put("app/search/search.html",'<link rel=stylesheet href=search.css><div ng-controller=searchController><div class=jumbotron><h1>Rechercher un film</h1></div><form class=form-horizontal><div class=form-group><div class="col-xs-6 col-xs-offset-3 input-group"><input class=form-control ng-model=searchM placeholder="Entrer un titre..." focus-me="true"><div class=input-group-btn><button id=submitButtonId class="btn btn-default" type=submit ng-click=submit()><span class="glyphicon glyphicon-search"></span></button></div></div><span class="col-xs-9 col-xs-offset-3" id=emptyErrorId ng-show=showEmptyError style=color:red>Vous devez entrer au moins deux lettre.</span></div></form><br><br><span id=serverErrorId ng-show=showServerError style=color:red>Une erreur est survenue pendant l\'appel du serveur.</span> <span id=noResultErrorId ng-show=showNoResultError style=color:red>Aucun résultat pour la requête spécifiée.</span><div ng-show=showMovies><h2 style=text-align:center>Nombre de films : {{totalResults}}</h2><ng-include src="\'components/favorites/favorites.tiles.html\'"></ng-include></div></div>'),a.put("components/favorites/favorites.tiles.html",'<center><div class=col-xs-6 ng-repeat="data in datas"><div class="tile blue"><h3>{{data.Title}}<span ng-if="data.Poster!=\'N/A\'"><img ng-src="{{data.Poster}}"></span> <span ng-show="data.Poster==\'N/A\'"><img ng-src="movie-placeholder.jpg"></span><p>{{data.Year}}</p><input type=checkbox ng-model=data.isFavorite ng-click=addFavorite($index)>Favoris<br><span ng-show=data.isFavorite><input type=checkbox ng-model=data.isSelected ng-click=addSelected($index)>Visionné</span></h3></div></div></center>'),a.put("components/footer/footer.html","<footer class=footer><div class=container>Xavier-Charles Lebel / Benoît Levesque / 2016</div></footer>"),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>TP1 Web</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);