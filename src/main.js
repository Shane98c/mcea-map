import App from "./App.svelte";

const layerInfo = [
  {
    name: "Percent Population below 200% of Poverty Line",
    layer: "poverty",
    propName: "perc_lt200",
    url: "/data/poverty_lt_200perc.geojson",
    color: "blue",
    initialValue: 35,
  },
];

const app = new App({
  target: document.body,
  props: {
    layerInfo,
  },
});

export default app;
