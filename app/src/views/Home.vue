<template>
  <v-container>
    <v-sheet class="mt-12">
      <v-row>
        <v-col cols="12" sm="6">
          <h3 class="text-h3 font-weight-bold fonted">
            Real-time value streaming protocol on Sui
          </h3>
          <p class="my-2 text-subtitle-1 fonted">
            Reflow is a Sui based value streaming protocol unlocking a variety
            of financial possibilities for DAOs and crypto-native businesses.
          </p>

          <div class="my-10">
            <v-btn flat variant="flat" color="primary">Start Streaming</v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-inline-">
            <v-img
              width="100%"
              height="auto"
              src="/assets/hero.svg"
              alt="Hero"
            />
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <h4 class="text-h4 text-center font-weight-bold my-5 fonted">
      Why Reflow?
    </h4>

    <v-row>
      <template v-for="(data, i) in sect" :key="i">
        <v-col cols="12" sm="6">
          <div class="d-flex">
            <v-avatar variant="tonal" color="info" class="me-3">
              <v-icon :icon="data.icon" />
            </v-avatar>

            <div class="">
              <p class="mb-2">{{ data.title }}</p>
              <p>{{ data.text }}</p>
            </div>
          </div>
        </v-col>
      </template>
    </v-row>

    <h4 class="text-h4 text-center font-weight-bold mt-15 fonted">
      Build on Reflow
    </h4>

    <v-sheet class="my-5">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <p class="mb-5">
            Reflow is opensource and built with developers in mind. You can
            build and experiment any use case on top of our protocol through our
            SDKs
          </p>

          <template v-for="(resource, i) in resources" :key="i">
            <v-btn
              flat
              :color="resource.color"
              :prepend-icon="resource.icon"
              class="me-2"
            >
              {{ resource.text }}
            </v-btn>
          </template>
        </v-col>
      </v-row>

      <!-- <ul>
        <li class="my-1" v-for="use in usecases" :key="use">
          <v-icon icon="mdi-check-circle" size="20" /> {{ use }}
        </li>
      </ul> -->
    </v-sheet>
  </v-container>

  <v-sheet class="pt-3" color="secondary">
    <v-container>
      <div class="mb-5">
        <h6 class="text-h6 font-weight-bold fonted">Reflow</h6>

        <v-row>
          <v-col cols="12" sm="8" md="6">
            <p>
              Sui based value streaming protocol unlocking a variety of
              financial possibilities for DAOs and crypto-native businesses.
            </p>
          </v-col>
        </v-row>
      </div>

      <div>
        <template v-for="(social, i) in socials" :key="i">
          <v-btn
            flat
            class="pa-0 me-3"
            density="compact"
            variant="text"
            :icon="social.icon"
          />
        </template>
      </div>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
const sect = [
  {
    icon: "mdi-reload",
    title: "Payment Streaming",
    text: "Stream payments to any address based on time. You can manage your streams and Withdraw payments from the web app.",
  },
  {
    icon: "mdi-reload",
    title: "Subscriptions",
    text: "Subscriptions can be made easier through streaming.",
  },
  {
    icon: "mdi-code-tags",
    title: "Developer friendly",
    text: "Reflow is developer friendly and also opensource. This means any developer can easily build on top of our protocol",
  },
  {
    icon: "mdi-cash",
    title: "Coin Agnostic",
    text: "Reflow is token agnostic in that streaming is not limited to a particular set of coins. This means that you can stream any type of coin on Reflow without restrictions.",
  },
];

const resources = [
  {
    text: "GitHub",
    url: "https://github.com/0xFibre/Reflow",
    color: "secondary",
    icon: "mdi-github",
  },
  {
    text: "Docs",
    url: "https://docs.reflow.cash",
    color: "primary",
    icon: "mdi-file-document",
  },
];

const socials = [
  {
    url: "https://github.com/0xFibre/Reflow",
    icon: "mdi-github",
  },
  {
    url: "https://twitter.com/0xFibre",
    icon: "mdi-twitter",
  },
];

const usecases = [
  "Salary Payments",
  "Web3 Subscriptions",
  "Real-Time Donations",
  "Token Vesting",
];
</script>

<style>
.fonted {
  font-family: Nunito !important;
}

ul {
  list-style: none;
}
</style>
