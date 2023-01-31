<script>
  import { onMount } from "svelte";
  export let map;
  export let povertyPercent = 35;
  export let layer;
  $: {
    const povertyLayer = map.getLayer("poverty");
    if (povertyLayer) {
      map.setFilter(layer.layer, [">=", layer.propName, povertyPercent]);
    }
  }

  const getData = async (map) => {
    const response = await fetch(layer.url);
    const data = await response.json();
    map.addSource(layer.layer, {
      type: "geojson",
      data: data,
    });

    map.addLayer(
      {
        id: layer.layer,
        type: "fill",
        source: layer.layer,
        paint: {
          "fill-color": layer.color,
          "fill-opacity": 0.5,
        },
      },
      "waterway-label"
    );
    map.setFilter(layer.layer, [">=", layer.propName, povertyPercent]);
  };

  onMount(() => {
    getData(map);
  });
</script>

<div>{layer.name}</div>

<div>>= {povertyPercent}%</div>

<input
  type="range"
  min="1"
  max="100"
  bind:value={povertyPercent}
  class="slider"
  id="myRange"
/>

<style>
</style>
