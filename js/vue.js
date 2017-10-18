var per = 'https://swapi.co/api/people/1/?format=json';
var name = new Vue ({
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
var names = new Vue({
    el: '#names',
    created: function(){
        this.getPerso();
    },
    data:{
        list2:[]
    },
    methods: {
        getPerso: function(){
            this.$http.get(pers).then(function(res){
                    this.list2 = res.data.results;
            });
        }
    }
});