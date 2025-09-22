import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// primevue
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import Tooltip from "primevue/tooltip";

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
