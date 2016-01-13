'use strict';

(function () {

var apiUrl = "https://image-search-abstraction-api-christoph-phillips.c9users.io/recent/searches"


   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var searchesObject = JSON.parse(data);
      console.log(searchesObject)
      
      searchesObject.map(function(search) {
         document.getElementById("recent").innerHTML += "<li>" + search.searchTerm + "</li>"
         
      });
      
   }));
})();
