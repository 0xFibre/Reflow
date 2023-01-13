<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-app-bar-nav-icon
        class="d-block d-lg-none"
        variant="text"
        @click.stop="drawer = !drawer"
      />

      <v-app-bar-title class="no-select">
        <h3>Reflow</h3>
      </v-app-bar-title>

      <v-spacer />

      <v-btn variant="text">Go to dashboard</v-btn>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>

  <v-container>
    <v-sheet class="mt-12">
      <v-row>
        <v-col cols="12" sm="6">
          <h3 class="text-h3 mb-3 font-weight-bold fonted">
            Real-time value streaming protocol on Sui
          </h3>
          <p class="my-2 text-subtitle-1 fonted">
            Reflow is a Sui based value streaming protocol unlocking a variety
            of financial possibilities for DAOs and crypto-native businesses.
          </p>

          <div class="my-10">
            <v-btn flat variant="flat" color="primary" to="/dashboard">
              Start Streaming
            </v-btn>
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

    <h5 class="text-h5 mt-10 font-weight-bold fonted">Why Reflow?</h5>

    <v-row class="mt-5">
      <template v-for="(data, i) in sect" :key="i">
        <v-col class="my-0" cols="12" sm="6">
          <div class="d-flex">
            <v-avatar variant="tonal" color="secondary" class="me-3">
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

    <h5 class="text-h5 mt-10 font-weight-bold fonted">Build on Reflow</h5>

    <v-sheet class="mt-5">
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
              target="_blank"
              :href="resource.url"
              class="me-2"
              :disabled="resource.disabled"
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

  <v-sheet class="pt-3 mt-5" color="secondary">
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
import { ref, Ref } from "vue";

const drawer: Ref<boolean | null> = ref(null);
const items = [
  {
    title: "Foo",
    value: "foo",
  },
  {
    title: "Bar",
    value: "bar",
  },
  {
    title: "Fizz",
    value: "fizz",
  },
  {
    title: "Buzz",
    value: "buzz",
  },
];

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
    disabled: true,
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
  font-family: Circular !important;
}

ul {
  list-style: none;
}
</style>
