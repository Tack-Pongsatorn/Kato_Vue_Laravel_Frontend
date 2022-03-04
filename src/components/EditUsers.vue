<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="ชื่อ*"
                  required
                  v-model="data.fname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="นามสกุล*"
                  v-model="data.lname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="เบอร์โทรศัพท์*"
                  required
                  v-model="data.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="data.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="สิทธิ์ลุ้นรางวัล"
                  filled
                  readonly
                  v-model="data.total_point"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('closeEditUser')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="save(data)"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Axios from "../config/axios";

export default {
  props: ["show", "data"],

  methods: {
    save(data) {
      Axios.post("/api/users/edit", data).then((res) => {
        console.log("res :>> ", res);
      });
      this.$emit("closeEditUser");
    },
  },
};
</script>

<style>
</style>