<script>
  import { onMount } from "svelte";
  import Layer from "./Layer.svelte";
  export let map;
  export let mapReady = false;
  export let layerInfo;
  export let visible = true;

  function toggleLayer(map, visible) {
    const currentLayer = map.getLayer("indian-country");
    if (currentLayer) {
      map.setLayoutProperty(
        "indian-country",
        "visibility",
        visible ? "visible" : "none"
      );
    }
  }
  $: {
    if (map) {
      toggleLayer(map, visible);
    }
  }

  import mapboxgl from "mapbox-gl";
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhbmU5OGMiLCJhIjoiY2xkamNyb3djMXBtMTNybnc5MG5wNDd4byJ9.Xvs-kS3oryfGJtCR7KVqqQ";
  async function createMap() {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-93.6, 46.2568],
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
        <Layer {map} {layer} />
      {/each}
      <div class="legend">
        <div class="legendColor" />
        <div class="legendText">Federally defined "Indian Country"</div>
        <input type="checkbox" bind:checked={visible} />
      </div>
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
    top: 0.5rem;
    z-index: 1;
    border-radius: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(min-content, max-content);
    color: #444444;
  }

  .layerControlers .legend:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    justify-self: center;
  }

  .legend {
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: fit-content;
    background-color: #fefefe;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.8rem;
    margin: 0.5rem;
    padding: 0 0.25rem;
  }

  .legendColor {
    background-color: grey;
    opacity: 0.5;
    min-width: 15px;
    height: 15px;
    /* margin-left: 0.5rem; */
    opacity: 0.5;
  }
  input {
    margin: 0;
    cursor: pointer;
  }
  .legendText {
    text-align: center;
    padding: 5px;
    color: #333;
    font-size: 0.8rem;
  }
</style>
