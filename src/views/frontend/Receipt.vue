<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-col cols="12" align="center" justify="center">
          <v-img src="@/assets/logo.png" max-width="30%"></v-img>
        </v-col>
        <v-col align="center" justify="center">
          <h4 class="green--text">กรุณากรอกรหัสใต้ฝา 10 หลัก</h4>
        </v-col>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field
            v-model="input_1"
            label="รหัสใต้ฝา"
            outlined
            maxLength="10"
            :rules="rules"
            required
          ></v-text-field>
          <v-col align="center" justify="center">
            <v-btn
              elevation="2"
              color="green"
              class="white--text pa-5"
              rounded
              @click="example = !example"
              >ตัวอย่างรหัสใต้ฝา</v-btn
            >
          </v-col>
          <v-col v-if="example" cols="12" align="center" justify="center">
            <v-img src="@/assets/code.png" max-width="30%"></v-img>
          </v-col>
          <v-col align="center" justify="center">
            <h4 class="red--text">
              กรุณาเก็บฝาที่มีรหัสใต้ฝาตัวจริง <br />เพื่อใช้ยืนยันการรับรางวัล
            </h4>
          </v-col>
          <v-col align="center" justify="center">
            <v-btn
              elevation="2"
              color="grey"
              class="white--text pa-5 mr-4"
              rounded
              >ย้อนกลับ</v-btn
            >
            <v-btn
              :disabled="!valid"
              elevation="2"
              color="green"
              class="white--text pa-5"
              rounded
              @click="sendCode()"
              >ตกลง</v-btn
            >
          </v-col>
        </v-form>
      </v-col></v-row
    >
    <ShowAlert :show="show" :data="data" @close="closeDialog" />
  </v-container>
</template>

<script>
import ShowAlert from "@/components/showAlert";
import Axios from "../../config/axios";
export default {
  components: { ShowAlert },
  data() {
    return {
      formValid: false,
      valid: true,
      example: false,
      input_1: "",
      show: false,
      data: {},
      rules: [
        (value) => !!value || "กรุณารหัสใต้ฝา",
        (value) =>
          (value.length && value.length == 10) || "กรุณากรอกรหัสใต้ฝา 10 หลัก",
        (value) => /^[0-9]*$$/.test(value) || "รหัสใต้ฝาเป็นตัวเลขเท่านั้น",
      ],
    };
  },
  methods: {
    async sendCode() {
      if (!this.$refs.form.validate()) {
        return;
      }

      let getLocalStorage = localStorage.getItem("user");
      let parseLocalStorage = JSON.parse(getLocalStorage);
      await Axios.post("/api/inputCheck", {
        input_1: this.input_1,
        phone: parseLocalStorage.phone,
      })
        .then((res) => {
          this.data = res.data;
          this.show = true;
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    },
    closeDialog(data, status) {
      if (status === "success") {
        this.$router.push({ path: "/menu" });
      }
      this.show = data;
    },
  },
};
</script>

<style>
</style>