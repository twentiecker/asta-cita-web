<script setup>
import { ref, onMounted, watch } from "vue";
import { allData, allIndikator } from "@/utils/data";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  barChartData.value = setbarChartData();
  barChartOptions.value = setbarChartOptions();
  chartDataIndikator.value = setChartDataIndikator();
  chartOptionsIndikator.value = setChartOptionsIndikator();
});

const indikatorCards = ref([
  {
    title: "Indeks Demokrasi Indonesia",
    values: {
      "Baseline 2024": "79.51",
      "Target 2025": "81.69 - 85.23",
      "Target 2029": "83.42 - 86.98",
    },
  },
  {
    title: "Indeks Hak Asasi Manusia",
    values: {
      "Baseline 2024": "2.70",
      "Target 2025": "2.75",
      "Target 2029": "2.85",
    },
  },
]);

const selectedRegion = ref({ name: "Indonesia", key: "indonesia" });

function formatKeyToName(key) {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const regions = ref(
  Object.keys(allData.demokrasi).map((key) => ({
    name: formatKeyToName(key),
    key: key,
  }))
);

const selectedAspect = ref({
  name: "Indeks Demokrasi Indonesia",
  key: "demokrasi",
});

const aspects = ref([
  { name: "Indeks Demokrasi Indonesia", key: "demokrasi" },
  { name: "Aspek Kebebasan", key: "sipil" },
  { name: "Aspek Keseteraan", key: "politik" },
  { name: "Aspek Kapasitas Lembaga Demokrasi", key: "lembaga" },
]);

const selectedYear = ref({ name: "2023", idx: 14 });

const years = ref([
  { name: "2009", idx: 0 },
  { name: "2010", idx: 1 },
  { name: "2011", idx: 2 },
  { name: "2012", idx: 3 },
  { name: "2013", idx: 4 },
  { name: "2014", idx: 5 },
  { name: "2015", idx: 6 },
  { name: "2016", idx: 7 },
  { name: "2017", idx: 8 },
  { name: "2018", idx: 9 },
  { name: "2019", idx: 10 },
  { name: "2020", idx: 11 },
  { name: "2021", idx: 12 },
  { name: "2022", idx: 13 },
  { name: "2023", idx: 14 },
]);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: [
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: `Indeks Demokrasi ${selectedRegion.value.name}`,
        data: allData.demokrasi[selectedRegion.value.key],
        borderColor: "#156082",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        borderWidth: 8,
        pointStyle: "rectRot",
        pointRadius: 5,
      },
      {
        label: "Aspek Kebebasan Sipil / Aspek Kebebasan",
        data: allData.sipil[selectedRegion.value.key],
        borderColor: "#e97132",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Aspek Hak-Hak Politik / Aspek Keseteraan",
        data: allData.politik[selectedRegion.value.key],
        borderColor: "#196b24",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Aspek Lembaga Demokrasi / Aspek Kapasitas Lembaga Demokrasi",
        data: allData.lembaga[selectedRegion.value.key],
        borderColor: "#0f9ed5",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
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
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset, i) => {
              return {
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.borderColor,
                lineWidth: 3, // << di sini kita paksa border legend tetap tipis
                hidden: !chart.isDatasetVisible(i),
                datasetIndex: i,
                fontColor: textColor,
                fill: true,
              };
            });
          },
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

watch(selectedRegion, () => {
  chartData.value = setChartData();
});

const barChartData = ref();
const barChartOptions = ref();

