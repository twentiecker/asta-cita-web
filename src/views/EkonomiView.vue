<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { dataEkonomi } from "@/utils/ekonomi";
import GeoChart from "@/components/GeoChart.vue";

onMounted(() => {
  yearsOnly1.value = setYearsOnly1Data();
  yearQuarters1.value = setYearQuarters1Data();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartPerkapitaData.value = setChartPerkapitaData();
  chartPerkapitaOptions.value = setChartPerkapitaOptions();
  chartSogData.value = setChartSogData();
  chartSogOptions.value = setChartSogOptions();
  chartSogPengeluaranData.value = setChartSogPengeluaranData();
  chartSogPengeluaranOptions.value = setChartSogPengeluaranOptions();
  chartSpasialData.value = setChartSpasialData();
  chartSpasialOptions.value = setChartSpasialOptions();
  lineChartSogData.value = setLineChartSogData();
  lineChartSogOptions.value = setLineChartSogOptions();
});

const selectedPeriod = ref({ name: "Triwulanan", key: "triwulan" });
const periods = ref([
  { name: "Tahunan", key: "tahunan" },
  { name: "Triwulanan", key: "triwulan" },
]);

const selectedYear = ref({ name: "2024" });
const years = ref([
  { name: "2010" },
  { name: "2011" },
  { name: "2012" },
  { name: "2013" },
  { name: "2014" },
  { name: "2015" },
  { name: "2016" },
  { name: "2017" },
  { name: "2018" },
  { name: "2019" },
  { name: "2021" },
  { name: "2022" },
  { name: "2023" },
  { name: "2024" },
]);

const selectedQuarter = ref({ name: "2025Q2", idx: 61 });
const quarters = ref([]);
let idxq = 0;
for (let year = 2010; year <= 2025; year++) {
  for (let q = 1; q <= 4; q++) {
    // stop di 2025Q2
    if (year === 2025 && q > 2) break;
    quarters.value.push({
      name: `${year}Q${q}`,
      idx: idxq,
    });
    idxq++;
  }
}

const selectedValue2 = computed({
  get() {
    return selectedPeriod.value.name === "Tahunan"
      ? selectedYear.value
      : selectedQuarter.value;
  },
  set(val) {
    if (selectedPeriod.value.name === "Tahunan") {
      selectedYear.value = val;
    } else {
      selectedQuarter.value = val;
    }
  },
});

// const selectedQuarter = ref({ name: "Q1" });
// const quarters = ref([
//   { name: "Q1" },
//   { name: "Q2" },
//   { name: "Q3" },
//   { name: "Q4" },
// ]);

// akhir periode
const selectedYearOnly = ref({ name: "2024", idx: 14 });
const yearsOnly = ref([]);
let idxOnly = 0;
for (let year = 2010; year < 2025; year++) {
  // stop di 2025
  yearsOnly.value.push({
    name: `${year}`,
    idx: idxOnly,
  });
  idxOnly++;
}

const selectedYearQuarter = ref({ name: "2025Q2", idx: 61 });
const yearQuarters = ref([]);
let idx = 0;
for (let year = 2010; year <= 2025; year++) {
  for (let q = 1; q <= 4; q++) {
    // stop di 2025Q2
    if (year === 2025 && q > 2) break;
    yearQuarters.value.push({
      name: `${year}Q${q}`,
      idx: idx,
    });
    idx++;
  }
}

const selectedValue = computed({
  get() {
    return selectedPeriod.value.name === "Tahunan"
      ? selectedYearOnly.value
      : selectedYearQuarter.value;
  },
  set(val) {
    if (selectedPeriod.value.name === "Tahunan") {
      selectedYearOnly.value = val;
    } else {
      selectedYearQuarter.value = val;
    }
  },
});

// awal periode
const selectedYearOnly1 = ref({ name: "2010", idx: 0 });
const yearsOnly1 = ref([]);
const setYearsOnly1Data = () => {
  return yearsOnly.value.slice(0, selectedYearOnly.value.idx);
};
// console.log(yearsOnly1.value);

const selectedYearQuarter1 = ref({ name: "2021Q4", idx: 47 });
const yearQuarters1 = ref([]);
const setYearQuarters1Data = () => {
  return yearQuarters.value.slice(0, selectedYearQuarter.value.idx);
};
// console.log(yearQuarters1.value);

