let members = data.results[0].members;
let tabla = document.getElementById("tabla");
// for (let i = 0; i < members.length;i++){

//   let row = document.createElement("tr");
//   let celda = document.createElement("td");
//   let celda1 = document.createElement("td");
//   let celda2 = document.createElement("td");
//   let celda3 = document.createElement("td");
//   let celda4 = document.createElement("td");

//   let cleanMiddle = members[i].middle_name;
//   if(cleanMiddle == null){
//     cleanMiddle = ""
//   }

//   celda.innerHTML = members[i].first_name + " " + cleanMiddle + " " + members[i].last_name;
//   celda1.innerHTML = members[i].party;
//   celda2.innerHTML = members[i].state;
//   celda3.innerHTML = members[i].seniority;
//   celda4.innerHTML = members[i].votes_with_party_pct + "%";

//   tabla.append(row);
//   row.append(celda, celda1, celda2, celda3, celda4);
// }

let template = "";

for (let i = 0; i < members.length; i++) {
  let member = members[i];
  template += `
  <tr>
    <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
    ""} ${member.last_name}</a></td>
    <td>${member.party}</td>
    <td>${member.state}</td>
    <td>${member.seniority}</td>
    <td>${member.votes_with_party_pct + "%"}</td>
  </tr>`;
}

tabla.innerHTML = template;

// document.getElementById("rep").addEventListener("change", filter);
// document.getElementById("dem").addEventListener("change", filter);
// document.getElementById("ind").addEventListener("change", filter);

function filter() {
  let repCb = document.getElementById("rep");
  let demCb = document.getElementById("dem");
  let indCb = document.getElementById("ind");
  let checkeados = [];

  if (repCb.checked) {
    checkeados.push("R");
  }

  if (demCb.checked) {
    checkeados.push("D");
  }

  if (indCb.checked) {
    checkeados.push("I");
  }

  if (!repCb.checked && !demCb.checked && !indCb.checked) {
    checkeados.push("R");
    checkeados.push("D");
    checkeados.push("I");
  }

  let membersToPrint = [];

  members.forEach(function(member) {
    if (checkeados.includes(member.party)) {
      membersToPrint.push(member);
    }
  });

  console.log(membersToPrint);

  printNewTable(membersToPrint);
}

function printNewTable(miembrosAImprimir) {
  let template = "";

  miembrosAImprimir.forEach(function(member) {
    template += `
  <tr>
      <td><a href="${member.url}">${member.first_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>
    </tr>`;
  });

  tabla.innerHTML = template;
}

// document.getElementById("estados")

// for (let i = 0; i < estados.length; i++) {
//   i = estados[i]
//   if(estados[i] == )
// }
