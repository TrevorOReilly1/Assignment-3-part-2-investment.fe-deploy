<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-12 align-items-center justify-content-center">
        <blockquote>
          Welcome {{ validUserName }}!
          <footer>
            <small>
              <em>Financial Services, your Midwest Financial Services Partner.</em>
            </small>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col col-12 col-sm-10 col-md-10">

        <div class="card-group">

          <div class="card">
            <img
              :src="customerImg"
              class="card-img-top"
              style="height: 15rem"
            />

            <div class="card-body">
              <h5 class="card-title">Customers</h5>

              <button
                @click="viewCustomers"
                class="btn btn-primary"
              >
                Show Customers
              </button>
            </div>
          </div>

          <div class="card">
            <img
              :src="investmentImg"
              class="card-img-top"
              style="height: 15rem"
            />

            <div class="card-body">
              <h5 class="card-title">Investments</h5>

              <button
                @click="viewInvestments"
                class="btn btn-primary"
              >
                Show Investments
              </button>
            </div>
          </div>

          <div class="card">
            <img
              :src="stockImg"
              class="card-img-top"
              style="height: 15rem"
            />

            <div class="card-body">
              <h5 class="card-title">Stocks</h5>

              <button
                @click="viewStocks"
                class="btn btn-primary"
              >
                Show Stocks
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import { APIService } from "../api/APIService";
import { useAuthStore } from "@/store/AuthStore";

import customerImg from "@/assets/customer.jpg";
import investmentImg from "@/assets/nonstock.jpg";
import stockImg from "@/assets/stocks.jpg";

const apiService = new APIService();

export default {
  name: "Home",

  data() {
    return {
      customerImg,
      investmentImg,
      stockImg,
      showMsg: "",
      user: null,
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },

    authenticated() {
      return this.authStore.isAuthenticated;
    },

    validUserName() {
      return this.authStore.user || "Guest";
    },
  },

  mounted() {
    if (this.authenticated) {
      this.getUserInfo();
    }
  },

  methods: {
    getUserInfo() {
      apiService
        .getUser()
        .then((response) => {
          this.user = response.data;
        })
        .catch(() => {
          this.showMsg = "axiosError";
          this.authStore.clearAuth();
          router.push("/auth");
        });
    },

    viewCustomers() {
      router.push("/customer-list");
    },

    viewInvestments() {
      router.push("/investment-list");
    },

    viewStocks() {
      router.push("/stock-list");
    },
  },
};
</script>

<style scoped>
.card {
  margin: 10px;
}

.card img {
  object-fit: cover;
}

blockquote {
  text-align: center;
  margin-top: 20px;
}
</style>