const selectedValue1 = computed({
  get() {
    return selectedPeriod.value.name === "Tahunan"
      ? selectedYearOnly1.value
      : selectedYearQuarter1.value;
  },
  set(val) {
    if (selectedPeriod.value.name === "Tahunan") {
      selectedYearOnly1.value = val;
    } else {
      selectedYearQuarter1.value = val;
    }
  },
});

watch([selectedYearOnly1, selectedYearOnly], () => {
  yearsOnly1.value = setYearsOnly1Data();
  chartData.value = setChartData();
});

watch([selectedYearQuarter1, selectedYearQuarter], () => {
  yearQuarters1.value = setYearQuarters1Data();
  chartData.value = setChartData();
});

const qtoqTriwulan = computed(() =>
  dataEkonomi.qtoq.find(
    (item) =>
      // item.tahun === selectedYear.value.name + selectedQuarter.value.name
      item.tahun === selectedQuarter.value.name
  )
);

const yonyTriwulan = computed(() =>
  dataEkonomi.yony.find(
    (item) =>
      // item.tahun === selectedYear.value.name + selectedQuarter.value.name
      item.tahun === selectedQuarter.value.name
  )
);

const ctocTriwulan = computed(() =>
  dataEkonomi.ctoc.find(
    (item) =>
      // item.tahun === selectedYear.value.name + selectedQuarter.value.name
      item.tahun === selectedQuarter.value.name
  )
);

const ctocTahunan = computed(() =>
  dataEkonomi.ctoc_tahunan.find(
    (item) => item.tahun === selectedYear.value.name
  )
);

const pdbTahunan = computed(() =>
  dataEkonomi.tahunan.find((item) => item.tahun === selectedYear.value.name)
);

const pdbTriwulan = computed(() =>
  dataEkonomi.triwulan.find(
    (item) =>
      // item.tahun === selectedYear.value.name + selectedQuarter.value.name
      item.tahun === selectedQuarter.value.name
  )
);

const perkapitaTahunan = computed(() =>
  dataEkonomi.perkapita.find((item) => item.tahun === selectedYear.value.name)
);

const growthPerkapitaTahunan = computed(() =>
  dataEkonomi.growthPerkapita.find(
    (item) => item.tahun === selectedYear.value.name
  )
);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels:
      selectedPeriod.value.name == "Tahunan"
        ? dataEkonomi[selectedPeriod.value.key]
            .map((item) => item.tahun)
            .slice(selectedYearOnly1.value.idx, selectedYearOnly.value.idx + 1)
        : dataEkonomi[selectedPeriod.value.key]
            .map((item) => item.tahun)
            .slice(
              selectedYearQuarter1.value.idx,
              selectedYearQuarter.value.idx + 1
            ),
    datasets: [
      // kalau bukan tahunan, tambahin Q-to-Q & Y-on-Y
      ...(selectedPeriod.value.key !== "tahunan"
        ? [
            {
              type: "line",
              label: "Q-to-Q (%)",
              backgroundColor: "#e97132",
              borderColor: "#e97132",
              fill: false,
              tension: 0.3,
              data: dataEkonomi.qtoq
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearQuarter1.value.idx,
                  selectedYearQuarter.value.idx + 1
                ),
              yAxisID: "y",
              datalabels: { display: false },
            },
            {
              type: "line",
              label: "Y-on-Y (%)",
              backgroundColor: "#196b24",
              borderColor: "#196b24",
              fill: false,
              tension: 0.3,
              data: dataEkonomi.yony
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearQuarter1.value.idx,
                  selectedYearQuarter.value.idx + 1
                ),
              yAxisID: "y",
              datalabels: { display: false },
            },
          ]
        : []),

      // selalu tampil (C-to-C dan Bar)
      {
        type: "line",
        label: "C-to-C (%)",
        backgroundColor: "#0f9ed5",
        borderColor: "#0f9ed5",
        fill: false,
        tension: 0.3,
        data:
          selectedPeriod.value.name === "Tahunan"
            ? dataEkonomi.ctoc_tahunan
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearOnly1.value.idx,
                  selectedYearOnly.value.idx + 1
                )
            : dataEkonomi.ctoc
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearQuarter1.value.idx,
                  selectedYearQuarter.value.idx + 1
                ),
        yAxisID: "y",
        datalabels: {
          color: (context) => context.dataset.borderColor,
          display: true,
          align: "top",
          anchor: "end",
          formatter: (value) => parseFloat(value).toFixed(2),
        },
      },
      {
        type: "bar",
        label: "PDB (Triliun Rp)",
        backgroundColor: "#156082",
        data:
          selectedPeriod.value.name === "Tahunan"
            ? dataEkonomi.tahunan
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearOnly1.value.idx,
                  selectedYearOnly.value.idx + 1
                )
            : dataEkonomi.triwulan
                .map((item) => parseFloat(item.NASIONAL).toFixed(2))
                .slice(
                  selectedYearQuarter1.value.idx,
                  selectedYearQuarter.value.idx + 1
                ),
        yAxisID: "y1",
        datalabels: { display: false },
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

