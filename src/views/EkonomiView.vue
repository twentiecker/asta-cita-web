<script setup>
import { ref, computed, onMounted } from "vue";
import {
  qtoq,
  yony,
  ctoc,
  tahunan,
  triwulan,
  perkapita,
  growthPerkapita,
} from "@/utils/ekonomi";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartSogData.value = setChartSogData();
  chartSogOptions.value = setChartSogOptions();
  chartSpasialData.value = setChartSpasialData();
  chartSpasialOptions.value = setChartSpasialOptions();
});

const selectedPeriod = ref({ name: "Tahunan" });
const periods = ref([{ name: "Tahunan" }, { name: "Triwulanan" }]);

const selectedYear = ref({ name: "2024", year: 2024 });
const years = ref([
  { name: "2023", year: 2023 },
  { name: "2024", year: 2024 },
]);

const selectedQuarter = ref({ name: "Q1" });
const quarters = ref([
  { name: "Q1" },
  { name: "Q2" },
  { name: "Q3" },
  { name: "Q4" },
]);

const qtoqTriwulan = computed(() =>
  qtoq.find(
    (item) =>
      item.tahun === selectedYear.value.name + selectedQuarter.value.name
  )
);

const yonyTriwulan = computed(() =>
  yony.find(
    (item) =>
      item.tahun === selectedYear.value.name + selectedQuarter.value.name
  )
);

const ctocTriwulan = computed(() =>
  ctoc.find(
    (item) =>
      item.tahun === selectedYear.value.name + selectedQuarter.value.name
  )
);

const pdbTahunan = computed(() =>
  tahunan.find((item) => item.tahun === selectedYear.value.year)
);

const pdbTriwulan = computed(() =>
  triwulan.find(
    (item) =>
      item.tahun === selectedYear.value.name + selectedQuarter.value.name
  )
);

const perkapitaTahunan = computed(() =>
  perkapita.find((item) => item.tahun === selectedYear.value.year)
);

const growthPerkapitaTahunan = computed(() =>
  growthPerkapita.find((item) => item.tahun === selectedYear.value.year)
);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line",
        label: "Growth (%)",
        borderColor: documentStyle.getPropertyValue("--p-orange-500"),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        data: [5.2, 4.8, 6.1, 5.7, 4.9, 6.3, 5.5],
        yAxisID: "y", // pakai sumbu persen
      },
      {
        type: "line",
        label: "Growth 2 (%)",
        borderColor: documentStyle.getPropertyValue("--p-pink-500"),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        data: [4.5, 5.1, 6.5, 5.2, 5.7, 6.0, 5.8],
        yAxisID: "y", // pakai sumbu persen
      },
      {
        type: "bar",
        label: "PDB (Triliun Rp)",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: [210, 250, 300, 280, 320, 350, 370],
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y1", // pakai sumbu nilai
      },
      {
        type: "bar",
        label: "PDRB (Triliun Rp)",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: [120, 150, 180, 170, 200, 210, 230],
        yAxisID: "y1", // pakai sumbu nilai
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          color: textColorSecondary,
          callback: (value) => value + "%", // format persen
        },
        title: {
          display: true,
          text: "Pertumbuhan (%)",
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y1: {
        type: "linear",
        position: "right",
        ticks: {
          color: textColorSecondary,
          callback: (value) => value.toLocaleString(), // format angka ribuan
        },
        title: {
          display: true,
          text: "Nilai (Triliun Rp)",
        },
        grid: {
          drawOnChartArea: false, // biar grid tidak numpuk
        },
      },
    },
  };
};

const chartSogData = ref();
const chartSogOptions = ref();

const setChartSogData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: [50, 25, 12, 48, 90, 76, 42],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: [21, 84, 24, 75, 37, 65, 34],
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: documentStyle.getPropertyValue("--p-orange-500"),
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  };
};
const setChartSogOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const chartSpasialData = ref();
const chartSpasialOptions = ref();

const setChartSpasialData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        backgroundColor: documentStyle.getPropertyValue("--p-gray-500"),
        borderColor: documentStyle.getPropertyValue("--p-gray-500"),
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
};
const setChartSpasialOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>

