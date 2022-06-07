<template>
  <q-layout view="hHh lpr lFf">
    <q-header elevated class="dominoes">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Holisma Task Manager </q-toolbar-title>

        <div>v1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ user.isAuthenticated ? `${user.name} <${user.email}>` : "..." }}
        </q-item-label>

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import NavLink from "src/components/NavLink.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { recoverCredentials } from "src/services/user";

const navLinks = [
  {
    title: "Sign Out",
    caption: "End login session",
    icon: "mdi-logout-variant",
    to: "/login",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    NavLink,
  },

  setup() {
    const user = useUserStore();
    const router = useRouter();
    const drawer = ref(false);

    recoverCredentials();
    if (!user.isAuthenticated) router.push("/login");

    return {
      user,
      navLinks,
      drawer,
      toggleLeftDrawer() {
        drawer.value = !drawer.value;
      },
    };
  },
});
</script>
