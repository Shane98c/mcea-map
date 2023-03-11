import App from "./App.svelte";

const layers = [
  {
    name: "Population below 200% of Poverty Line",
    layer: "poverty",
    propName: "perc_lt200",
    type: "polygon",
    url: "data/poverty_lt_200perc.geojson",
    color: "#729b6f",
    initialValue: 35,
    visible: true,
  },
  {
    name: "Non-white",
    layer: "nonwhite",
    propName: "perc_nw",
    type: "polygon",
    url: "data/nonwhite.geojson",
    color: "#8d5a99",
    initialValue: 40,
    visible: true,
  },
  {
    name: "Speak English 'less than very well'",
    layer: "english",
    propName: "ltvw_perc",
    type: "polygon",
    url: "data/engl_ltvw.geojson",
    color: "#e77148",
    initialValue: 40,
    visible: true,
  },
];
const staticLayers = [
  {
    name: "Federally defined 'Indian Country'",
    layer: "indian-country",
    propName: null,
    type: "polygon",
    url: "data/indianCountry.geojson",
    color: "grey",
    initialValue: null,
    static: true,
    visible: true,
  },
  {
    name: "Major air permit locations (MPCA)",
    layer: "air-permits",
    propName: null,
    type: "point",
    url: "data/MajorAirPermits.geojson",
    color: "#444444",
    initialValue: null,
    static: true,
    link: "https://www.pca.state.mn.us/business-with-us/part-70-manufacturing-general-permit",
    visible: true,
  },
  {
    name: "MN Senate Districts",
    layer: "senate-districts",
    propName: null,
    type: "polygon",
    alsoType: "line",
    url: "data/senate22.geojson",
    color: "rgba(0,0,0,0)",
    alsoColor: "#444444",
    initialValue: null,
    static: true,
    link: null,
    visible: false,
  },
  {
    name: "MN House Districts",
    layer: "house-districts",
    propName: null,
    type: "polygon",
    alsoType: "line",
    url: "data/house22.geojson",
    color: "rgba(0,0,0,0)",
    alsoColor: "#444444",
    initialValue: null,
    static: true,
    link: null,
    visible: false,
  },
];

const app = new App({
  target: document.body,
  props: {
    layers,
    staticLayers,
  },
});

export default app;
