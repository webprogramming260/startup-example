<template>
  <div class="admin">
    <h1>Secret Admin page</h1>
  </div>
</template>

<script>
import router from '@/router.js';
import userService from '@/model/user.js';

export default {
  name: 'AdminView',
  created: async function () {
    this.user = await userService.user();
    if (!userService.isAdmin) {
      router.push('/');
    }
  },
  data: function () {
    return {
      user: {},
    };
  },
};
</script>
