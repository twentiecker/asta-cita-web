<script setup>
import { ref, onMounted } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
import { MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import geoJsonProvinsi from "../utils/provinsi.json";

use([
  CanvasRenderer,
  MapChart,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
]);

// opsi chart
const chartOptionsMap = ref({});
const dialogVisible = ref(false);
const selectedData = ref(null);

onMounted(async () => {
  // console.log("GeoJSON Provinsi Features:", geoJsonProvinsi.features.length);
  // console.log(
  //   "Sample Provinsi Properties:",
  //   geoJsonProvinsi.features[1].properties.PROVINSI
  // );
  // console.log("===================================");

  const echarts = await import("echarts");

  // register geoJsonProvinsi ke echarts
  echarts.registerMap("indonesia", geoJsonProvinsi);

  // const mapObjProv = echarts.getMap("indonesia");
  // console.log("ECharts map Provinsi object:", mapObjProv);
  // console.log(
  //   "Nama yang dipakai (GeoJSON Provinsi):",
  //   mapObjProv.geoJson.features.map((f) => f.properties.PROVINSI)
  // );
  // console.log("===================================");

  geoJsonProvinsi.features.forEach((f) => {
    const candidate = f.properties.PROVINSI ?? "";
    f.properties.name = candidate.trim(); // wajib ada f.properties.name
  });

  // dummy data PDRB per provinsi (geoJsonProvinsi)
  const pdrbData = geoJsonProvinsi.features.map((d) => ({
    name: d.properties.name, // HARUS sama persis
    value: Math.floor(Math.random() * 10000),
    kode: d.properties.KODE_PROV,
    Propinsi: d.properties.PROVINSI,
  }));

  // console.log(JSON.stringify(pdrbData));
  // console.log("===================================");

  chartOptionsMap.value = {
    // title: {
    //   text: "PDRB Indonesia per Provinsi",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
      formatter: (p) => {
        return `${p.name} - ${p.value}`;
      },
    },
    visualMap: {
      min: 0,
      max: 10000,
      left: "left",
      top: "bottom",
      text: ["Tinggi", "Rendah"],
      calculable: true,
    },
    series: [
      {
        name: "PDRB",
        type: "map",
        map: "indonesia",
        roam: true,
        data: pdrbData,
        selectedMode: false, // biar nggak auto-keep highlight saat klik
      },
    ],
  };
});

// Handler saat user klik provinsi
const handleMapClick = (chart) => {
  console.log("Data dari map:", chart);
  selectedData.value = chart.data; // simpan data ke state
  dialogVisible.value = true; // buka dialog
};
</script>

<template>
  <v-chart
    :option="chartOptionsMap"
    autoresize
    style="height: 600px; width: 100%"
    @click="handleMapClick"
  />
  <Dialog
    v-model:visible="dialogVisible"
    modal
    header="Detail Provinsi"
    :style="{ width: '400px' }"
  >
    <div v-if="selectedData">
      <p><b>Nama:</b> {{ selectedData.name }}</p>
      <p><b>Kode:</b> {{ selectedData.kode }}</p>
      <p><b>PDRB:</b> {{ selectedData.value }}</p>
    </div>
  </Dialog>
</template>
