<template>
  <div class="login">
    <form @submit.prevent="login">
      <fieldset>
        <legend>Email</legend>
        <input v-model="userEmail" placeholder="you@email.com" />
        <button type="submit" :disabled="!userEmail">Login</button>
        <div class="error" v-show="loginError">{{ loginError }}</div>
      </fieldset>
    </form>
    <BouncyBall />
  </div>
</template>

<script>
import router from '@/router.js';
import userService from '@/model/user.js';
import BouncyBall from '@/components/BouncyBall.vue';
export default {
  name: 'LoginView',
  components: {
    BouncyBall,
  },
  created: async function () {
    const user = await userService.user();
    this.userEmail = user.email;
  },
  data: function () {
    return {
      userEmail: '',
      loginError: '',
    };
  },
  methods: {
    async login() {
      try {
        await userService.login(this.userEmail);
        router.push('/voter');
      } catch (error) {
        this.loginError = error;
      }
    },
  },
};
</script>

<style scoped>
fieldset {
  margin: 1em;
}
button {
  display: block;
  font-size: 1.5em;
  margin: 0.5em 0;
}
input {
  font-size: 1.5em;
  width: 95%;
  color: #e48953;
  padding: 0.25em;
  margin: 0.5em 0 0 0;
}
.error {
  color: #d77c16;
}
</style>
