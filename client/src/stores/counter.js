import { defineStore } from "pinia";
import axios from "axios";

export const appleStore = defineStore("counter", {
  state: () => ({
    // baseUrl: "https://applu-iproject.herokuapp.com",
    baseUrl: "http://localhost:3000",
    isLogin: false,
    email: "",
    password: "",
    iPhone: "",
    color: "Gold",
    capacity: "128GB",
    iPhoneId: 0,
    myOrder: [],
    oneIphone: '',
    styleCapacity: false,
    styleColor: false
  }),

  getters: {},
  actions: {
    changePage(page) {
      this.router.push(`/${page}`);
      this.styleCapacity = false
      this.styleColor = false
    },
    holdButton(state) {
      if (!state) {
        this.styleCapacity = true
      } else {
        this.styleColor = true
      }
    },
    generateRandomPassword() {
      axios({
        method: "GET",
        url: "https://passwordinator.herokuapp.com"
      })
      .then(data => {
        this.password = data.data.data
        console.log(this.password)
      })
      .catch((err) => {
        Swal.fire({
          title: `ERROR`,
          text: `${err.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    },
    login() {
      axios({
        method: "POST",
        url: this.baseUrl + "/login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((data) => {
          localStorage.setItem("access_token", data.data.access_token);
          this.changePage("");
          this.isLogin = true;
        })
        .catch((err) => {
          Swal.fire({
            title: `ERROR`,
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    logOut() {
      Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6e7881",
        confirmButtonText: "Yes",
      })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear(), (this.isLogin = false);
            this.changePage("");
          }
        })
        .catch((err) => {
          Swal.fire({
            title: `ERROR`,
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    fetchIphone() {
      axios({
        method: "GET",
        url: this.baseUrl + "/iPhone",
      })
        .then((data) => {
          this.iPhone = data.data;
          console.log(data);
        })
        .catch((err) => {
          Swal.fire({
            title: `ERROR`,
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    changePageToOrder() {
      if (!this.isLogin) {
        Swal.fire({
          title: "You need to login first!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4c93db",
          cancelButtonColor: "#6e7881",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            this.changePage("login");
          }
        });
      } else {
        this.changePage("order");
      }
    },
    changeColor(color) {
      this.color = color;
    },
    changeCapacity(capacity) {
      this.capacity = capacity;
    },
    addOrder() {
      axios({
        method: "POST",
        url: this.baseUrl + `/order/${this.iPhoneId}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: {
          color: this.color,
          capacity: this.capacity,
        },
      })
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Order Success`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.changePage("myOrder");
          this.fetchMyOrder();
        })
        .catch((err) => {
          Swal.fire({
            title: `ERROR`,
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    getIphoneId(id) {
      this.iPhoneId = id;
    },
    fetchMyOrder() {
      axios({
        method: "GET",
        url: this.baseUrl + "/order",
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((data) => {
          this.myOrder = data.data;
          console.log(data);
        })
        .catch((err) => {
          Swal.fire({
            title: `ERROR`,
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    cancelOrder(id) {
      Swal.fire({
        title: "Are you sure you want cancel this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6e7881",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: this.baseUrl + `/order/${id}`,
            headers: { access_token: localStorage.getItem("access_token") },
          })
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Success Cancelled Your Rrder`,
                showConfirmButton: false,
                timer: 1500,
              });
              this.changePage("myOrder");
              this.fetchMyOrder();
            })
            .catch((err) => {
              Swal.fire({
                title: `ERROR`,
                text: `${err.message}`,
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }
      });
    },
    register() {
      axios({
        method: "POST",
        url: this.baseUrl + "/register",
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Register Success`,
          confirmButtonText: "OK",
          text: 'you can check your email'
        });
        this.email = ""
        this.password = ""
      })
      .catch((err) => {
        Swal.fire({
          title: `ERROR`,
          text: `${err.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    },
    getOneIphone(id) {
      axios({
        method: "GET",
        url: this.baseUrl + `/iPhone/${id}`
      })
      .then(data => {
        this.oneIphone = data.data
        console.log(this.oneIphone, '<<<<<')
      })
      .catch((err) => {
        Swal.fire({
          title: `ERROR`,
          text: `${err.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
    },
  },
});