watch(selectedPeriod, () => {
  chartData.value = setChartData();
});

// akhir periode perkapita
const selectedYearOnlyPerkapita = ref({ name: "2024", idx: 14 });
const yearsOnlyPerkapita = ref([]);
let idxOnlyPerkapita = 0;
for (let year = 2010; year < 2025; year++) {
  // stop di 2025
  yearsOnlyPerkapita.value.push({
    name: `${year}`,
    idx: idxOnlyPerkapita,
  });
  idxOnlyPerkapita++;
}

// const selectedValue = computed({
//   get() {
//     return selectedPeriod.value.name === "Tahunan"
//       ? selectedYearOnly.value
//       : selectedYearQuarter.value;
//   },
//   set(val) {
//     if (selectedPeriod.value.name === "Tahunan") {
//       selectedYearOnly.value = val;
//     } else {
//       selectedYearQuarter.value = val;
//     }
//   },
// });

// awal periode perkapita
const selectedYearOnly1Perkapita = ref({ name: "2010", idx: 0 });
const yearsOnly1Perkapita = ref([]);
const setYearsOnly1DataPerkapita = () => {
  return yearsOnlyPerkapita.value.slice(0, selectedYearOnlyPerkapita.value.idx);
};
// console.log(yearsOnly1.value);

// const selectedValue1 = computed({
//   get() {
//     return selectedPeriod.value.name === "Tahunan"
//       ? selectedYearOnly1.value
//       : selectedYearQuarter1.value;
//   },
//   set(val) {
//     if (selectedPeriod.value.name === "Tahunan") {
//       selectedYearOnly1.value = val;
//     } else {
//       selectedYearQuarter1.value = val;
//     }
//   },
// });

watch([selectedYearOnly1Perkapita, selectedYearOnlyPerkapita], () => {
  yearsOnly1Perkapita.value = setYearsOnly1DataPerkapita();
  chartPerkapitaData.value = setChartPerkapitaData();
});

// watch([selectedYearQuarter1, selectedYearQuarter], () => {
//   yearQuarters1.value = setYearQuarters1Data();
//   chartData.value = setChartData();
// });

const chartPerkapitaData = ref();
const chartPerkapitaOptions = ref();

const setChartPerkapitaData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: dataEkonomi.tahunan
      .map((item) => item.tahun)
      .slice(
        selectedYearOnly1Perkapita.value.idx,
        selectedYearOnlyPerkapita.value.idx + 1
      ),
    datasets: [
      {
        type: "line",
        label: "Growth (%)",
        backgroundColor: "#e97132",
        borderColor: "#e97132",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        data: dataEkonomi.growthPerkapita
          .map((item) => parseFloat(item.NASIONAL).toFixed(2))
          .slice(
            selectedYearOnly1Perkapita.value.idx,
            selectedYearOnlyPerkapita.value.idx + 1
          ),
        yAxisID: "y", // pakai sumbu persen
      },
      {
        type: "bar",
        label: "Perkapita (Rp)",
        backgroundColor: "#156082",
        data: dataEkonomi.perkapita
          .map((item) => parseFloat(item.NASIONAL).toFixed(2))
          .slice(
            selectedYearOnly1Perkapita.value.idx,
            selectedYearOnlyPerkapita.value.idx + 1
          ),
        yAxisID: "y1", // pakai sumbu nilai
      },
    ],
  };
};

