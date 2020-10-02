const app = new Vue({
    el: "#app",
    data:{
        members: [],
        checkedParties:["D","R","ID"],
        states:[],
        selectedState: 'all'
    },
    methods:{
        getApi: function(){
            if(document.getElementById('senate')){
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if(document.getElementById('house')){
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        getStates(){
            for(let i=0; i<this.members.length; i++){
                if(!this.states.includes(this.members[i].state)){
                    this.states.push(this.members[i].state)
                }
            }

            this.states.sort()
        },
    },
    created: function(){
        fetch(this.getApi(),{
            method: "GET",
            headers: {
               "X-API-Key":"z0o01G5xcikLE22yzEPgNVBt0CJR3kQYyOGVkWTc"
            }
        })
        .then(function(res){
            if(res.ok){
                return res.json()
            }else{
                throw new Error(res.status)
            }
        })
        .then(json =>{
            this.members = json.results[0].members
            this.getStates()
        })
        .catch(function(error){
            console.log(error)
        })
    
    },
    computed:{
        filtered: function(){
            return this.members.filter(member => this.checkedParties.includes(member.party) && (member.state == this.selectedState || this.selectedState == "all"));
        }
        
    },
})
