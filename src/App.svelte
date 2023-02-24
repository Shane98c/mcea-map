<script>
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  import Layer from "./Layer.svelte";

  export let map;
  export let mapReady = false;
  export let layers;
  export let staticLayers;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhbmU5OGMiLCJhIjoiY2xkamNyb3djMXBtMTNybnc5MG5wNDd4byJ9.Xvs-kS3oryfGJtCR7KVqqQ";
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  function createMap() {
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
  <div id="map" />
  {#if mapReady}
    <div class="layerControllerWrapper">
      <div class="layerControllers">
        {#each layers as layer}
          <Layer {popup} {map} {layer} />
        {/each}
      </div>
      <div class="layerControllers">
        {#each staticLayers as layer}
          <Layer {popup} {map} {layer} />
        {/each}
      </div>
    </div>
  {/if}
</main>

<style>
  #map {
    width: 100vw;
    height: 100vh;
  }
  .layerControllerWrapper {
    position: absolute;
    top: 0.25rem;
    width: 100%;
  }
  .layerControllers {
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #444444;
  }
</style>
