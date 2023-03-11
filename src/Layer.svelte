<script>
  import { onMount } from "svelte";
  export let map;
  export let layer;
  export let currentPercent = layer.initialValue;
  export let visible = layer.visible;
  export let keyOpacity = 0.6;
  export let popup;
  export let hoverLayer = false;

  $: {
    const currentLayer = map.getLayer(layer.layer);
    if (currentLayer) {
      if (!layer.static) {
        map.setFilter(layer.layer, [">=", layer.propName, currentPercent]);
        map.setPaintProperty(layer.layer, "fill-opacity", keyOpacity);
      }
      map.setLayoutProperty(
        layer.layer,
        "visibility",
        visible ? "visible" : "none"
      );
      layer.alsoType &&
        map.setLayoutProperty(
          layer.layer + "-line",
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

    if (layer.type === "polygon") {
      map.addLayer(
        {
          id: layer.layer,
          type: "fill",
          source: layer.layer,
          paint: {
            "fill-color": layer.color,
            "fill-opacity": keyOpacity,
          },
        },
        "waterway-label"
      );
    } else if (layer.type === "point") {
      map.addLayer(
        {
          id: layer.layer,
          type: "circle",
          source: layer.layer,
          paint: {
            "circle-color": layer.color,
            "circle-radius": 3.5,
            "circle-opacity": keyOpacity,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fefefe",
            "circle-stroke-opacity": keyOpacity,
          },
        },
        "airport-label"
      );
    }
    if (layer.alsoType === "line") {
      map.addLayer(
        {
          id: layer.layer + "-line",
          type: "line",
          source: layer.layer,
          paint: {
            "line-color": layer.alsoColor,
            "line-width": 1,
          },
        },
        "waterway-label"
      );
    }
    map.setLayoutProperty(
      layer.layer,
      "visibility",
      visible ? "visible" : "none"
    );
    layer.alsoType &&
      map.setLayoutProperty(
        layer.layer + "-line",
        "visibility",
        visible ? "visible" : "none"
      );
    !layer.static &&
      map.setFilter(layer.layer, [">=", layer.propName, currentPercent]);
  };

  function resetValue() {
    currentPercent = layer.initialValue;
  }

  function flashLayer(opacity) {
    keyOpacity = opacity;
    if (layer.type === "polygon") {
      map.setPaintProperty(layer.layer, "fill-opacity", opacity);
    } else if (layer.type === "point") {
      map.setPaintProperty(layer.layer, "circle-opacity", opacity);
      map.setPaintProperty(layer.layer, "circle-stroke-opacity", opacity);
    }
  }

  onMount(() => {
    getData(map);
    const mapContainer = map.getCanvas();
    // map.on("mouseenter", "air-permits", function (e) {
    //   mapContainer.style.cursor = "pointer";
    //   const name = e.features[0].properties["Master AI Name"];
    //   popup.setLngLat(e.lngLat).setHTML(name).addTo(map);
    // });
    map.on(
      "mousemove",
      ["house-districts", "senate-districts", "air-permits"],
      function (e) {
        mapContainer.style.cursor = "pointer";
        //if source of any feature is air-permits, show only that name
        if (e.features.some((feature) => feature.source === "air-permits")) {
          const name =
            "MPCA air permit for -<br><b>" +
            e.features[0].properties["Master AI Name"] +
            "</b>";
          popup.setLngLat(e.lngLat).setHTML(name).addTo(map);
          return;
        }
        let name = "";
        e.features.map((feature) => {
          name += feature.source === "house-districts" ? "House  " : "Senate  ";
          name += "<b>" + feature.properties["DISTRICT"] + "</b><br>";
        });
        popup.setLngLat(e.lngLat).setHTML(name).addTo(map);
      }
    );
    map.on(
      "mouseleave",
      ["house-districts", "senate-districts", "air-permits"],
      function () {
        mapContainer.style.cursor = "";
        popup.remove();
      }
    );

    map.on("mouseenter", layer.layer, () => {
      hoverLayer = true;
    });
    map.on("mouseleave", layer.layer, () => {
      hoverLayer = false;
    });
  });
</script>

<div
  id={layer.layer}
  class="wrapper {layer.static ? ' static' : null} {hoverLayer
    ? 'hoverLayer'
    : null}"
  on:mouseenter={() => flashLayer(0.8)}
  on:mouseleave={() => flashLayer(0.6)}
>
  <div class="keyWrap">
    {#if !layer.alsoType}
      <div
        class="key"
        style="opacity: {keyOpacity}; background-color: {layer.color};  {layer.type ===
        'point'
          ? 'border-radius: 10px;'
          : 'border-radius: 2px;'}"
      />
    {/if}
    <input type="checkbox" bind:checked={visible} />
  </div>
  {#if !layer.static}
    <div class="value">
      over <b>{currentPercent}%</b>
      <button
        class="reset"
        title="reset to original value."
        on:click={() => resetValue()}>↺</button
      >
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
    flex: 1 1 30%;
    transition: transform 0.3s, box-shadow 0.3s;
    transition-delay: 0.05s;
  }
  .wrapper:hover {
    transform: translate(0, -2px);
  }
  .hoverLayer {
    transform: translate(0, -2px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  .static {
    flex: 0 1 fit-content;
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
    border-radius: 2px;
  }
  .reset {
    font-size: 1rem;
    color: #444444;
    padding: 0;
    cursor: pointer;
    border: none;
    background: none;
    transition: transform 0.2s;
  }
  .reset:active {
    transform: rotate(-15deg);
  }
</style>
