<script>
  import { onMount } from "svelte";
  export let map;
  export let layer;
  export let currentPercent = layer.initialValue;
  export let visible = true;

  $: {
    const currentLayer = map.getLayer(layer.layer);
    if (currentLayer) {
      map.setFilter(layer.layer, [">=", layer.propName, currentPercent]);
      map.setLayoutProperty(
        layer.layer,
        "visibility",
        visible ? "visible" : "none"
      );
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
    map.setFilter(layer.layer, [">=", layer.propName, currentPercent]);
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
    bind:value={currentPercent}
    class="slider"
    id="myRange"
  />
  <div class="keyWrap">
    <div class="key" style="background-color: {layer.color}" />
    <div>
      over <b>{currentPercent}%</b>
    </div>
    <input type="checkbox" bind:checked={visible} />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: white;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
  }
  input[type="range"] {
    width: 100%;
  }
  .keyWrap {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px;
    justify-content: space-around;
  }
  .key {
    width: 20px;
    height: 20px;
    margin-left: 0.5rem;
    opacity: 0.5;
  }
</style>
