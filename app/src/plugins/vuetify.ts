import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#5339d7",
        },
      },
    },
  },
});
