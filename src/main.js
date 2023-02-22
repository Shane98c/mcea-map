import App from "./App.svelte";

const layerInfo = [
  {
    name: "Population below 200% of Poverty Line",
    layer: "poverty",
    propName: "perc_lt200",
    url: "data/poverty_lt_200perc.geojson",
    color: "#729b6f",
    initialValue: 35,
  },
  {
    name: "Non-white",
    layer: "nonwhite",
    propName: "perc_nw",
    url: "data/nonwhite.geojson",
    color: "#8d5a99",
    initialValue: 40,
  },
  {
    name: "Speak English 'less than very well'",
    layer: "english",
    propName: "ltvw_perc",
    url: "data/engl_ltvw.geojson",
    color: "#e77148",
    initialValue: 40,
  },
  {
    name: "Federally defined 'Indian Country'",
    layer: "indian-country",
    propName: null,
    url: "data/indianCountry.geojson",
    color: "grey",
    initialValue: null,
    static: true,
  },
];

const app = new App({
  target: document.body,
  props: {
    layerInfo,
  },
});

export default app;
