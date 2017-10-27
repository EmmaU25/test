$(document).ready(function(){
	$.ajax({
		url: 'https://swapi.co/api/people/1/?format=json',
		type:'GET',
		dataType: 'JSON',
		success: function(json){
			console.log("Nom depuis la console: "+json.name);
			$("h2.name").text(json.name);
		}
	});

	$(".row").append("<div class='col-md-12 text-center'><img src='images/load.gif' class='img-fluid'></img></p>");
	$('.btnNext').hide();

	const ITERACIONES_1=6;
	let helper = {
			  film:': ',
			  counter:0,
			  flag: 0,
			  film:0,
			  method: function (per,res,num) {
					this.counter++;
				if(num == 1){
					this.film += res.title+", ";
					if (this.counter == (3)) {
						$(".row").empty();
						for (var index = 0; index < ITERACIONES_1; index++) {
							var a = $("<div data-toggle='modal' data-target='#myModal'" + 
							"onclick=\"data2('"+per.results[index].name+"','"+per.results[index].height+
							"','"+per.results[index].birth_year+"','"+per.results[index].mass+"','"+per.results[index].gender+
							"','"+this.film+"')\" class='col-md-4 text-center'><img src='images/st1.png' class='img-fluid'></img><p class=' text-center lead'>" +
							  	per.results[index].name + "</p></div>");
							  $(".row").append(a);
							  //console.log(per.results[index].name);
						}
					 	this.film =': '; 
						$(".btnNext").attr("id", per.next);
						$(".btnNext").show();  
					}
				}else{
					this.flag++;
					while(this.film < 1){
						this.film += res.title+", ";
						this.film++;
					}
					if (this.flag == 3){
					$(".row").empty();
					for (var index = 0; index < ITERACIONES_1; index++) {
						var a = $("<div data-toggle='modal' data-target='#myModal'" + 
						"onclick=\"data2('"+per.results[index].name+"','"+per.results[index].height+
						"','"+per.results[index].birth_year+"','"+per.results[index].mass+"','"+per.results[index].gender+
						"','"+this.film+"')\" class='col-md-4 text-center'><img src='images/st1.png' class='img-fluid'></img><p class=' text-center lead'>" +
					  	per.results[index].name + "</p></div>");
						$(".row").append(a);
					  //console.log(per.results[index].name);
					  }
					$(".btnNext").attr("id", per.next);
					$(".btnNext").show();
					this.flag=0;
				}
			}	
		}
	};
	
	$.ajax({
			url: 'https://swapi.co/api/people/?format=json',
			type:'GET',
			dataType: 'JSON',
			crossDomain: true,
			success: function(per){
				var film;
				for (var i = 0; i < ITERACIONES_1; i++) {
					for (var index = 0; index < per.results[i].films.length; index++) {
						var ul = per.results[i].films[index];
						$.ajax({
							url:ul,
							type: 'GET',
							dataType: 'JSON',
						success:function(res){
								helper.method(per,res,1);	
							}
						}); 
					} 
				}
			}
		});

		$(".btnNext").click(function(){
		var res = $(".btnNext").attr("id")
			if (res == null) {
				alert("Il n y plus personages");
			}else{
				$.ajax({
				url: res,
				type:'GET',
				dataType: 'JSON',
				crossDomain: true,
					success: function(per){
						var film;
						for (var i = 0; i < ITERACIONES_1; i++) { 
							for (var index = 0; index < per.results[i].films.length; index++) {
								var ul = per.results[i].films[index];
								$.ajax({
									url:ul,
									type: 'GET',
									dataType: 'JSON',
									crossDomain: true,
								success:function(res){
										helper.method(per,res,2);
									}
								}); 
							} 
						}
					}
				});
			}
	});
});

function data2(nom,poid,anni,mass,genre,film){
	//alert(nom);
	$(".modal-body > div").remove();
	$(".modal-title > p").remove();
	$(".modal-title").append("<p>Description de "+nom+"</p>");
	$(".modal-body").append("<div class='alert alert-primary'><p>Poid: "+poid+"</p></div>");
	$(".modal-body").append("<div class='alert alert-secondary'><p>Anniversaire: "+anni+"</p></div>");
	$(".modal-body").append("<div class='alert alert-success'><p>Masse: "+mass+"</p></div>");
	$(".modal-body").append("<div class='alert alert-danger'><p>Genre: "+genre+"</p></div>");
	$(".modal-body").append("<div class='alert alert-info'><p>Films Realisés "+film+"</p></div>");	
}