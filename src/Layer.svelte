<script>
  import { onMount } from "svelte";
  export let map;
  export let layer;
  export let currentPercent = layer.initialValue;
  export let visible = true;

  $: {
    const currentLayer = map.getLayer(layer.layer);
    if (currentLayer) {
      !layer.static &&
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
    !layer.static &&
      map.setFilter(layer.layer, [">=", layer.propName, currentPercent]);
  };

  onMount(() => {
    getData(map);
  });
</script>

<div class="wrapper">
  <div class="keyWrap">
    <div class="key" style="background-color: {layer.color}" />
    <input type="checkbox" bind:checked={visible} />
  </div>
  {#if !layer.static}
    <div class="value">
      over <b>{currentPercent}%</b>
    </div>
  {/if}
  <div>{layer.name}</div>

  {#if !layer.static}
    <input
      type="range"
      min="1"
      max="100"
      bind:value={currentPercent}
      class="slider"
      id="myRange"
    />
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    flex: 1 1 0px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: #fefefe;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-size: 0.8rem;
    text-align: center;
    margin: 0.25rem;
    margin-bottom: 0;
  }
  .wrapper:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    justify-self: center;
  }
  input {
    cursor: pointer;
  }
  input[type="range"] {
    width: 100%;
    margin-top: 5px;
  }
  input[type="checkbox"] {
    margin: 0 3px;
    height: 15px;
    width: 15px;
  }
  .value {
    font-size: 0.9rem;
  }
  .keyWrap {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .key {
    width: 15px;
    height: 15px;
    margin-left: 0.5rem;
    opacity: 0.5;
    border-radius: 2px;
  }
</style>
