new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    drawer: null,
    items: [],
    searchItems: [],
    itemsPerRow: 3,
    allItems: [],
    select: null,
    search: null }),

  methods: {
    chunkItems(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += this.itemsPerRow) {
        newArr.push(arr.slice(i, i + this.itemsPerRow));
      }
      return newArr;
    },
    handleSearch(event) {
      query = event.target.value;
      console.log(query);
      if (query === null) {
        this.items = this.allItems;
      } else {
        var re = new RegExp(".*" + query + ".*", "i");
        this.items = this.allItems.filter(item => item.name.match(re));
      }
    } },

  mounted() {
    let apiUrl = "https://api.coinmarketcap.com/data-api/v3/topsearch/rank";
    axios.get(apiUrl).then(response => {
      this.items = response.data.data.cryptoTopSearchRanks;
      this.allItems = this.items;
      this.searchItems = this.items.map(item => item.name);
    });
  } });


Vue.filter("toCurrency", function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0 });

  return formatter.format(value);
});
Vue.filter("toPercent", function (value) {
  return parseFloat(value).toFixed(2) + "%";
});