const setChartPerkapitaOptions = () => {
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
          text: "Perkapita",
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
    labels: ["Triwulan 2 2024", "Triwulan 1 2025", "Triwulan 2 2025"],
    datasets: [
      {
        type: "bar",
        label: "Lainnya",
        backgroundColor: "#d9d9d9",
        data: [2.46, 2.53, 2.29],
      },
      {
        type: "bar",
        label: "Konstruksi",
        backgroundColor: "#ffe38b",
        data: [0.67, 0.22, 0.47],
      },
      {
        type: "bar",
        label: "Infokom",
        backgroundColor: "#ffc000",
        data: [0.5, 0.53, 0.53],
      },
      {
        type: "bar",
        label: "Perdagangan",
        backgroundColor: "#8acd44",
        data: [0.63, 0.66, 0.7],
      },
      {
        type: "bar",
        label: "Industri Pengolahan",
        backgroundColor: "#c00000",
        data: [0.79, 0.93, 1.13],
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
      datalabels: {
        color: "#000000",
        font: {
          weight: "bold",
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

const chartSogPengeluaranData = ref();
const chartSogPengeluaranOptions = ref();

const setChartSogPengeluaranData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["Triwulan 2 2024", "Triwulan 1 2025", "Triwulan 2 2025"],
    datasets: [
      {
        type: "bar",
        label: "Lainnya",
        backgroundColor: "#d9d9d9",
        data: [0.61, 0.95, 0.22],
      },
      {
        type: "bar",
        label: "Net Ekspor",
        backgroundColor: "#ffe38b",
        data: [0.36, 0.71, 0.22],
      },
      {
        type: "bar",
        label: "Konsumsi Pemerintah",
        backgroundColor: "#ffc000",
        data: [0.15, -0.08, -0.02],
      },
      {
        type: "bar",
        label: "PMTB",
        backgroundColor: "#8acd44",
        data: [1.31, 0.65, 2.06],
      },
      {
        type: "bar",
        label: "Konsumsi Rumah Tangga",
        backgroundColor: "#c00000",
        data: [2.62, 2.64, 2.64],
      },
    ],
  };
};
const setChartSogPengeluaranOptions = () => {
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
      datalabels: {
        color: "#000000",
        font: {
          weight: "bold",
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

const selectedIndikator = ref({ name: "Produk Domestik Bruto" });
const indikators = ref([
  { name: "Produk Domestik Bruto" },
  { name: "PDB Pengeluaran" },
  { name: "PDB Lapangan Usaha" },
]);

const selectedJenisData = ref({ name: "Q-to-Q" });
const jenisData = ref([
  { name: "Harga Berlaku" },
  { name: "Perkapita" },
  { name: "Q-to-Q" },
  { name: "Y-on-Y" },
  { name: "C-to-C" },
]);

const selectedYearOnly3 = ref({ name: "2024", idx: 14 });
const yearsOnly3 = ref([]);
let idxOnly3 = 0;
for (let year = 2010; year < 2025; year++) {
  // stop di 2024
  yearsOnly3.value.push({
    name: `${year}`,
    idx: idxOnly3,
  });
  idxOnly3++;
}

const selectedYearQuarter3 = ref({ name: "2025Q2", idx: 61 });
const yearQuarters3 = ref([]);
let idx3 = 0;
for (let year = 2010; year <= 2025; year++) {
  for (let q = 1; q <= 4; q++) {
    // stop di 2025Q2
    if (year === 2025 && q > 2) break;
    yearQuarters3.value.push({
      name: `${year}Q${q}`,
      idx: idx3,
    });
    idx3++;
  }
}

const selectedValue3 = computed({
  get() {
    return selectedPeriod.value.name === "Tahunan"
      ? selectedYearOnly3.value
      : selectedYearQuarter3.value;
  },
  set(val) {
    if (selectedPeriod.value.name === "Tahunan") {
      selectedYearOnly3.value = val;
    } else {
      selectedYearQuarter3.value = val;
    }
  },
});

/**
 * Mengambil data provinsi dari dataEkonomi berdasarkan tahun tertentu.
 * @param {Array} dataList - daftar objek dataEkonomi
 * @param {String} targetYear - contoh: "2025Q2"
 * @returns {Array} daftar provinsi dan nilainya
 */
const getProvinsiData = (dataList, targetYear) => {
  // cari data dengan tahun yang cocok
  const selectedData = dataList.find((item) => item.tahun === targetYear);
  if (!selectedData) {
    console.warn(`Data untuk tahun ${targetYear} tidak ditemukan`);
    return [];
  }

  const regions = selectedData.Regional;
  const provinsiList = [];

  for (const regionName in regions) {
    const provinsiObj = regions[regionName].provinsi;

    for (const key in provinsiObj) {
      // hapus prefix angka dan titik + ganti underscore dengan spasi
      const cleanName = key.replace(/^\d+\./, "").replace(/_/g, " ");
      provinsiList.push({
        region: regionName,
        name: cleanName,
        value: provinsiObj[key],
      });
    }
  }

  provinsiList.push({
    region: "INDONESIA",
    name: "INDONESIA",
    value: selectedData.NASIONAL,
  });

  provinsiList.sort((a, b) => a.value - b.value);
  console.log(provinsiList);

  return provinsiList;
};

const chartSpasialData = ref();
const chartSpasialOptions = ref();

const setChartSpasialData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const provinsiData = getProvinsiData(
    dataEkonomi.qtoq,
    selectedValue3.value.name
  );

  const backgroundColors = provinsiData.map((d) =>
    d.name === "INDONESIA" ? "#f1c40f" : "#156082"
  );
  const borderColors = provinsiData.map((d) =>
    d.name === "INDONESIA" ? "#f1c40f" : "#156082"
  );

  return {
    labels: provinsiData.map((p) => p.name),
    datasets: [
      {
        label: selectedIndikator.value.name,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        data: provinsiData.map((p) => parseFloat(p.value).toFixed(2)),
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
      datalabels: { display: false },
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

watch([selectedValue3], () => {
  chartSpasialData.value = setChartSpasialData();
});

const lineChartSogData = ref();
const lineChartSogOptions = ref();

const setLineChartSogData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        type: "line",
        label: "Konstruksi",
        borderColor: "#ffe38b",
        backgroundColor: "#ffe38b",
        tension: 0.3,
        data: [30, 25, 20, 40, 35, 50, 45, 30, 25, 20],
        fill: true, // <- wajib biar jadi area
      },
      {
        type: "line",
        label: "Infokom",
        borderColor: "#ffc000",
        backgroundColor: "#ffc000",
        tension: 0.3,
        data: [40, 35, 50, 30, 40, 20, 25, 50, 35, 40],
        fill: true, // <- wajib biar jadi area
      },
      {
        type: "line",
        label: "Perdagangan",
        borderColor: "#8acd44",
        backgroundColor: "#8acd44",
        tension: 0.3,
        data: [30, 40, 30, 30, 25, 30, 30, 20, 40, 40],
        fill: true, // <- wajib biar jadi area
      },
    ],
  };
};
const setLineChartSogOptions = () => {
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
      datalabels: false,
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
        min: 0,
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
          <div class="card py-6">
            <Panel header="Pertumbuhan Ekonomi Indonesia">
              <div class="flex flex-wrap gap-4 mb-6">
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedPeriod"
                    :options="periods"
                    optionLabel="name"
                    placeholder="Select a Period"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">Periode</label>
                </FloatLabel>
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedValue2"
                    :options="
                      selectedPeriod.name === 'Tahunan' ? years : quarters
                    "
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">{{
                    selectedPeriod.name === "Tahunan" ? "Tahun" : "Triwulan"
                  }}</label>
                </FloatLabel>

                <!-- <Select
                  v-if="selectedPeriod.name === 'Triwulanan'"
                  v-model="selectedQuarter"
                  :options="quarters"
                  optionLabel="name"
                  placeholder="Select a Quarter"
                  class="w-full md:w-56"
                /> -->
              </div>
              <div class="flex flex-wrap gap-4">
                <Fieldset
                  v-if="selectedPeriod.name === 'Triwulanan'"
                  legend="Q-to-Q"
                  class="flex-1 min-w-[200px]"
                >
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      {{
                        qtoqTriwulan.NASIONAL
                          ? qtoqTriwulan.NASIONAL.toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : 0
                      }}%
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
                      {{
                        yonyTriwulan.NASIONAL
                          ? yonyTriwulan.NASIONAL.toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : 0
                      }}%
                    </p>
                    <i class="pi pi-calendar" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>
                <Fieldset legend="C-to-C" class="flex-1 min-w-[200px]">
                  <div class="flex justify-between items-center">
                    <p class="m-0 text-2xl font-semibold">
                      {{
                        selectedPeriod.name === "Tahunan"
                          ? ctocTahunan.NASIONAL
                            ? ctocTahunan.NASIONAL.toLocaleString("id-ID", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : 0
                          : ctocTriwulan.NASIONAL
                          ? ctocTriwulan.NASIONAL.toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : 0
                      }}%
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
                      Rp{{
                        selectedPeriod.name === "Tahunan"
                          ? pdbTahunan.NASIONAL.toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : pdbTriwulan.NASIONAL.toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
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
                      Rp{{
                        perkapitaTahunan.NASIONAL.toLocaleString("id-ID", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <i class="pi pi-users" style="font-size: 1.5rem"></i>
                  </div>
                </Fieldset>
              </div>
            </Panel>
          </div>
          <div class="card pb-6">
            <Panel header="Tren PDB dan Pertumbuhan Ekonomi Indonesia">
              <div class="flex flex-wrap gap-4 mb-6">
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedValue1"
                    :options="
                      selectedPeriod.name === 'Tahunan'
                        ? yearsOnly1
                        : yearQuarters1
                    "
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">{{
                    selectedPeriod.name === "Tahunan"
                      ? "Tahun Awal"
                      : "Triwulan Awal"
                  }}</label>
                </FloatLabel>
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedValue"
                    :options="
                      selectedPeriod.name === 'Tahunan'
                        ? yearsOnly
                        : yearQuarters
                    "
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">{{
                    selectedPeriod.name === "Tahunan"
                      ? "Tahun Akhir"
                      : "Triwulan Akhir"
                  }}</label>
                </FloatLabel>
              </div>
              <Chart
                type="bar"
                :data="chartData"
                :options="chartOptions"
                class="h-[30rem]"
              />
            </Panel>
          </div>
          <div class="card pb-6" v-if="selectedPeriod.name === 'Tahunan'">
            <Panel header="Nilai dan Perkapita Penduduk Indonesia">
              <div class="flex flex-wrap gap-4 mb-6">
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedYearOnly1Perkapita"
                    :options="yearsOnly1"
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">Tahun Awal</label>
                </FloatLabel>
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedYearOnlyPerkapita"
                    :options="yearsOnly"
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">Tahun Akhir</label>
                </FloatLabel>
              </div>
              <Chart
                type="bar"
                :data="chartPerkapitaData"
                :options="chartPerkapitaOptions"
                class="h-[30rem]"
              />
            </Panel>
          </div>
          <div class="flex flex-col md:flex-row gap-4 pb-6">
            <div class="card flex-1">
              <Panel>
                <template #header>
                  <div class="gap-2">
                    <p class="font-bold">
                      Sumber Pertumbuhan Ekonomi Indonesia Triwulan 2 - 2025
                    </p>
                    <span class="text-red-500 italic">
                      Menurut Lapangan Usaha (y-on-y)
                    </span>
                  </div>
                </template>
                <Chart
                  type="bar"
                  :data="chartSogData"
                  :options="chartSogOptions"
                  class="h-[30rem]"
                />
              </Panel>
            </div>
            <div class="card flex-1">
              <Panel>
                <template #header>
                  <div class="gap-2">
                    <p class="font-bold">
                      Sumber Pertumbuhan Ekonomi Indonesia Triwulan 2 - 2025
                    </p>
                    <span class="text-red-500 italic">
                      Menurut Pengeluaran (y-on-y)
                    </span>
                  </div>
                </template>
                <Chart
                  type="bar"
                  :data="chartSogPengeluaranData"
                  :options="chartSogPengeluaranOptions"
                  class="h-[30rem]"
                />
              </Panel>
            </div>
          </div>
          <div class="card pb-6">
            <Panel header="Gambaran Spasial Perekonomian menurut Provinsi">
              <div class="flex flex-wrap gap-4 mb-6">
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedIndikator"
                    :options="indikators"
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">Indikator</label>
                </FloatLabel>
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedJenisData"
                    :options="jenisData"
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">Jenis Data</label>
                </FloatLabel>
                <FloatLabel class="w-full md:w-56" variant="in">
                  <Select
                    v-model="selectedValue3"
                    :options="
                      selectedPeriod.name === 'Tahunan'
                        ? yearsOnly3
                        : yearQuarters3
                    "
                    optionLabel="name"
                    placeholder="Select a Year"
                    class="w-full md:w-56"
                  />
                  <label for="on_label">{{
                    selectedPeriod.name === "Tahunan" ? "Tahun" : "Triwulan"
                  }}</label>
                </FloatLabel>
              </div>
              <Chart
                type="bar"
                :data="chartSpasialData"
                :options="chartSpasialOptions"
                class="h-[30rem]"
              />
            </Panel>
          </div>
          <div class="card pb-6">
            <Panel header="Distribusi Produk Domestik Bruto">
              <Chart
                type="line"
                :data="lineChartSogData"
                :options="lineChartSogOptions"
                class="h-[30rem]"
              />
            </Panel>
          </div>
          <div class="card pb-6">
            <Panel header="Peta Perekonomian Indonesia">
              <GeoChart />
            </Panel>
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
