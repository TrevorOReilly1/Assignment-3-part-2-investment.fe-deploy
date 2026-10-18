import axios from "axios";
import { useAuthStore } from "@/store/AuthStore";

// LOCAL DEVELOPMENT
// const API_URL = "http://127.0.0.1:8000";

// PRODUCTION
const API_URL = "https://toreilly.pythonanywhere.com";

export class APIService {
  constructor() {}

  getAuthHeaders() {
    const authStore = useAuthStore();

    if (!authStore.access) {
      return {};
    }

    return {
      Authorization: `JWT ${authStore.access}`,
    };
  }


  getCustomer(param_pk) {
    return axios.get(`${API_URL}/api/customers/${param_pk}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCustomerList() {
    return axios.get(`${API_URL}/api/customers/`, {
      headers: this.getAuthHeaders(),
    });
  }

  addNewCustomer(customer) {
    return axios.post(`${API_URL}/api/customers/`, customer, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCustomer(customer) {
    return axios.put(
      `${API_URL}/api/customers/${customer.pk}`,
      customer,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteCustomer(customer_pk) {
    return axios.delete(`${API_URL}/api/customers/${customer_pk}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getMyCustomerList() {
    return axios.get(`${API_URL}/api/mycustomers/`, {
      headers: this.getAuthHeaders(),
    });
  }

  getInvestment(param_pk) {
    return axios.get(`${API_URL}/api/investments/${param_pk}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getInvestmentList() {
    return axios.get(`${API_URL}/api/investments/`, {
      headers: this.getAuthHeaders(),
    });
  }

  addNewInvestment(investment) {
    return axios.post(`${API_URL}/api/investments/`, investment, {
      headers: this.getAuthHeaders(),
    });
  }

  updateInvestment(investment) {
    return axios.put(
      `${API_URL}/api/investments/${investment.pk}`,
      investment,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteInvestment(investment_pk) {
    return axios.delete(
      `${API_URL}/api/investments/${investment_pk}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getStock(stock_pk) {
    return axios.get(`${API_URL}/api/stocks/${stock_pk}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getStockList() {
    return axios.get(`${API_URL}/api/stocks/`, {
      headers: this.getAuthHeaders(),
    });
  }

  addNewStock(stock) {
    return axios.post(`${API_URL}/api/stocks/`, stock, {
      headers: this.getAuthHeaders(),
    });
  }

  updateStock(stock) {
    return axios.put(
      `${API_URL}/api/stocks/${stock.pk}`,
      stock,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteStock(stock_pk) {
    return axios.delete(`${API_URL}/api/stocks/${stock_pk}`, {
      headers: this.getAuthHeaders(),
    });
  }

  authenticateLogin(credentials) {
    return axios.post(`${API_URL}/api/`, credentials);
  }

  registerUser(credentials) {
    return axios.post(`${API_URL}/register/`, {
      ...credentials,
      customusername: credentials.username,
    });
  }

  getUser() {
    return axios.get(`${API_URL}/api/getUser/`, {
      headers: this.getAuthHeaders(),
    });
  }
}