<template>
  <div class="card">
    <Panel
      header="Prioritas Nasional 1: Memperkokoh Ideologi Pancasila, Demokrasi, dan Hak Asasi Manusia"
      toggleable
    >
      <p class="m-0">
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
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Card
      class="hover:shadow-lg transition-shadow"
      pt:body:class="h-full flex flex-col justify-between"
    >
      <template #subtitle>Indeks Demokrasi Indonesia</template>
      <template #content class="h-full">
        <div class="flex justify-around mt-3">
          <div>
            <h1>Baseline 2024</h1>
            <p class="m-1">79.51</p>
          </div>
          <div>
            <h1>Target 2025</h1>
            <p class="m-1">81.69 - 85.23</p>
          </div>
          <div>
            <h1>Target 2029</h1>
            <p class="m-1">83.42 - 86.98</p>
          </div>
        </div>
      </template>
    </Card>
    <Card
      class="hover:shadow-lg transition-shadow"
      pt:body:class="h-full flex flex-col justify-between"
    >
      <template #subtitle>Indeks Hak Asasi Manusia</template>
      <template #content class="h-full">
        <div class="flex justify-around mt-3">
          <div>
            <h1>Baseline 2024</h1>
            <p class="m-1">2.70</p>
          </div>
          <div>
            <h1>Target 2025</h1>
            <p class="m-1">2.75</p>
          </div>
          <div>
            <h1>Target 2029</h1>
            <p class="m-1">2.85</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <div class="card">
    <div class="card flex justify-start mb-3">
      <Select
        v-model="selectedRegion"
        :options="regions"
        optionLabel="name"
        placeholder="Select a Region"
        class="w-full md:w-56"
      />
    </div>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-[30rem]"
    />
  </div>
  <div class="card">
    <div class="card flex justify-start mb-3">
      <Select
        v-model="selectedAspect"
        :options="aspects"
        optionLabel="name"
        placeholder="Select an Aspect"
        class="w-full md:w-56"
      />
    </div>
    <div class="card flex justify-start mb-3">
      <Select
        v-model="selectedYear"
        :options="years"
        optionLabel="name"
        placeholder="Select a Year"
        class="w-full md:w-56"
      />
    </div>
    <Chart
      type="bar"
      :data="barChartData"
      :options="barChartOptions"
      class="h-[30rem]"
    />
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card
      v-for="(item, index) in cards"
      :key="index"
      @click="openDialog(item)"
      class="cursor-pointer hover:shadow-lg transition-shadow"
      pt:body:class="h-full flex flex-col justify-between"
    >
      <template #subtitle>{{ item.title }}</template>
      <template #content class="h-full">
        <p class="font-semibold">2023</p>
        <div class="flex justify-around mt-3">
          <div>
            <h1>Pusat</h1>
            <p class="m-1">{{ item.pusat ?? "-" }}</p>
          </div>
          <div>
            <h1>Provinsi</h1>
            <p class="m-1">{{ item.provinsi ?? "-" }}</p>
          </div>
        </div>
      </template>
    </Card>
    <Dialog
      v-model:visible="visible"
      modal
      :header="selectedGrafik?.label"
      :style="{ width: '45rem' }"
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

