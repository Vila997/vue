
function missedvotes (){
    let template = "";
    let numMissVotes = []
    for (let i = 0; i < members.length; i++) {
      let member = members[i];
     
      if(!(numMissVotes.includes(member.total_votes))){
        numMissVotes.push(member.total_votes);
    }
}

numMissVotes.sort(function(a,b){return b - a});
    let tabla = document.getElementById("tabla");
    for(let j = 0; j < 10; j++){
      let votos = numMissVotes[j];
      for(let i = 0; i < members.length; i++){
        let votosapi = members[i].total_votes;
        if(votosapi == votos){
          if(!(votosapi == 657  )){
          template +=`
          <tr>
            <td>${members[i].last_name}</td>
            <td>${members[i].total_votes}</td>
            <td>${members[i].votes_with_party_pct}</td>
          </tr>
          `;
          }
          if(votosapi == 657 && members[i].votes_with_party_pct > 99){
            template +=`
            <tr>
              <td>${members[i].last_name}</td>
              <td>${members[i].total_votes}</td>
              <td>${members[i].votes_with_party_pct}</td>
            </tr>
            `;
          }
        tabla.innerHTML = template;
      }}
    }
  }
  missedvotes()