<template>
  <div class="card px-6">
    <Tabs value="0">
      <TabList>
        <Tab value="0" as="div" class="flex items-center gap-2">
          <i class="pi pi-chart-line" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">PDB</span>
        </Tab>
        <Tab value="1" as="div" class="flex items-center gap-2">
          <i class="pi pi-shopping-cart" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Konsumsi</span>
        </Tab>
        <Tab value="2" as="div" class="flex items-center gap-2">
          <i class="pi pi-building" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Pemerintah</span>
        </Tab>
        <Tab value="3" as="div" class="flex items-center gap-2">
          <i class="pi pi-wallet" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Investasi</span>
        </Tab>
        <Tab value="4" as="div" class="flex items-center gap-2">
          <i class="pi pi-external-link" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Ekspor Impor</span>
        </Tab>
        <Tab value="5" as="div" class="flex items-center gap-2">
          <i class="pi pi-globe" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Sektor Primer</span>
        </Tab>
        <Tab value="6" as="div" class="flex items-center gap-2">
          <i class="pi pi-cog" style="font-size: 1.5rem"></i>
          <span class="font-bold whitespace-nowrap">Sektor Sekunder</span>
        </Tab>
        <Tab v-slot="slotProps" value="7" asChild>
          <div
            :class="['flex items-center gap-2', slotProps.class]"
            @click="slotProps.onClick"
            v-bind="slotProps.a11yAttrs"
          >
            <i class="pi pi-briefcase" style="font-size: 1.5rem"></i>
            <span class="font-bold whitespace-nowrap">Sektor Tersier</span>
            <Badge value="2" />
          </div>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" as="p" class="m-0">
          <div class="card">
            <Panel header="Pertumbuhan Ekonomi Indonesia">
              <div class="flex flex-wrap gap-4 mb-6">
                <Select
                  v-model="selectedPeriod"
                  :options="periods"
                  optionLabel="name"
                  placeholder="Select a Period"
                  class="w-full md:w-56"
                />
                <Select
                  v-model="selectedYear"
                  :options="years"
                  optionLabel="name"
                  placeholder="Select a Year"
                  class="w-full md:w-56"
                />
                <Select
                  v-if="selectedPeriod.name === 'Triwulanan'"
                  v-model="selectedQuarter"
                  :options="quarters"
                  optionLabel="name"
                  placeholder="Select a Quarter"
                  class="w-full md:w-56"
                />
              </div>
              <div class="flex flex-wrap gap-4">
                <Fieldset
                  v-if="selectedPeriod.name === 'Triwulanan'"
                  legend="Q-to-Q"
                  class="flex-1 min-w-[200px]"
                >
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      {{ qtoqTriwulan.NASIONAL.toLocaleString() }}%
                    </p>
                    <i class="pi pi-chart-line" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>

                <Fieldset
                  v-if="selectedPeriod.name === 'Triwulanan'"
                  legend="Y-on-Y"
                  class="flex-1 min-w-[200px]"
                >
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      {{ yonyTriwulan.NASIONAL.toLocaleString() }}%
                    </p>
                    <i class="pi pi-calendar" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>

                <Fieldset legend="C-to-C" class="flex-1 min-w-[200px]">
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      {{ ctocTriwulan.NASIONAL.toLocaleString() }}%
                    </p>
                    <i class="pi pi-refresh" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>

                <Fieldset
                  legend="PDB Harga Berlaku"
                  class="flex-1 min-w-[200px]"
                >
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      Rp.{{
                        selectedPeriod.name === "Tahunan"
                          ? pdbTahunan.NASIONAL.toLocaleString()
                          : pdbTriwulan.NASIONAL.toLocaleString()
                      }}
                    </p>
                    <i class="pi pi-wallet" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>

                <Fieldset
                  v-if="selectedPeriod.name === 'Tahunan'"
                  legend="PDB Perkapita (Ribu Rp)"
                  class="flex-1 min-w-[200px]"
                >
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      Rp.{{ perkapitaTahunan.NASIONAL.toLocaleString() }}
                    </p>
                    <i class="pi pi-users" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>
              </div>
            </Panel>
          </div>

          <div class="card">
            <h1>Tren PDB dan Pertumbuhan Ekonomi Indonesia</h1>
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="h-[30rem]"
            />
          </div>
          <div class="card" v-if="selectedPeriod.name === 'Tahunan'">
            <h1>Nilai dan Perkapita Penduduk Indonesia</h1>
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="h-[30rem]"
            />
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="card flex-1">
              <h1>Judul 1</h1>
              <Chart
                type="bar"
                :data="chartSogData"
                :options="chartSogOptions"
                class="h-[30rem]"
              />
            </div>
            <div class="card flex-1">
              <h1>Judul 2</h1>
              <Chart
                type="bar"
                :data="chartSogData"
                :options="chartSogOptions"
                class="h-[30rem]"
              />
            </div>
          </div>
          <div class="card">
            <h1>Gambaran Spasial Perekonomian menurut Provinsi</h1>
            <Chart
              type="bar"
              :data="chartSpasialData"
              :options="chartSpasialOptions"
              class="h-[30rem]"
            />
          </div>
        </TabPanel>
        <TabPanel value="1" as="p" class="m-0"> Data Konsumsi </TabPanel>
        <TabPanel value="2" as="p" class="m-0"> Data Pemerintah </TabPanel>
        <TabPanel value="3" as="p" class="m-0"> Data Investasi </TabPanel>
        <TabPanel value="4" as="p" class="m-0"> Data Ekspor Impor </TabPanel>
        <TabPanel value="5" as="p" class="m-0"> Data Sektor Primer </TabPanel>
        <TabPanel value="6" as="p" class="m-0"> Data Sektor Sekunder </TabPanel>
        <TabPanel v-slot="slotProps" value="7" asChild>
          <div
            v-show="slotProps.active"
            :class="slotProps.class"
            v-bind="slotProps.a11yAttrs"
          >
            <p class="m-0">Data Sektor Tersier</p>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
