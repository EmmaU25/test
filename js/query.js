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
			for (var i = 0; i < 6; i++) {
				var a = $("<div onclick=\"data2('"+per.results[i].films[0]+"')\" class='col-md-4'>" + per.results[i].name + "</div>");
				$(".row").append(a);
				console.log(per.results[i].name);
			}
		}
	});
});

function data2(nom){
	alert(nom);
}
