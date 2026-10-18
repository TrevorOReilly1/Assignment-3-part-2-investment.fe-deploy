<template>
  <div class="container-fluid">

    <div class="row align-items-center justify-content-center">
      <div class="col col-12 text-center">

        <blockquote>
          Welcome {{ validUserName }}!
          <footer>
            <small>
              <em>Financial Services, your Midwest Financial Services Partner.</em>
            </small>
          </footer>
        </blockquote>

      </div>

      <div class="col-12 col-md-10">

        <div
          class="alert alert-success"
          v-if="showMsg === 'new'"
        >
          New Stock has been added.
        </div>

        <div
          class="alert alert-success"
          v-else-if="showMsg === 'update'"
        >
          Stock has been updated.
        </div>

        <div
          class="alert alert-success"
          v-else-if="showMsg === 'deleted'"
        >
          Stock has been deleted.
        </div>

      </div>
    </div>

    <div class="row justify-content-center">

      <div class="col-md-10">

        <table class="table table-striped table-hover">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Shares</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="stock in Stocks"
              :key="stock.pk"
            >
              <td>{{ stock.customer }}</td>
              <td>{{ stock.symbol }}</td>
              <td>{{ stock.name }}</td>
              <td>{{ stock.shares }}</td>
              <td>${{ stock.purchase_price }}</td>
              <td>{{ stock.purchase_date }}</td>

              <td>
                <button
                  class="btn btn-sm btn-warning"
                  @click="updateStock(stock)"
                >
                  <i class="bi bi-pencil"></i>
                </button>
              </td>

              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteStock(stock)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>

            </tr>

          </tbody>

        </table>

        <div class="text-center mt-3">

          <button
            v-if="authenticated"
            class="btn btn-primary"
            @click="addNewStock"
          >
            Add New Stock
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import router from "../router";
import { APIService } from "../api/APIService";
import { useAuthStore } from "@/store/AuthStore";

const apiService = new APIService();

export default {
  name: "StockList",

  data() {
    return {
      Stocks: [],
      StockSize: 0,
      showMsg: "",
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
    this.getStocks();
    this.showMessages();
  },

  methods: {
    showMessages() {
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },

    getStocks() {
      apiService
        .getStockList()
        .then((response) => {
          this.Stocks = response.data.data;
          this.StockSize = this.Stocks.length;
        })
        .catch((error) => {
          console.log(error);

          if (error.response?.status === 401) {
            this.authStore.clearAuth();
            router.push("/auth");
          }
        });
    },

    addNewStock() {
      if (this.authenticated) {
        router.push("/stock-create");
      } else {
        router.push("/auth");
      }
    },

    updateStock(stock) {
      router.push("/stock-create/" + stock.pk);
    },

    deleteStock(stock) {
      if (confirm("Do you really want to delete this stock?")) {
        apiService
          .deleteStock(stock.pk)
          .then((response) => {
            if (response.status === 204) {
              this.getStocks();
              this.showMsg = "deleted";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
table {
  background: white;
}

button {
  border: none;
  cursor: pointer;
}
</style>