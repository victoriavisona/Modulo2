
let members = data.results[0].members;


let statistics = {
    democrats:getPartyMembers("D"),
    republicans:getPartyMembers("R"),
    independents:getPartyMembers("ID"),
    avgPartyVotesRepublicans: 0,
    avgPartyVotesDemocrats: 0,
    avgPartyVotesIndependants: 0,
    leastLoyal: [],
    mostLoyal: [],
    leastEngaged: [],
    mostEngaged: [],
    total:members,
}


function getPartyMembers(party){
    return members.filter(member => member.party == party);
}

let sum = 0;

statistics.democrats.forEach(function(member){
    sum += member.missed_votes_pct; 
})

let missed_votes_dem = sum / statistics.democrats.length;


let sum2 = 0;

statistics.democrats.forEach(function(member){
    sum2 += member.votes_with_; 
})

let votes_party_dem = sum / statistics.democrats.length;

function averagePartyVotes(party, key){
    let sum = 0;
    party.forEach(function(partyMember){
        sum += partyMember[key];
    })
    return (sum / party.length).toFixed(2);
}

function createAtGlanceTable(){
    let tbody = document.querySelector('#at-glance tbody');
    if(document.getElementById('loyalty')){
        
        tbody.innerHTML += `<tr>
                                <td>Democrats</td>
                                <td>${statistics.democrats.length}</td>
                                <td>${averagePartyVotes(statistics.democrats, "votes_with_party_pct")}</td>
                            </tr>`
        tbody.innerHTML += `<tr>
                                <td>Republicans</td>
                                <td>${statistics.republicans.length}</td>
                                <td>${averagePartyVotes(statistics.republicans, "votes_with_party_pct")}</td>
                            </tr>`
        tbody.innerHTML += `<tr>
                                <td>Independans</td>
                                <td>${statistics.independents.length}</td>
                                <td>${averagePartyVotes(statistics.independents, "votes_with_party_pct")}</td>
                            </tr>`
        tbody.innerHTML += `<tr>
                                <td>Total</td>
                                <td>${statistics.total.length}</td>
                                <td>${averagePartyVotes(statistics.total, "votes_with_party_pct")}</td>
                            </tr>`
    
    }else if(document.getElementById('attendance')){
        tbody.innerHTML += `<tr>
                                <td>Democrats</td>
                                <td>${statistics.democrats.length}</td>
                                <td>${averagePartyVotes(statistics.democrats, "missed_votes_pct")}</td>
                            </tr>`
        tbody.innerHTML += `<tr>
                                <td>Republicans</td>
                                <td>${statistics.republicans.length}</td>
                                <td>${averagePartyVotes(statistics.republicans, "missed_votes_pct")}</td>
                            </tr>`
        tbody.innerHTML += `<tr>
                                <td>Independans</td>
                                <td>${statistics.independents.length}</td>
                                <td>${averagePartyVotes(statistics.independents, "missed_votes_pct")}</td>
                            </tr>`
        tbody.innerHTML +=  `<tr>
                                <td>Total</td>
                                <td>${statistics.total.length}</td>
                                <td>${averagePartyVotes(statistics.total, "missed_votes_pct")}</td>
                            </tr>`
    }
    
}
createAtGlanceTable();

function calculateStatistics(){

    let sorted = [...members];
    sorted.sort((memberA, memberB) => { return memberA.votes_with_party_pct - memberB.votes_with_party_pct });

    let tenPorcent = Math.round(members.length / 10);

    let votesAtLowestTenPct = sorted[tenPorcent].votes_with_party_pct;
    let votesAtHighestTenPct = sorted[sorted.length - tenPorcent - 1].votes_with_party_pct;

    statistics.leastLoyal = sorted.filter(member => member.votes_with_party_pct <= votesAtLowestTenPct);
    statistics.mostLoyal = sorted.filter(member => member.votes_with_party_pct >= votesAtHighestTenPct);

    sorted.sort((memberA, memberB) => { return memberB.missed_votes_pct - memberA.missed_votes_pct });

    let missedVotesAtLowestTenPorcent = sorted[tenPorcent].missed_votes_pct;
    let missedVotesAtHighestTenPorcent = sorted[sorted.length - tenPorcent -1].missed_votes_pct;

    statistics.leastEngaged = sorted.filter(member => member.missed_votes_pct >= missedVotesAtLowestTenPorcent);
    statistics.mostEngaged = sorted.filter(member => member.missed_votes_pct <= missedVotesAtHighestTenPorcent);
}

function createRows(array, mostOrLeast){

    let table = document.getElementById(mostOrLeast);
    let tbody = document.createElement("tbody");

    for(let i=0; i<array.length; i++){

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name;
        tr.appendChild(td1);
    
        let td2 = document.createElement("td");
        if(document.getElementById('loyalty')){
            
            td2.innerText = Math.round(array[i].total_votes * array[i].votes_with_party_pct / 100);

        }else if(document.getElementById('attendance')){

            td2.innerText = array[i].missed_votes;
            
        }
        tr.appendChild(td2);
    
        let td3 = document.createElement("td");
        if(document.getElementById('loyalty')){
            
            td3.innerText = Math.round(array[i].votes_with_party_pct);

        }else if(document.getElementById('attendance')){

            td3.innerText = array[i].missed_votes_pct;
            
        }
        tr.appendChild(td3);
    
        tbody.appendChild(tr);

    }
   
    table.appendChild(tbody);
    

}

calculateStatistics();

if(document.getElementById('loyalty')){
    createRows(statistics.leastLoyal, "least");
    createRows(statistics.mostLoyal, "most"); 
}
if(document.getElementById('attendance')){
    createRows(statistics.leastEngaged, "least");
    createRows(statistics.mostEngaged, "most");
}







//

/*
for(let i=0; i<members.length; i++){

    if(members[i].party == "R")(statistics.republicans.push(members[i]));
    if(members[i].party == "D")(statistics.democrats.push(members[i]));
    if(members[i].party == "ID")(statistics.independents.push(members[i]));

}


statistics.avgPartyVotesDemocrats = averagePartyVotes(statistics.democrats);
statistics.avgPartyVotesRepublicans = averagePartyVotes(statistics.republicans);
statistics.avgPartyVotesIndependants = averagePartyVotes(statistics.independents);

*/