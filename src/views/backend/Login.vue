<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="10">
        <v-card class="mx-auto my-12" max-width="400">
          <v-card-text>
            <v-row>
              <v-col align="center" justify="center">
                <div class="black--text mx-4">Log in</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-text-field
              v-model="user.email"
              class="mx-4"
              label="Email"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              class="mx-4"
              label="Password"
              type="password"
              outlined
            ></v-text-field>
            <v-col align="center" justify="center">
              <v-btn
                color="blue"
                class="white--text pa-4"
                large
                @click="login()"
                >ตกลง</v-btn
              >
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "@/config/backendAxios";
export default {
  data() {
    return {
      user: { email: null, password: null },
      formValid: false,
    };
  },
  methods: {
    async login() {
      try {
        await Axios.post("/api/login_admin", this.user).then((res) => {
          if (res.data.message == "success") {
            localStorage.setItem("admin", JSON.stringify(res.data.admin));
            localStorage.setItem("token", res.data.token);
            this.$router.push({ path: "/admin/dashboard" }).then((res) => {
              if (res) {
                window.location.reload();
              }
            });

            // window.location.href = '/#/admin/dashboard/'
          }
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style>
</style>