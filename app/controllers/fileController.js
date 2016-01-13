'use strict';

(function () {
   
   
		$(document).ready(function() {
			
			var apiUrl = "https://file-metadata-microservice-christoph-phillips.c9users.io/file"

			var files;
			$('input[type=file]').on('change', function() {
				files = event.target.files;
				console.log(files)
			});
			
			$('form').on('submit', function(event) {

				event.stopPropagation();
				event.preventDefault();

				var data = new FormData();
				$.each(files, function(key, value) {
					data.append(key, value);
				});
				
				

				$.ajax({
					url: window.location.origin + '/file',
					type: 'POST',
					data: data,
					cache: false,
					processData: false,
					contentType: false,
					error: function(jqXHR, textStatus, errorThrown) {
						alert('ERRORS: ' + textStatus);
					},
					success: function(data) {
						alert('FILE SIZE: ' + data);
					}
				});
			});
		});
	
  

})();
