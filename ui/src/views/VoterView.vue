<template>
  <div class="home">
    <div class="candidates">
      <ul>
        <li v-for="candidate in candidates" v-bind:key="candidate.url">
          <CandidateCard :candidate="candidate" />
        </li>
      </ul>
    </div>
    <BouncyBall />
  </div>
</template>

<script>
import router from '@/router.js';
import userService from '@/model/user.js';
import candidateService from '@/model/candidate.js';
import CandidateCard from '@/components/CandidateCard.vue';
import BouncyBall from '@/components/BouncyBall.vue';

export default {
  name: 'VoterView',
  components: {
    CandidateCard,
    BouncyBall,
  },
  created: async function () {
    this.user = userService.user();
    this.candidates = await candidateService.candidates();

    if (!userService.loggedIn) {
      router.push('/');
    }
  },
  data: function () {
    return {
      user: {},
      candidates: [],
    };
  },
};
</script>

<style scoped>
.candidates {
  display: flex;
  align-items: center;
  justify-content: center;
}

ul {
  min-width: 25em;
  padding: 0;
  list-style-type: none;
}
</style>
