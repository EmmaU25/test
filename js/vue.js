var per = 'https://swapi.co/api/people/1/?format=json';
new Vue ({
    el:'#name',
    created: function(){
        this.getPer();
    },
    data:{
        list:[]
    },
    methods: {
        getPer: function(){
            this.$http.get(per).then(function(res){
                this.list = res.data;
                console.log("Name dans la console: "+res.data.name);
            });
        }
    }
});


var pers = 'https://swapi.co/api/people/?format=json';
new Vue({
    el: '#names',
    created: function(){
        this.getPerso();
    },
    data:{
        list2:[],
        next : ''
    },
    methods: {
        getPerso: function(){
            this.$http.get(pers).then(function(res){
                    this.list2 = res.data.results;
                    this.list2.splice(6,10);
                    this.next = res.data.next;
            });
        },
        nexte:function(event){
            if (this.next== null) {
                alert("Il n y a plus personages");
            }else{
                this.$http.get(this.next).then(function(res){
                    this.list2 = res.data.results;
                    this.list2.splice(6,10);
                    this.next = res.data.next;
                   
                });
            }
            
        },
        details:function(key){  
            $(".modal-body > div").remove();
            $(".modal-title > p").remove();
            $(".modal-title").append("<p>Description de "+ this.list2[key].name+"</p>");
            $(".modal-body").append("<div class='alert alert-primary'><p>Poid: "+ this.list2[key].height+" </p></div>");
            $(".modal-body").append("<div class='alert alert-secondary'><p>Anniversaire: "+ this.list2[key].birth_year+"</p></div>");
            $(".modal-body").append("<div class='alert alert-success'><p>Masse: "+ this.list2[key].mass+"</p></div>");
            $(".modal-body").append("<div class='alert alert-danger'><p>Genre: "+ this.list2[key].gender+"</p></div>");
            $(".modal-body").append("<div class='alert alert-info films'>Films Realisés</div>");
            for (var index = 0; index < this.list2[key].films.length; index++) {
                this.$http.get(this.list2[key].films[index]).then(function(res){
                   $(".films").append("<p>"+res.data.title+"</p>");
                });
            }
        }
    }
});



