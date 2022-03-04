<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="5">
            <v-text-field
              prepend-inner-icon="mdi-map-marker"
              dense
              label="ค้นหา"
              v-model="search"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="channelRegister"
              outlined
              dense
              :items="modeFilter"
              item-text="text"
              item-value="value"
              label="ช่องทางการลงทะเบียน"
            ></v-select>
          </v-col>

          <v-col cols="1">
            <v-btn elevation="2" @click="clear()">clear</v-btn>
          </v-col>
          <v-col cols="12" sm="8" md="11">
            <!-- :loading="loading" -->
            <v-data-table
              :headers="headers"
              :items="datas"
              :server-items-length="totalDatas"
              :options.sync="options"
              :footer-props="{
                itemsPerPageOptions: [5, 10],
              }"
            >
              <template v-slot:item.fname="props">
                <v-chip
                  color="green"
                  label
                  link
                  outlined
                  @click="editUser(props.item)"
                  >{{ props.item.fname }}</v-chip
                >
              </template>
            </v-data-table></v-col
          >
        </v-row>
      </v-col>
    </v-row>
    <EditUser
      :data="dataEditUser"
      :show="showEditUser"
      @closeEditUser="closeEditUser"
    />
  </v-container>
</template>

<script>
import Axios from "../config/axios";
import EditUser from "../components/EditUsers.vue";
export default {
  components: {
    EditUser,
  },
  data() {
    return {
      showEditUser: false,
      dataEditUser: [],
      channelRegister: "",
      search: "",
      totalDatas: 0,
      currentPage: 1,
      datas: [],
      loading: true,
      options: {},
      modeFilter: [
        { value: 1, text: "SMS" },
        { value: 2, text: "Website" },
      ],
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ชื่อ", value: "fname" },
        { text: "นามสกุล", value: "lname" },
        { text: "เบอร์โทรศัพท์", value: "phone" },
        { text: "อายุ", value: "age" },
        { text: "อีเมล", value: "email" },
        { text: "ช่องทางลงทะเบียน", value: "register_channel" },
        { text: "สิทธิ์ลุ้นรางวัล", value: "total_point" },
        { text: "วันที่ลงทะเบียน", value: "created_at" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    search: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    channelRegister() {
      this.getDataFromApi();
    },
    deep: true,
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    closeEditUser() {
      this.showEditUser = false;
      this.getDataFromApi();
    },
    editUser(data) {
      this.dataEditUser = data;
      this.showEditUser = true;
    },
    getDataFromApi() {
      const { page, itemsPerPage } = this.options;
      this.currentPage = page;
      Axios.get(
        `/api/users?page=${this.currentPage}
        &per_page=${itemsPerPage}
        &channel=${this.channelRegister}
        &search=${this.search}`
      ).then((res) => {
        let resultData = res.data.data;
        resultData.map((data) => {
          if (data["register_channel"] == 1) {
            data["register_channel"] = "SMS";
          } else {
            data["register_channel"] = "Website";
          }
        });
        this.datas = resultData;
        this.totalDatas = res.data.total;
      });
    },
    clear() {
      this.channelRegister = "";
      this.search = "";
      this.getDataFromApi();
    },
  },
};
</script>

<style>
</style>