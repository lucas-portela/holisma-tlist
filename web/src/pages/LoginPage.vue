<template>
  <div class="login-page flex flex-center bg-grey-11">
    <q-card bordered class="login-form bg-cyan-9">
      <q-card-section class="q-px-xl q-pt-xl text-white dominoes">
        <div class="text-h4">Holisma Task Manager</div>
        <div class="text-subtitle2">by Lucas Portela</div>
      </q-card-section>

      <q-card-section dark>
        <q-form @submit="submit">
          <div class="q-gutter-md">
            <q-input
              v-if="form.creatingAccount"
              class="text-white"
              filled
              v-model="form.name"
              label="Name"
              lazy-rules
              color="white"
              :rules="[(val) => (val && val.length > 0) || 'Invalid name!']"
            />
            <q-input
              class="text-white"
              filled
              v-model="form.email"
              label="E-mail"
              lazy-rules
              color="white"
              :rules="[
                (val) =>
                  (val && val.length > 0 && emailIsValid) || 'Invalid e-mail!',
              ]"
            />
            <q-input
              filled
              v-model="form.password"
              label="Password"
              hint="Password should be at least 6 characters long."
              lazy-rules
              color="white"
              type="password"
              :rules="[
                (val) => (val && val.length >= 6) || 'Invalid password!',
              ]"
            />
          </div>
          <div class="row q-gutter-md q-mt-sm">
            <q-btn
              flat
              color="dark"
              :label="form.creatingAccount ? 'Cancel' : 'Create Account'"
              @click="toggleCreateAccount"
            />
            <q-btn
              size="md"
              color="cyan-10"
              type="submit"
              :label="form.creatingAccount ? 'Create' : 'Login'"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss">
.login-page {
  min-height: 100vh;
  .login-form {
    max-width: 80vw;
  }
}
</style>

<script>
import { useUserStore } from "src/stores/user-store";
import { validateEmail } from "src/utils/validators";
import { computed, defineComponent, reactive } from "vue";
import { useQuasar } from "quasar";

import { useRouter } from "vue-router";
import { signin, signup } from "src/services/user";
import { apiErrorOrDefault } from "src/boot/axios";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const user = useUserStore();

    user.signout();

    const form = reactive({
      name: "",
      email: "",
      password: "",
      creatingAccount: false,
    });

    const emailIsValid = computed(() => validateEmail(form.email));

    const toggleCreateAccount = () => {
      form.creatingAccount = !form.creatingAccount;
      form.name = "";
    };

    const submit = async () => {
      $q.loading.show();
      try {
        if (form.creatingAccount) {
          // Create account
          await signup(form);

          $q.notify({
            type: "positive",
            message: "Your account was created succesfully!",
          });
        }

        // Do signin
        await signin(form);
        router.push("/");
      } catch (err) {
        const message = apiErrorOrDefault(
          err,
          "An error ocurred while trying to do this operation..."
        );

        console.log(err);

        $q.notify({
          type: "negative",
          message,
        });
      }
      $q.loading.hide();
    };

    return {
      user,
      form,
      emailIsValid,
      toggleCreateAccount,
      submit,
    };
  },
});
</script>