const selectedData = (idx) => {
  const rawData = [
    { label: "ACEH", value: 0 },
    { label: "SUMATERA UTARA", value: 0 },
    { label: "SUMATERA BARAT", value: 0 },
    { label: "RIAU", value: 0 },
    { label: "JAMBI", value: 0 },
    { label: "SUMATERA SELATAN", value: 0 },
    { label: "BENGKULU", value: 0 },
    { label: "LAMPUNG", value: 0 },
    { label: "KEP. BANGKA BELITUNG", value: 0 },
    { label: "KEP. RIAU", value: 0 },
    { label: "DKI JAKARTA", value: 0 },
    { label: "JAWA BARAT", value: 0 },
    { label: "JAWA TENGAH", value: 0 },
    { label: "DI YOGYAKARTA", value: 0 },
    { label: "JAWA TIMUR", value: 0 },
    { label: "BANTEN", value: 0 },
    { label: "BALI", value: 0 },
    { label: "NUSA TENGGARA BARAT", value: 0 },
    { label: "NUSA TENGGARA TIMUR", value: 0 },
    { label: "KALIMANTAN BARAT", value: 0 },
    { label: "KALIMANTAN TENGAH", value: 0 },
    { label: "KALIMANTAN SELATAN", value: 0 },
    { label: "KALIMANTAN TIMUR", value: 0 },
    { label: "KALIMANTAN UTARA", value: 0 },
    { label: "SULAWESI UTARA", value: 0 },
    { label: "SULAWESI TENGAH", value: 0 },
    { label: "SULAWESI SELATAN", value: 0 },
    { label: "SULAWESI TENGGARA", value: 0 },
    { label: "GORONTALO", value: 0 },
    { label: "SULAWESI BARAT", value: 0 },
    { label: "MALUKU", value: 0 },
    { label: "MALUKU UTARA", value: 0 },
    { label: "PAPUA BARAT", value: 0 },
    { label: "PAPUA BARAT DAYA", value: 0 },
    { label: "PAPUA", value: 0 },
    { label: "PAPUA SELATAN", value: 0 },
    { label: "PAPUA TENGAH", value: 0 },
    { label: "PAPUA PEGUNUNGAN", value: 0 },
    { label: "INDONESIA", value: 0 },
  ];

  let i = 0;
  for (const provinsi in allData[selectedAspect.value.key]) {
    rawData[i].value = allData[selectedAspect.value.key][provinsi][idx];
    i++;
  }

  return rawData;
};

const setbarChartData = () => {
  // 1. Sort ascending berdasarkan value
  const sorted = selectedData(selectedYear.value.idx).sort(
    (a, b) => a.value - b.value
  );

  // 2. Buat backgroundColor dan borderColor
  const backgroundColors = sorted.map((d) =>
    d.label === "INDONESIA" ? "#f1c40f" : "#156082"
  );
  const borderColors = sorted.map((d) =>
    d.label === "INDONESIA" ? "#f1c40f" : "#156082"
  );
  return {
    labels: sorted.map((d) => d.label),
    datasets: [
      {
        label: selectedAspect.value.name,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        data: sorted.map((d) => d.value),
      },
    ],
  };
};

