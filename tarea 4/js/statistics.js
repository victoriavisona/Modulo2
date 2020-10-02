
Vue.component('stats-table-least',{
    props: ['members', 'asc', 'prop1', 'prop2'],
    computed: {
        getTenPercent_least(){
            console.log(this.member)
            
            let tenPct = Math.round(this.members.length / 10)

            let sorted = this.asc ? [...this.members].sort( (a,b) => a[this.prop1] - b[this.prop1]) : [...this.members].sort( (a,b) => b[this.prop1] - a[this.prop1])

            let memberAtTenPct = sorted[tenPct][this.prop1]

            return sorted.filter(e => e[this.prop1] < memberAtTenPct)

        },
    },
    template:`
                <div class="col-6">
                    <h2>Least Loyal (Bottom 10% Attendance)</h2>
                    <table class= "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>No. Party Votes</th>
                                <th>% Party Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in getTenPercent_least">
                                <td>{{e.first_name}} {{e.middle_name || ''}} {{e.last_name}}</td>
                                <td>{{e[prop2]}}</td>
                                <td>{{e[prop1]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             `
})
Vue.component('stats-table-most',{
    props: ['members', 'asc', 'prop1', 'prop2'],
    computed: {
        getTenPercent_most(){
            let tenPct = Math.round(this.members.length / 10)

            let sorted = this.asc ? [...this.members].sort( (a,b) => a[this.prop1] - b[this.prop1]) : [...this.members].sort( (a,b) => b[this.prop1] - a[this.prop1])

            let memberAtTenPct = sorted[tenPct][this.prop1]

            return sorted.filter(e => e[this.prop1] > memberAtTenPct)

        }
    },
    template:`
                <div class="col-6">
                    <h2>Most Loyal (Top 10% Attendance)</h2>
                    <table class= "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>No. Party Votes</th>
                                <th>% Party Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in getTenPercent_most">
                                <td>{{e.first_name}} {{e.middle_name || ''}} {{e.last_name}}</td>
                                <td>{{e[prop2]}}</td>
                                <td>{{e[prop1]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             `
})
const app = new Vue({
    el: "#app",
    data:{
        members: [],
        stats: {
            dem:[],
            rep:[],
            ind:[],
            total:[],
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
            this.stats.dem = this.getPartyMembers("D")
            this.stats.rep = this.getPartyMembers("R")
            this.stats.ind = this.getPartyMembers("ID")
            this.stats.total = this.members
        })
        .catch(function(error){
            console.log(error)
        })
    
    },

})