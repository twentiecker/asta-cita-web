<script setup>
import { ref, onMounted, watch } from "vue";
import { allData, allIndikator } from "@/utils/data";
import ExpandableText from "@/components/ExpandableText.vue";

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
        borderWidth: 7,
        pointStyle: "rectRot",
        pointRadius: 4,
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
                fillStyle: dataset.borderColor,
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
      datalabels: {
        display: false,
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
    d.label === "INDONESIA"
      ? "#f1c40f"
      : selectedAspect.value.key === "demokrasi"
      ? "#156082"
      : selectedAspect.value.key === "sipil"
      ? "#e97132"
      : selectedAspect.value.key === "politik"
      ? "#196b24"
      : "#0f9ed5"
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
      datalabels: {
        display: false,
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
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  selectedGrafik.value = item.fullData;
  chartDataIndikator.value = {
    labels: ["2021", "2022", "2023"], // bisa kamu generate dinamis juga
    datasets: [
      {
        label: "Pusat",
        data: item.fullData.pusat ?? [],
        borderColor: "#156082",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Provinsi",
        data: item.fullData.provinsi ?? [],
        borderColor: "#e97132",
        fill: false,
        tension: 0.3,
      },
    ],
    maxVal:
      item.fullData.pusat && item.fullData.provinsi
        ? Math.max(...item.fullData.pusat, ...item.fullData.provinsi)
        : item.fullData.pusat && !item.fullData.provinsi
        ? Math.max(...item.fullData.pusat)
        : !item.fullData.pusat && item.fullData.provinsi
        ? Math.max(...item.fullData.provinsi)
        : 0,
    minVal:
      item.fullData.pusat && item.fullData.provinsi
        ? Math.min(...item.fullData.pusat, ...item.fullData.provinsi)
        : item.fullData.pusat && !item.fullData.provinsi
        ? Math.min(...item.fullData.pusat)
        : !item.fullData.pusat && item.fullData.provinsi
        ? Math.min(...item.fullData.provinsi)
        : 0,
    rangeVal:
      item.fullData.pusat &&
      item.fullData.provinsi &&
      Math.max(...item.fullData.pusat, ...item.fullData.provinsi) !==
        Math.min(...item.fullData.pusat, ...item.fullData.provinsi)
        ? (Math.max(...item.fullData.pusat, ...item.fullData.provinsi) -
            Math.min(...item.fullData.pusat, ...item.fullData.provinsi)) /
          4
        : item.fullData.pusat &&
          !item.fullData.provinsi &&
          Math.max(...item.fullData.pusat) !==
            Math.min(...item.fullData.pusat, ...item.fullData.provinsi)
        ? (Math.max(...item.fullData.pusat) -
            Math.min(...item.fullData.pusat, ...item.fullData.provinsi)) /
          4
        : !item.fullData.pusat &&
          item.fullData.provinsi &&
          Math.max(...item.fullData.provinsi) !==
            Math.min(...item.fullData.provinsi)
        ? (Math.max(...item.fullData.provinsi) -
            Math.min(...item.fullData.provinsi)) /
          4
        : 1,
  };
  chartOptionsIndikator.value = {
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
                fillStyle: dataset.borderColor,
                strokeStyle: dataset.borderColor,
                lineWidth: 1, // << di sini kita paksa border legend tetap tipis
                hidden: !chart.isDatasetVisible(i),
                datasetIndex: i,
                fontColor: textColor,
                fill: true,
              };
            });
          },
        },
        // labels: {
        //   color: textColor,
        // },
      },
      datalabels: {
        color: (context) => {
          return context.dataset.borderColor; // ikut warna garis dataset
        },
        anchor: "end", // posisinya relatif ke titik (end = atas)
        align: "end", // geser keluar ke atas
        offset: 4, // kasih jarak biar ga nabrak titik
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          display: false,
          drawBorder: true,
        },
        border: {
          display: true,
          color: surfaceBorder, // warna garis bawah
          width: 2,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        max:
          chartDataIndikator.value.maxVal + chartDataIndikator.value.rangeVal,
        min:
          chartDataIndikator.value.minVal - chartDataIndikator.value.rangeVal,
      },
    },
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
        data: [],
        borderColor: "#156082",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Provinsi",
        data: [],
        borderColor: "#e97132",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
    maxVal: 0,
    minVal: 0,
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
      datalabels: {
        color: (context) => {
          return context.dataset.borderColor; // ikut warna garis dataset
        },
        anchor: "end", // posisinya relatif ke titik (end = atas)
        align: "end", // geser keluar ke atas
        offset: 4, // kasih jarak biar ga nabrak titik
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          display: false,
          drawBorder: true,
        },
        border: {
          display: true,
          color: surfaceBorder, // warna garis bawah
          width: 2,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        max: 100,
        min: 0,
      },
    },
  };
};
</script>

