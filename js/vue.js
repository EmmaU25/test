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
            this.$http.get(this.next).then(function(res){
                this.list2 = res.data.results;
                this.list2.splice(6,10);
                this.next = res.data.next;
               
            });
        }
    }
});



