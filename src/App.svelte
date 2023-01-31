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
      console.log("map is ready");
      mapReady = true;
    });
  }
  onMount(() => {
    createMap();
  });
</script>

<main>
  {#if mapReady}
    {#each layerInfo as layer}
      <Layer {map} {layer} />{/each}
  {/if}
  <div id="map" style="width: 100vw; height: 100vh;" />
</main>

<style>
</style>
