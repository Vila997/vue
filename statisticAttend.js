let members = data.results[0].members
sumartodo(members);
function sumartodo(members) {
  
    let totalderep = [];
    let totaldedem = [];
    let totaldeind = [];
    let sumarep = 0;
    let sumadem = 0;
    let sumaind = 0;
    let mediarep = 0;
    let mediadem = 0;
    let mediaind = 0;
    //esto es un for
    for (let i = 0; i < members.length; i++) {
      let member = members[i];
        
      //esto indica si es republicano democrata o independiente
      if (member.party == "R") {
        totalderep.push(member);
        sumarep += member.votes_with_party_pct;
      }
      if (member.party == "D"){
        totaldedem.push(member);
        sumadem += member.votes_with_party_pct;
      }
      if (member.party == "I"){
        totaldeind.push(member);
        sumaind += member.votes_with_party_pct;
      }
    }
    if(totaldeind.length == 0){mediaind = 0 ;}else{mediaind = sumaind / totaldeind.length}
mediarep =  sumarep / totalderep.length;
mediadem = sumadem / totaldedem.length;

//esto es una conversion para redondear decimales
let mediar = Math.round(mediarep*100)/100 +"%";
let mediad = Math.round(mediadem*100)/100 +"%";
let mediai = Math.round(mediaind*100)/100 +"%";

//esto es para para referenciarlo con el HTML
let rep = document.getElementById("numrep");
document.getElementById("mediarep").innerHTML = mediar;
let dem = document.getElementById("numdem");
document.getElementById("mediadem").innerHTML = mediad;
let ind = document.getElementById("numind");
document.getElementById("mediaind").innerHTML = mediai;


rep.innerHTML = totalderep.length;
mediar.innerHTML = mediarep;
dem.innerHTML = totaldedem.length;
mediad.innerHTML = mediadem;
ind.innerHTML = totaldeind.length;
mediai.innerHTML = mediaind;


}






function missedvotes (){
  let template = "";
  let numMissVotes = []
  for (let i = 0; i < members.length; i++) {
    let member = members[i];
    if(!(numMissVotes.includes(member.missed_votes))){
      numMissVotes[i]= member.missed_votes;
    }
  }
  numMissVotes.sort(function(a,b){return a - b});

  let tabla = document.getElementById("tabla");
  for(let j = 0; j < 10; j++){
    let votos = numMissVotes[j];
    for(let i = 0; i < members.length; i++){
      let votosapi = members[i].missed_votes;
      if(votosapi == votos){
        let last_name = members[i].last_name;
        
        template +=`
        <tr>
          <td>${members[i].last_name}</td>
          <td>${members[i].missed_votes}</td>
          <td>${members[i].missed_votes_pct}</td>
        </tr>
        `
      }
      tabla.innerHTML = template;
    }
  }
  return numMissVotes;
}
missedvotes()




