function missedvotes (){
    let template = "";
    let numMissVotes = []
    for (let i = 0; i < members.length; i++) {
      let member = members[i];
      if(!(numMissVotes.includes(member.missed_votes))){
        numMissVotes[i]= member.missed_votes;
      }
    }
    numMissVotes.sort(function(a,b){return b - a});
  
    let tabla = document.getElementById("tabla2");
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
        tabla2.innerHTML = template;
      }
    }
    return numMissVotes;
  }
  missedvotes()