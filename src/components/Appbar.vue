<template>
  <v-app-bar id="app-bar" app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value"> mdi-view-quilt </v-icon>
      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>
    <v-spacer />
    <v-menu transition="scroll-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="ma-2 ml-2" min-width="0" v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link>
          <v-list-item-title
            v-text="'Logout '"
            @click="logout()"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Axios from "../config/axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({}),

  computed: {
    ...mapState(["drawer"]),
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    logout() {
      let keysToRemove = ["admin", "token"];
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      Axios.post("/api/logout").then((res) => {
        console.log("res :>> ", res);
      });
      this.$router.push({ path: "/admin/login" });
    },
  },
};
</script>
