<template>
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col align-items-center">

        <div class="row align-items-center justify-content-center">
          <div class="col col-12 col-sm-10 col-md-10 col-lg-6">
            <div
              class="alert alert-danger shadow"
              role="alert"
              v-if="showMsg === 'error'"
            >
              Please verify Stock Information
            </div>
          </div>
        </div>

        <div class="row align-items-center justify-content-center">
          <div
            class="col col-12 col-sm-10 col-md-10 col-lg-6 align-items-center"
          >
            <div class="card">
              <div class="card-header">
                {{ pageTitle }}
              </div>

              <div class="card-body">
                <form>

                  <div class="container-fluid">


                    <div class="row justify-content-around py-2">
                      <label class="col-4">Customer</label>
                      <div class="col col-8">
                        <select
                          v-model="stock.customer"
                          class="form-select"
                        >
                          <option
                            v-for="item in customers"
                            :key="item.pk"
                            :value="item.pk"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>


                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Symbol</label>
                      <div class="col col-8">
                        <input
                          v-model="stock.symbol"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>


                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Stock Name</label>
                      <div class="col col-8">
                        <input
                          v-model="stock.name"
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>


                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Number of Shares</label>
                      <div class="col col-8">
                        <input
                          v-model="stock.shares"
                          type="number"
                          step="0.1"
                          class="form-control"
                        />
                      </div>
                    </div>


                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Purchase Price</label>
                      <div class="col col-8">
                        <input
                          v-model="stock.purchase_price"
                          type="number"
                          step="0.01"
                          class="form-control"
                        />
                      </div>
                    </div>


                    <div class="form-group row justify-content-around py-2">
                      <label class="col-4">Purchase Date</label>
                      <div class="col col-8">
                        <input
                          v-model="stock.purchase_date"
                          type="date"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="row justify-content-around mt-4">

                      <button
                        v-if="!isUpdate"
                        type="button"
                        class="btn btn-primary col-4"
                        @click="createStock"
                      >
                        Save
                      </button>

                      <button
                        v-if="isUpdate"
                        type="button"
                        class="btn btn-primary col-4"
                        @click="updateStock"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        class="btn btn-secondary col-4"
                        @click="cancelOperation"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                </form>
              </div>

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

const apiService = new APIService();

export default {
  name: "StockCreate",

  data() {
    return {
      customers: [],
      stock: {
        customer: "",
        symbol: "",
        name: "",
        shares: "",
        purchase_price: "",
        purchase_date: "",
      },
      pageTitle: "Add New Stock",
      isUpdate: false,
      showMsg: "",
    };
  },

  computed: {
    authStore() {
      return useAuthStore();
    },
  },

  methods: {
    getCustomers() {
      apiService
        .getCustomerList()
        .then((response) => {
          this.customers = response.data.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            router.push("/auth");
          }
        });
    },

    createStock() {
      console.log("Sending Stock:", this.stock);

      apiService
        .addNewStock(this.stock)
        .then((response) => {
          if (response.status === 201) {
            router.push("/stock-list");
          }
        })
        .catch((error) => {
          console.log(error.response?.data);
          this.showMsg = "error";
        });
    },

    updateStock() {
      apiService
        .updateStock(this.stock)
        .then((response) => {
          if (response.status === 200) {
            router.push("/stock-list");
          }
        })
        .catch((error) => {
          console.log(error.response?.data);
          this.showMsg = "error";
        });
    },

    cancelOperation() {
      router.push("/stock-list");
    },
  },

  mounted() {
    this.getCustomers();

    if (this.$route.params.pk) {
      this.pageTitle = "Edit Stock";
      this.isUpdate = true;

      apiService
        .getStock(this.$route.params.pk)
        .then((response) => {
          this.stock = response.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
    }
  },
};
</script>

<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>