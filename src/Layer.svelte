<script>
  import { onMount } from "svelte";
  export let map;
  export let layer;
  export let povertyPercent = layer.initialValue;

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

<div class="wrapper">
  <div>{layer.name}</div>

  <input
    type="range"
    min="1"
    max="100"
    bind:value={povertyPercent}
    class="slider"
    id="myRange"
  />
  <div>>= {povertyPercent}%</div>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: aliceblue;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 5px;
  }
</style>
