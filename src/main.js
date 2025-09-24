import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// primevue
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

// chart js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true,
});

app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("tooltip", Tooltip);

app.mount("#app");