// const cards = [
//   {
//     title:
//       "Terjaminnya kebebasan berkumpul, berserikat, berekspresi, dan berpendapat oleh aparat negara",
//     pusat: 70.11,
//     provinsi: 84.87,
//   },
//   {
//     title:
//       "Terjaminnya kebebasan berkumpul, berserikat, berekspresi, dan berpendapat antar masyarakat",
//     pusat: null,
//     provinsi: 74.9,
//   },
//   {
//     title: "Terjaminnya kebebasan berkeyakinan",
//     pusat: 77.01,
//     provinsi: 82.94,
//   },
//   {
//     title:
//       "Terjaminnya kebebasan berkumpul, berserikat, berekspresi, berpendapat, dan berkeyakinan dalam setiap kebijakan",
//     pusat: 87.36,
//     provinsi: 82.88,
//   },
//   {
//     title: "Terjaminnya hak memilih dan dipilih dalam pemilu",
//     pusat: null,
//     provinsi: 82,
//   },
//   {
//     title: "Pemenuhan hak-hak pekerja",
//     pusat: null,
//     provinsi: 69.08,
//   },
//   {
//     title: "Pers yang bebas dalam menjalankan tugas dan fungsinya",
//     pusat: 61.95,
//     provinsi: 75.69,
//   },
//   {
//     title: "Kesetaraan gender",
//     pusat: 100,
//     provinsi: 92.5,
//   },
//   {
//     title:
//       "Partisipasi masyarakat dalam memengaruhi kebijakan publik melalui lembaga perwakilan",
//     pusat: 100,
//     provinsi: 86.22,
//   },
//   {
//     title: "Anti monopoli sumber daya ekonomi",
//     pusat: null,
//     provinsi: 65.15,
//   },
//   {
//     title: "Akses warga miskin pada perlindungan dan jaminan sosial",
//     pusat: null,
//     provinsi: 76.61,
//   },
//   {
//     title: "Kesetaraan kesempatan kerja antar wilayah",
//     pusat: null,
//     provinsi: 95.39,
//   },
//   {
//     title: "Akses masyarakat terhadap informasi publik",
//     pusat: 71.76,
//     provinsi: 77.75,
//   },
//   {
//     title: "Kesetaraan dalam pelayanan dasar",
//     pusat: null,
//     provinsi: 73.46,
//   },
//   {
//     title: "Kinerja lembaga legislatif",
//     pusat: 52.38,
//     provinsi: 53.92,
//   },
//   {
//     title: "Kinerja lembaga yudikatif",
//     pusat: 99.29,
//     provinsi: 86.51,
//   },
//   {
//     title: "Netralitas penyelenggara pemilu",
//     pusat: 83.33,
//     provinsi: 61.44,
//   },
//   {
//     title:
//       "Putusan Pengadilan Tata Usaha Negara (PTUN) terkait kebijakan pejabat pemerintah",
//     pusat: 57.47,
//     provinsi: 69.09,
//   },
//   {
//     title:
//       "Jaminan pemerintah terhadap pelestarian lingkungan dan ruang hidup masyarakat",
//     pusat: null,
//     provinsi: 73.36,
//   },
//   {
//     title:
//       "Transparansi anggaran dalam bentuk penyediaan informasi APBN/D oleh pemerintah",
//     pusat: 100,
//     provinsi: 94.54,
//   },
//   {
//     title: "Kinerja birokrasi dalam pelayanan publik",
//     pusat: 81.4,
//     provinsi: 72.85,
//   },
//   {
//     title: "Pendidikan politik pada kader partai politik",
//     pusat: 100,
//     provinsi: 54.02,
//   },
// ];
const cards = ref(
  Object.values(allIndikator).map((grafik) => ({
    title: grafik.label,
    pusat: grafik.pusat ? grafik.pusat[grafik.pusat.length - 1] : null,
    provinsi: grafik.provinsi
      ? grafik.provinsi[grafik.provinsi.length - 1]
      : null,
    fullData: grafik,
  }))
);

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

function openDialog(item) {
  selectedGrafik.value = item.fullData;
  chartDataIndikator.value = {
    labels: ["2021", "2022", "2023"], // bisa kamu generate dinamis juga
    datasets: [
      {
        label: `${item.fullData.label} - Pusat`,
        data: item.fullData.pusat ?? [],
        borderColor: "#156082",
        fill: false,
      },
      {
        label: `${item.fullData.label} - Provinsi`,
        data: item.fullData.provinsi ?? [],
        borderColor: "#e97132",
        fill: false,
      },
    ],
  };
  visible.value = true;
}
</script>