<template>
  <!-- Panel Prioritas Nasional -->
  <div
    class="card rounded-xl !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)] m-6 mb-6 animate-fadeIn"
  >
    <Panel
      header="Prioritas Nasional 1"
      toggleable
      class="font-semibold"
      pt:root:class="!border-0"
    >
      <h1 class="text-xl mb-3">
        Memperkokoh Ideologi Pancasila, Demokrasi, dan Hak Asasi Manusia.
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
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 px-6">
    <Card
      v-for="(item, index) in indikatorCards"
      :key="index"
      class="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)]"
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

  <!-- Analisis IDI -->
  <div class="card p-6">
    <h1 class="text-xl mb-6 text-center font-semibold">
      Analisis Indeks Demokrasi Indonesia dan Aspek Demokrasi
    </h1>
    <ExpandableText
      summary="Penurunan Indeks Demokrasi Indonesia 2023 lebih disebabkan oleh melemahnya aspek kebebasan dan efektivitas lembaga demokrasi, bukan pada dimensi kesetaraan."
    >
      <template #details>
        <ul>
          <li class="mb-2">
            Nilai Indeks Demokrasi Indonesia nasional pada tahun 2023 sebesar
            79,51, sedikit menurun dari 2022 (80,41). Tren Indeks Demokrasi
            Indonesia menunjukkan kenaika sejak 2013, namun stagnan-fluktuatif
            dalam 5 tahun terakhir.
          </li>
          <li>
            Aspek yang berkontribusi pada penurunan Indeks Demokrasi Indonesia
            2023:
            <ul>
              <li>
                a. Aspek kebebasan turun menjadi 77,48 (dari 82,8 tahun 2022).
                Indikator yang paling memengaruhi: kebebasan pers, kebebasan
                berkeyakinan, serta hak untuk menyampaikan pendapat.
              </li>
              <li>
                b. Aspek Kapasitas Lembaga Demokrasi juga turun menjadi 76,46
                (dari 78,22 tahun 2022). Penurunan kecil tapi konsisten seiring
                dengan melemahnya kinerja legislatif.
              </li>
            </ul>
          </li>
          <li>
            c. Aspek Kesetaraan justru naik signifikan ke 83,74 (dari 80,28).
            Faktor yang mendukung diantaranya, meningkatnya partisipasi politik,
            akses keadilan melalui PTUN, dan jaminan sosial.
          </li>
        </ul>
      </template>
    </ExpandableText>
  </div>

  <!-- Chart Line -->
  <div
    class="card rounded-xl !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)] p-6 m-6 animate-fadeIn"
  >
    <h1 class="text-xl mb-6 text-center font-semibold">
      Indeks Demokrasi Indonesia dan Aspek Demokrasi
    </h1>
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
    <p class="text-sm">
      Keterangan: Sejak tahun 2021, BPS menggunakan metode baru dalam
      penghitungan Indeks Demokrasi Indonesia beserta Aspek-aspek Demokrasinya.
    </p>
  </div>

  <!-- Analisis Spasial -->
  <div class="card p-6">
    <h1 class="text-xl mb-6 text-center font-semibold">
      Analisis Spasial Indeks Demokrasi Indonesia
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <ExpandableText
        summary="Jawa & Bali memiliki capaian demokrasi paling stabil dan unggul
          dibanding wilayah lain."
      >
        <template #details
          >Demokrasi paling kuat di Indonesia, ditopang oleh kebebasan sipil
          yang tinggi, hak politik yang konsisten, dan kelembagaan demokrasi
          yang relatif stabil.
        </template>
      </ExpandableText>
      <ExpandableText
        summary="Kalimantan dan Sumatera: demokrasi cukup stabil tapi belum
          merata."
      >
        <template #details>
          Demokrasi relatif stabil, ditunjukkan oleh capaian indeks demokrasi
          yang konsisten tinggi di Kalimantan serta kekuatan hak politik di
          Sumatera Utara dan Sumatera Barat, meski beberapa provinsi seperti
          Bengkulu, Lampung, dan Sumatera Selatan masih moderat terutama pada
          aspek kebebasan sipil dan kelembagaan.
        </template>
      </ExpandableText>
      <ExpandableText
        summary="Wilayah Timur (Sulawesi, Nusa Tenggara, Maluku, Papua) menghadapi
          tantangan serius."
      >
        <template #details>
          Demokrasi berada pada level menengah hingga lemah, dengan Sulawesi
          relatif lebih baik meski bervariasi antarprovinsi, sedangkan NTB,
          Maluku, dan Papua menghadapi tantangan besar terutama dalam
          kelembagaan demokrasi dan kebebasan sipil.
        </template>
      </ExpandableText>
    </div>
  </div>

  <!-- Chart Bar -->
  <div
    class="card rounded-xl !shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)] p-6 m-6 animate-fadeIn"
  >
    <h1 class="text-xl mb-6 text-center font-semibold">
      {{ selectedAspect.name }} menurut Provinsi
    </h1>
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

  <!-- Analisis Indikator -->
  <div class="card p-6">
    <h1 class="text-xl mb-6 text-center font-semibold">
      Analisis Indikator Indeks Demokrasi Indonesia
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <ExpandableText
        summary="Tren melemah pada sebagian besar indikator demokrasi."
      >
        <template #details
          >Dari 22 indikator, sebanyak 8 indikator mengalami penurunan, 6
          meningkat, 7 menunjukkan sinyal berbeda antara pusat dan provinsi, dan
          1 stagnan. Ini merupakan sinyal pelemahan pada sebagian besar
          indikator demokrasi dan tata kelola.
        </template>
      </ExpandableText>
      <ExpandableText
        summary="Kesenjangan indikator demokrasi pusat vs provinsi."
      >
        <template #details>
          Terlihat adanya perbedaan arah tren, misalnya akses informasi publik
          meningkat di provinsi tetapi menurun di pusat.</template
        >
      </ExpandableText>
      <ExpandableText
        summary="Kemajuan pada aspek hukum dan sosial, namun tantangan besar pada
          kebebasan sipil dan politik."
      >
        <template #details
          >Peningkatan yang patut diapresiasi terdapat pada putusan PTUN dan
          jaminan sosial bagi warga miskin, karena berkaitan langsung dengan
          keadilan hukum dan perlindungan kelompok rentan. Sebaliknya, penurunan
          tajam pada kebebasan pers, kebebasan berkeyakinan, kinerja legislatif,
          birokrasi publik, serta pendidikan politik partai perlu diwaspadai
          karena berpotensi menggerus kualitas demokrasi dan partisipasi
          publik.</template
        >
      </ExpandableText>
    </div>
  </div>

  <!-- Cards Grid with Flexbox -->
  <div class="card p-6">
    <h1 class="text-xl mb-6 text-center font-semibold">
      22 Indikator Indeks Demokrasi Indonesia
    </h1>
    <div class="flex flex-wrap justify-center gap-6">
      <Card
        v-for="(item, index) in cards"
        :key="index"
        class="!shadow-[5px_5px_10px_rgba(0,0,0,0.3)] dark:!shadow-[5px_5px_10px_rgba(52,211,153,0.3)] hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 rounded-xl w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(20%-1.5rem)]"
        :class="
          (!item.pusat && item.growthProv === 0.0) ||
          (item.growthPusat === 0.0 && !item.provinsi) ||
          (item.growthPusat === 0.0 && item.growthProv === 0.0)
            ? ''
            : (item.isUpPusat && item.isUpProv) ||
              (!item.pusat && item.isUpProv)
            ? '!bg-green-300'
            : (!item.isUpPusat && item.isUpProv) ||
              (item.isUpPusat && !item.isUpProv)
            ? '!bg-orange-300'
            : (!item.isUpPusat && !item.isUpProv) ||
              (!item.pusat && !item.isUpProv)
            ? '!bg-red-300'
            : ''
        "
        pt:body:class="h-full flex flex-col justify-between"
      >
        <template #subtitle>
          <span
            class="flex justify-center text-center font-medium"
            :class="
              (!item.pusat && item.growthProv === 0.0) ||
              (item.growthPusat === 0.0 && !item.provinsi) ||
              (item.growthPusat === 0.0 && item.growthProv === 0.0)
                ? ''
                : (item.isUpPusat && item.isUpProv) ||
                  (!item.pusat && item.isUpProv) ||
                  (!item.isUpPusat && item.isUpProv) ||
                  (item.isUpPusat && !item.isUpProv) ||
                  (!item.isUpPusat && !item.isUpProv) ||
                  (!item.pusat && !item.isUpProv)
                ? 'text-black'
                : ''
            "
            >{{ item.title }}</span
          >
        </template>
        <template #content class="h-full">
          <div
            class="relative flex justify-around items-center mt-3 text-center lg:static"
          >
            <div v-if="item.pusat">
              <h1
                class="font-medium"
                :class="
                  (!item.pusat && item.growthProv === 0.0) ||
                  (item.growthPusat === 0.0 && !item.provinsi) ||
                  (item.growthPusat === 0.0 && item.growthProv === 0.0)
                    ? ''
                    : (item.isUpPusat && item.isUpProv) ||
                      (!item.pusat && item.isUpProv) ||
                      (!item.isUpPusat && item.isUpProv) ||
                      (item.isUpPusat && !item.isUpProv) ||
                      (!item.isUpPusat && !item.isUpProv) ||
                      (!item.pusat && !item.isUpProv)
                    ? 'text-black'
                    : ''
                "
              >
                Pusat
              </h1>
              <p
                class="m-0 text-lg font-bold"
                :class="
                  (!item.pusat && item.growthProv === 0.0) ||
                  (item.growthPusat === 0.0 && !item.provinsi) ||
                  (item.growthPusat === 0.0 && item.growthProv === 0.0)
                    ? ''
                    : (item.isUpPusat && item.isUpProv) ||
                      (!item.pusat && item.isUpProv) ||
                      (!item.isUpPusat && item.isUpProv) ||
                      (item.isUpPusat && !item.isUpProv) ||
                      (!item.isUpPusat && !item.isUpProv) ||
                      (!item.pusat && !item.isUpProv)
                    ? 'text-black'
                    : ''
                "
              >
                {{ item.pusat ?? "-" }}
              </p>
              <span class="flex justify-between items-center">
                <i
                  :class="
                    !item.pusat || item.growthPusat === 0.0
                      ? 'pi pi-sort-up-fill rotate-90 text-black'
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
                      ? 'text-black'
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
            <div v-if="item.provinsi">
              <h1
                class="font-medium"
                :class="
                  (!item.pusat && item.growthProv === 0.0) ||
                  (item.growthPusat === 0.0 && !item.provinsi) ||
                  (item.growthPusat === 0.0 && item.growthProv === 0.0)
                    ? ''
                    : (item.isUpPusat && item.isUpProv) ||
                      (!item.pusat && item.isUpProv) ||
                      (!item.isUpPusat && item.isUpProv) ||
                      (item.isUpPusat && !item.isUpProv) ||
                      (!item.isUpPusat && !item.isUpProv) ||
                      (!item.pusat && !item.isUpProv)
                    ? 'text-black'
                    : ''
                "
              >
                Provinsi
              </h1>
              <p
                class="mr-0 text-lg font-bold"
                :class="
                  (!item.pusat && item.growthProv === 0.0) ||
                  (item.growthPusat === 0.0 && !item.provinsi) ||
                  (item.growthPusat === 0.0 && item.growthProv === 0.0)
                    ? ''
                    : (item.isUpPusat && item.isUpProv) ||
                      (!item.pusat && item.isUpProv) ||
                      (!item.isUpPusat && item.isUpProv) ||
                      (item.isUpPusat && !item.isUpProv) ||
                      (!item.isUpPusat && !item.isUpProv) ||
                      (!item.pusat && !item.isUpProv)
                    ? 'text-black'
                    : ''
                "
              >
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
              v-if="item.pusat && item.provinsi"
              class="absolute lg:static lg:!hidden"
              :class="
                (!item.pusat && item.growthProv === 0.0) ||
                (item.growthPusat === 0.0 && !item.provinsi) ||
                (item.growthPusat === 0.0 && item.growthProv === 0.0)
                  ? item.icon
                  : (item.isUpPusat && item.isUpProv) ||
                    (!item.pusat && item.isUpProv) ||
                    (!item.isUpPusat && item.isUpProv) ||
                    (item.isUpPusat && !item.isUpProv) ||
                    (!item.isUpPusat && !item.isUpProv) ||
                    (!item.pusat && !item.isUpProv)
                  ? item.icon + ' text-black'
                  : item.icon
              "
              style="font-size: 2.5rem"
            ></i>
          </div>
          <div class="flex justify-end">
            <Button
              icon="pi pi-chart-line"
              label="Chart"
              severity="help"
              raised
              aria-label="User"
              class="mt-4"
              size="small"
              @click="openDialog(item)"
            />
          </div>
        </template>
      </Card>

      <!-- Dialog Chart -->
      <Dialog v-model:visible="visible" modal pt:mask:class="backdrop-blur-sm">
        <template #container="{ closeCallback }">
          <div class="flex justify-end pr-2 pt-2">
            <Button
              icon="pi pi-times"
              severity="danger"
              rounded
              variant="text"
              aria-label="Cancel"
              @click="closeCallback"
            />
          </div>
          <div class="flex flex-col px-12 pb-6 rounded-2xl">
            <p class="pb-6 w-[20rem] text-center font-semibold">
              {{ selectedGrafik?.label }}
            </p>
            <Chart
              type="line"
              :data="chartDataIndikator"
              :options="chartOptionsIndikator"
              class="size-[20rem]"
            />
          </div>
        </template>
      </Dialog>
    </div>
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
