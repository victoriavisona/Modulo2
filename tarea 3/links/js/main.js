const table = document.getElementById("senate-data")
let members = data.results[0].members

let states=[];
for(i=0;i<members.length;i++){
    if(!states.includes(members[i].state)){
        states.push(members[i].state)
    }
}

states.sort();

states.forEach(state =>{
    let option = document.createElement("option");
    option.value = state;
    option.innerText = state;
    document.querySelector("#state-filter").appendChild(option);
})

document.querySelectorAll("input[name=party]").forEach(function(e){
    e.addEventListener("change", createTable);
})

document.querySelector("#state-filter").addEventListener("change",createTable);

createTable();

function createTable(){

    table.innerHTML = "";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let th1= document.createElement("th");
    th1.innerText="Full Name";

    let th2= document.createElement("th");
    th2.innerText = "Party";

    let th3= document.createElement("th");
    th3.innerText = "State";

    let th4= document.createElement("th");
    th4.innerText = "Years in Office";

    let th5= document.createElement("th");
    th5.innerText = "% votes w/ Party";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    let checkedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(e=> e.value);

    let state = document.querySelector("#state-filter").value;
    console.log(state);

    for(let i=0; i<members.length; i++){

        if(checkedParties.includes(members[i].party) && (members[i].state == state || state == "all")){
            
            let tr= document.createElement("tr");
            let td1= document.createElement("td");
            let link= document.createElement("a");
            link.innerText=members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
            link.href = members[i].url;
            td1.appendChild(link);
            tr.appendChild(td1);

            let td2= document.createElement("td");
            td2.innerText = members[i].party;
            tr.appendChild(td2);

            let td3= document.createElement("td");
            td3.innerText = members[i].state;
            tr.appendChild(td3);

            let td4= document.createElement("td");
            td4.innerText = members[i].seniority;
            tr.appendChild(td4);

            let td5= document.createElement("td");
            td5.innerText = members[i].votes_with_party_pct;
            tr.appendChild(td5);

            tbody.appendChild(tr);
        }
    }
    table.appendChild(tbody);
}
