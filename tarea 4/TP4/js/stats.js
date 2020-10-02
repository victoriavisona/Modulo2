Vue.component('stats-table-least',{

    props: ["members", "asc", "prop1", "prop2"],

    methods: {
        getTenPercent_least(){
            let tenPct = Math.round(this.members.length / 10)

            let sorted = this.asc ? [...this.members].sort( (a,b) => a[this.prop1] - b[this.prop1]) : [...this.members].sort( (a,b) => b[this.prop1] - a[this.prop1])

            let memberAtTenPct = sorted[tenPct][this.prop1]

            return sorted.filter(e => e[this.prop1] < memberAtTenPct)

        }
    },
    /*
    template:`
            <div class="container">
                <table class="table col-12 col-md-6">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>-----</th>
                            <th>-----</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="e in getTenPercent_least()">
                            <td>{{e.first_name}}</td>
                            <td>{{e[prop1]}}</td>
                            <td>{{e[prop2]}}</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
            `*/

            template:`
            <div class="col-12 col-md-6">
                <h2>Least Loyal (Bottom 10% of party)</h2>
                <table class="table table-hover text-center table-striped table-sm">
                    <thead style="background-color: #C2EBEF">
                        <tr>
                            <th><h5 style="font-weight: bold;">Name</h5></th>
                            <th>No. of votes with party</th>
                            <th>% votes with party</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="e in getTenPercent_least()">
                            <td>{{e.first_name}} {{e.middle_name || ''}} {{e.last_name}}</td>
                            <td>{{e[prop2]}}</td>
                            <td>{{e[prop1]}} &percnt;</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
            `

})

Vue.component('stats-table-most',{
    props: ["members", "asc", "prop1", "prop2"],

    methods: {
        getTenPercent_most(){
            let tenPct = Math.round(this.members.length / 10)

            let sorted = this.asc ? [...this.members].sort( (a,b) => a[this.prop1] - b[this.prop1]) : [...this.members].sort( (a,b) => b[this.prop1] - a[this.prop1])

            let memberAtTenPct = sorted[tenPct][this.prop1]

            return sorted.filter(e => e[this.prop1] > memberAtTenPct)

        }
    },

            template:`
            <div class="col-12 col-md-6">
            <h2>Most Loyal (Top 10% of party)</h2>
                <table class="table table-hover text-center table-striped table-sm">
                    <thead style="background-color: #C2EBEF">
                        <tr>
                            <th><h5 style="font-weight: bold;">Name</h5></th>
                            <th>No. of votes with party</th>
                            <th>% votes with party</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="e in getTenPercent_most()">
                            <td>{{e.first_name}} {{e.middle_name || ''}} {{e.last_name}}</td>
                            <td>{{e[prop2]}}</td>
                            <td>{{e[prop1]}} &percnt;</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
            `

})

const app = new Vue({
    el:"#app",
    data:{
        members:[],
        stats: {
            dem: [],
            rep: [],
            ind: [],
            total: []
        }
    },

    methods:{
        getApi: function(){
            if(document.getElementById('senate')){
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if(document.getElementById('house')){
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        getPartyMembers: function(party){
            return this.members.filter(member => member.party == party)
        },
        getAverage: function(party, key){
            let sum = 0;

            party.forEach(function(partyMember){
                sum += partyMember[key]
            })

            return (sum / party.length || 0).toFixed(2)
        }
    },

    created: function(){
        fetch(this.getApi(),{
            method: "GET",
            headers: {
                "X-API-Key":"2upGoYxPxEs9pybuI7YPbyBi0X3coyMZgRZzbLYN"
            }
        }).then(function(res){
            if(res.ok){
                return res.json()
            }else{
                throw new Error(res.status)
            }
        })
        .then(json =>{
            this.members = json.results[0].members
            this.stats.dem = this.getPartyMembers("D")
            this.stats.rep = this.getPartyMembers("R")
            this.stats.ind = this.getPartyMembers("ID")
            this.stats.total = this.members

        })
        .catch(function(error){
            console.log(error)
        })

    }
     
})
