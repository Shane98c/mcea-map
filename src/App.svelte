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
      style: "mapbox://styles/mapbox/light-v11",
      center: [-93.6, 46.2568],
      zoom: 6.3,
    });
    map.on("load", () => {
      mapReady = true;
    });
  }

  onMount(() => {
    createMap();
  });
</script>

<main>
  <div class="layerControllers">
    {#if mapReady}
      {#each layerInfo as layer}
        <Layer {map} {layer} />
      {/each}
    {/if}
  </div>
  <div id="map" />
</main>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
  .layerControllers {
    position: absolute;
    top: 0.25rem;
    z-index: 1;
    border-radius: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-gap: 0.25rem 0.125rem;
    color: #444444;
  }
</style>
