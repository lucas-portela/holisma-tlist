import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("counter", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    token: null,
  }),
  getters: {
    isAuthenticated() {
      return this.token != null;
    },
  },
  actions: {
    recover() {
      const credentials = localStorage.getItem("auth");
      if (credentials) {
        this.signout();
        this.signin(JSON.parse(credentials));
      }
    },
    signin(credentials) {
      localStorage.setItem("auth", JSON.stringify(credentials));
      this.id = credentials.id;
      this.name = credentials.name;
      this.email = credentials.email;
      this.token = credentials.token;
    },
    signout() {
      this.id = null;
      this.name = null;
      this.email = null;
      this.token = null;
      localStorage.removeItem("auth");
    },
  },
});
