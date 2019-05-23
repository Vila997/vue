let myVue = new Vue({
  el: "#myApp",
  data: {
    members: []
  },
  methods: {
    getData() {
      fetch("https://nytimes-ubiqum.herokuapp.com/congress/113/senate")
        .then(function(res) {
          return res.json();
        })
        .then(function(json) {
          myVue.members = json.results[0].members;
        });
    }
  },
  created() {
    this.getData();
  }
});

myVue.getData();
