$(document).ready(function(){
	$.ajax({
		url: 'https://swapi.co/api/people/1/?format=json',
		type:'GET',
		dataType: 'JSON',
		success: function(json){
			console.log(json.name);
			$("h2.name").text(json.name);
		}
	});


	$.ajax({
		url: 'https://swapi.co/api/people/?format=json',
		type:'GET',
		dataType: 'JSON',
		success: function(per){
			for (var i = 0; i < per.results.length; i++) {
				console.log(per.results[i].name);
			}
		}
	});



});