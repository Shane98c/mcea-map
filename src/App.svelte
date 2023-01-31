<script>
  import { onMount } from "svelte";
  import Layer from "./Layer.svelte";
  export let map;
  export let mapReady = false;
  export let layerInfo;

  import mapboxgl from "mapbox-gl";
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhbmU5OGMiLCJhIjoiY2xkamNyb3djMXBtMTNybnc5MG5wNDd4byJ9.Xvs-kS3oryfGJtCR7KVqqQ";
  async function createMap() {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-93.6, 45.6568],
      zoom: 6.3,
    });
    map.on("load", () => {
      mapReady = true;
      getData(map);
    });
  }
  const getData = async (map) => {
    const response = await fetch("data/indianCountry.geojson");
    const data = await response.json();
    map.addSource("indian-country", {
      type: "geojson",
      data: data,
    });

    map.addLayer(
      {
        id: "indian-country",
        type: "fill",
        source: "indian-country",
        paint: {
          "fill-color": "grey",
          "fill-opacity": 0.5,
        },
      },
      "waterway-label"
    );
  };

  onMount(() => {
    createMap();
  });
</script>

<main>
  <div class="layerControlers">
    {#if mapReady}
      {#each layerInfo as layer}
        <Layer {map} {layer} />{/each}
    {/if}
  </div>

  <div id="map" />
</main>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
  .layerControlers {
    position: absolute;
    top: 0;
    z-index: 1;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>