const setbarChartOptions = () => {
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

watch([selectedYear, selectedAspect], () => {
  barChartData.value = setbarChartData();
});

const visible = ref(false);
const selectedGrafik = ref(null);

const cards = ref(
  Object.values(allIndikator).map((grafik) => {
    const pusat = grafik.pusat;
    const provinsi = grafik.provinsi;

    const pusatNow = pusat ? pusat[pusat.length - 1] : null;
    const pusatPrev =
      pusat && pusat.length > 1 ? pusat[pusat.length - 2] : null;

    const provNow = provinsi ? provinsi[provinsi.length - 1] : null;
    const provPrev =
      provinsi && provinsi.length > 1 ? provinsi[provinsi.length - 2] : null;

    return {
      title: grafik.label,
      pusat: pusatNow,
      provinsi: provNow,
      fullData: grafik,
      icon: grafik.icon,
      isUpPusat:
        pusatNow !== null && pusatPrev !== null ? pusatNow > pusatPrev : null,
      isUpProv:
        provNow !== null && provPrev !== null ? provNow > provPrev : null,
      growthPusat:
        pusatNow !== null && pusatPrev !== null
          ? ((pusatNow - pusatPrev) / pusatPrev) * 100
          : null,
      growthProv:
        provNow !== null && provPrev !== null
          ? ((provNow - provPrev) / provPrev) * 100
          : null,
    };
  })
);

function openDialog(item) {
  selectedGrafik.value = item.fullData;
  chartDataIndikator.value = {
    labels: ["2021", "2022", "2023"], // bisa kamu generate dinamis juga
    datasets: [
      {
        label: "Pusat",
        data: item.fullData.pusat ?? [],
        borderColor: "#156082",
        fill: false,
      },
      {
        label: "Provinsi",
        data: item.fullData.provinsi ?? [],
        borderColor: "#e97132",
        fill: false,
      },
    ],
  };
  visible.value = true;
}

const chartDataIndikator = ref();
const chartOptionsIndikator = ref();

const setChartDataIndikator = () => {
  return {
    labels: ["2021", "2022", "2023"],
    datasets: [
      {
        label: "Pusat",
        data: [47.13, 88.51, 70.11],
        borderColor: "#156082",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Provinsi",
        data: [84, 80.63, 84.87],
        borderColor: "#e97132",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };
};

const setChartOptionsIndikator = () => {
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
</script>

<template>
  <!-- Panel Prioritas Nasional -->
  <div class="card rounded-xl shadow-md m-6 mb-6 animate-fadeIn">
    <Panel
      header="Prioritas Nasional 1"
      toggleable
      class="font-semibold"
      pt:root:class="!border-0"
    >
      <h1 class="text-xl mb-3">
        Memperkokoh Ideologi Pancasila, Demokrasi, dan Hak Asasi Manusia
      </h1>
      <p class="m-0 leading-relaxed">
        Di tengah tantangan era global, pengukuhan Pancasila sebagai fondasi
        bangsa menjadi krusial. Prinsip demokrasi menjamin partisipasi setara
        seluruh warga negara, sementara konstitusi menegaskan pentingnya
        perlindungan, penghormatan, pemenuhan, dan penegakan hak asasi manusia.
        Sinergi antara Pancasila, demokrasi, dan hak asasi manusia memastikan
        Indonesia tetap berada di jalur inklusif menuju masa depan yang lebih
        baik.
      </p>
    </Panel>
  </div>

  <!-- Card Indeks -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 px-6">
    <Card
      v-for="(item, index) in indikatorCards"
      :key="index"
      class="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl"
      pt:body:class="h-full flex flex-col justify-between"
    >
      <template #subtitle>
        <span class="text-lg font-semibold">{{ item.title }}</span>
      </template>

      <template #content class="h-full">
        <div class="flex justify-around mt-4 text-center">
          <div v-for="(val, key) in item.values" :key="key">
            <h1 class="font-medium">{{ key }}</h1>
            <p class="m-0 text-xl font-bold">{{ val }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>

  <!-- Chart Line -->
  <div class="card rounded-xl shadow-md m-6 p-6 mb-8 animate-fadeIn">
    <div class="flex justify-between mb-4">
      <Select
        v-model="selectedRegion"
        :options="regions"
        optionLabel="name"
        placeholder="Select a Region"
        class="w-full md:w-56"
      />
      <Button
        label="AI Assistant"
        severity="help"
        icon="pi pi-lightbulb"
        raised
      />
    </div>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[30rem]"
    />
    <p class="text-sm mt-2 italic">Sumber: Badan Pusat Statistik (BPS)</p>
  </div>

  <!-- Chart Bar -->
  <div class="card rounded-xl shadow-md m-6 p-6 mb-8 animate-fadeIn">
    <div class="flex flex-wrap justify-between mb-4">
      <div>
        <Select
          v-model="selectedAspect"
          :options="aspects"
          optionLabel="name"
          placeholder="Select an Aspect"
          class="w-full md:w-85"
        />
        <Select
          v-model="selectedYear"
          :options="years"
          optionLabel="name"
          placeholder="Select a Year"
          class="w-full md:w-30 ml-4"
        />
      </div>
      <Button
        label="AI Assistant"
        severity="help"
        icon="pi pi-lightbulb"
        raised
      />
    </div>
    <Chart
      type="bar"
      :data="barChartData"
      :options="barChartOptions"
      class="h-[30rem]"
    />
    <p class="text-sm mt-2 italic">Sumber: Badan Pusat Statistik (BPS)</p>
  </div>

  <!-- Cards Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-6 py-6">
    <Card
      v-for="(item, index) in cards"
      :key="index"
      @click="openDialog(item)"
      class="cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 rounded-xl"
      :class="
        (!item.pusat && item.growthProv === 0.0) ||
        (item.growthPusat === 0.0 && !item.provinsi) ||
        (item.growthPusat === 0.0 && item.growthProv === 0.0)
          ? ''
          : (item.isUpPusat && item.isUpProv) || (!item.pusat && item.isUpProv)
          ? '!bg-green-500'
          : (!item.isUpPusat && item.isUpProv) ||
            (item.isUpPusat && !item.isUpProv)
          ? '!bg-orange-500'
          : (!item.isUpPusat && !item.isUpProv) ||
            (!item.pusat && !item.isUpProv)
          ? '!bg-red-500'
          : ''
      "
      pt:body:class="h-full flex flex-col justify-between"
    >
      <template #subtitle>
        <span class="font-medium dark:text-white">{{ item.title }}</span>
      </template>
      <template #content class="h-full">
        <div class="relative flex justify-around mt-3 text-center lg:static">
          <div class="mr-10 lg:m-0">
            <h1 class="font-medium">Pusat</h1>
            <p class="m-0 text-lg font-bold">
              {{ item.pusat ?? "-" }}
            </p>
            <span class="flex justify-between items-center">
              <i
                :class="
                  !item.pusat || item.growthPusat === 0.0
                    ? 'pi pi-sort-up-fill rotate-90'
                    : item.isUpPusat
                    ? 'pi pi-sort-up-fill text-green-800'
                    : 'pi pi-sort-down-fill text-red-800'
                "
                class="mr-1"
                style="font-size: 1rem"
              ></i>
              <p
                class="m-1 font-bold"
                :class="
                  !item.pusat || item.growthPusat === 0.0
                    ? ''
                    : item.isUpPusat
                    ? 'text-green-800'
                    : 'text-red-800'
                "
              >
                {{
                  item.growthPusat !== null
                    ? item.growthPusat.toFixed(2) + "%"
                    : "-"
                }}
              </p>
            </span>
          </div>
          <div class="ml-10 lg:m-0">
            <h1 class="font-medium">Provinsi</h1>
            <p class="mr-0 text-lg font-bold">
              {{ item.provinsi ?? "-" }}
            </p>
            <span class="flex justify-between items-center">
              <i
                :class="
                  !item.provinsi || item.growthProv === 0.0
                    ? 'pi pi-sort-up-fill rotate-90'
                    : item.isUpProv
                    ? 'pi pi-sort-up-fill text-green-800'
                    : 'pi pi-sort-down-fill text-red-800'
                "
                class="ml-1"
                style="font-size: 1rem"
              ></i>
              <p
                class="m-1 font-bold"
                :class="
                  !item.provinsi || item.growthProv === 0.0
                    ? ''
                    : item.isUpProv
                    ? 'text-green-800'
                    : 'text-red-800'
                "
              >
                {{
                  item.growthProv !== null
                    ? item.growthProv.toFixed(2) + "%"
                    : "-"
                }}
              </p>
            </span>
          </div>
          <i
            :class="item.icon"
            class="absolute lg:static lg:!hidden"
            style="font-size: 2rem"
          ></i>
        </div>
      </template>
    </Card>

    <!-- Dialog Chart -->
    <Dialog
      v-model:visible="visible"
      modal
      :header="selectedGrafik?.label"
      :style="{ width: '50rem' }"
      class="rounded-xl"
    >
      <Chart
        type="line"
        :data="chartDataIndikator"
        :options="chartOptionsIndikator"
        class="h-[30rem]"
      />
    </Dialog>
  </div>
</template>

<style scoped>
/* Animasi sederhana */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
