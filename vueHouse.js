let vue = new Vue({
  //variables con arrays vacias para ir metiendo los datos
  el: "#myApp",
  data: {
    members: [],
    checkbox: [],
    state: "All",
    republicanos: [],
    democratas: [],
    independientes: [],
    mediaRep: [],
    mediaDem: [],
    mediaInd: [],
    mediaRepublicanos: 0,
    mediaDemocratas: 0,
    mediaIndependientes: 0,
    menosVotadosAtt: [],
    masVotadosAtt: [],
    menosVotosLoyalty: [],
    masVotosLoyalty: []
  },
  //computed = .map quita repetidos  .sort ordena la array
  computed: {
    states() {
      return new Set(
        this.members
          .map(function(member) {
            return member.state;
          })
          .sort()
      );
    },
    //filtro de miembros party/estado
    filtermembers() {
      return this.members.filter(function(member) {
        let filtroCheckbox =
          vue.checkbox.includes(member.party) || vue.checkbox.length == 0;
        let filtrostate = vue.state == member.state || vue.state == "All";
        return filtroCheckbox && filtrostate;
      });
    }
  },
  //metodos para sacar la data
  methods: {
    getMembers() {
      fetch("https://nytimes-ubiqum.herokuapp.com/congress/113/house")
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          vue.members = json.results[0].members;
          vue.fillArrays();
          vue.mediaArrays();
          vue.superMediaDem();
          vue.superMediaRep();
          vue.superMediaInd();
          vue.menosVotados();
          vue.masVotados();
          vue.menosVotadosLoyal();
          vue.masVotadosLoyal();
        });
    },
    fillArrays() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i];
        if (member.party == "R") {
          this.republicanos.push(member);
        }
        if (member.party == "D") {
          this.democratas.push(member);
        }
        if (member.party == "I") {
          this.independientes.push(member);
        }
      }
    },
    mediaArrays() {
      for (let i = 0; i < this.republicanos.length; i++) {
        let member = this.members[i];
        this.mediaRep.push(Number(member.votes_with_party_pct));
      }

      for (let i = 0; i < this.democratas.length; i++) {
        let member = this.members[i];
        this.mediaDem.push(Number(member.votes_with_party_pct));
      }
      for (let i = 0; i < this.independientes.length; i++) {
        let member = this.members[i];
        this.mediaInd.push(Number(member.votes_with_party_pct));
      }
    },
    superMediaRep() {
      let suma = this.mediaRep.reduce(
        (previous, current) => (current += previous)
      );
      this.mediaRepublicanos = suma / this.mediaRep.length;
      this.mediaRepublicanos =
        Math.round(this.mediaRepublicanos * 100) / 100 + "%";
    },
    superMediaDem() {
      let suma = this.mediaDem.reduce(
        (previous, current) => (current += previous)
      );
      this.mediaDemocratas = suma / this.mediaDem.length;
      this.mediaDemocratas = Math.round(this.mediaDemocratas * 100) / 100 + "%";
    },
    superMediaInd() {
      let suma = this.mediaInd.reduce(
        (previous, current) => (current += previous)
      );
      this.mediaIndependientes = suma / this.mediaInd.length;
      this.mediaIndependientes =
        Math.round(this.mediaIndependientes * 100) / 100 + "%";
    },
    menosVotados() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i];
        // this.menosVotadosAtt.push(member.last_name);
        this.menosVotadosAtt.push(member);
      }
      this.menosVotadosAtt = this.menosVotadosAtt
        .sort((a, b) => a.missed_votes - b.missed_votes)
        .slice(0, this.members.length * 0.1);
    },
    masVotados() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i];
        // this.menosVotadosAtt.push(member.last_name);
        this.masVotadosAtt.push(member);
      }
      this.masVotadosAtt = this.masVotadosAtt
        .sort((a, b) => b.missed_votes - a.missed_votes)
        .slice(0, this.members.length * 0.1);
    },
    menosVotadosLoyal() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i];
        // this.menosVotadosAtt.push(member.last_name);
        this.menosVotosLoyalty.push(member);
      }
      this.menosVotosLoyalty = this.menosVotosLoyalty
        .sort((a, b) => a.total_votes - b.total_votes)
        .slice(0, this.members.length * 0.1);
    },
    masVotadosLoyal() {
      for (let i = 0; i < this.members.length; i++) {
        let member = this.members[i];
        // this.menosVotadosAtt.push(member.last_name);
        this.masVotosLoyalty.push(member);
      }
      this.masVotosLoyalty = this.masVotosLoyalty
        .sort((a, b) => b.total_votes - a.total_votes)
        .slice(0, this.members.length * 0.1);
    }
  }
});
vue.getMembers();
