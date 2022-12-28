<template>
  <div
    :class="['candidate-card', { 'voted-for': votedFor }]"
    @click.self="changeVote"
  >
    <span :class="['ranking', { 'top-rank': ranking <= 3 }]">{{
      ranking
    }}</span>
    {{ candidateName }} ({{ votes }})<span
      ><a
        class="site-link"
        :href="candidate.url"
        target="_blank"
        rel="noopener noreferrer"
        ><img src="link.png" /></a
    ></span>
  </div>
</template>

<script>
import userService from '@/model/user.js';
import candidateService from '@/model/candidate.js';
export default {
  name: 'CandidateCard',
  props: {
    candidate: {},
  },
  created() {
    this.votedFor = userService.votedFor(this.candidate.id);
    this.candidateName = this.candidate.name;
    this.votes = this.candidate.votes;
    this.ranking = this.candidate.ranking;
    candidateService.onupdate((candidate) => {
      if (candidate.id == this.candidate.id) {
        this.votes = candidate.votes;
        this.ranking = candidate.ranking;
      }
    });
  },
  data: function () {
    return {
      votedFor: false,
      candidateName: '',
      votes: 0,
      ranking: 0,
    };
  },
  methods: {
    changeVote(e) {
      userService.vote(this.candidate.id, !this.votedFor);
      this.votedFor = userService.votedFor(this.candidate.id);
      if (this.votedFor) {
        var audio = new Audio('ding.mp3');
        audio.play();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.candidate-card {
  background: rgb(89, 88, 106);
  color: whitesmoke;
  margin: 1em 0;
  padding: 0.5em 1em;
  border-radius: 10px;
  user-select: none;
}
.voted-for {
  background: #973f82;
}

.ranking {
  padding: 0.8em;
  background: #484d67;
  /* border: 3px solid white; */
  margin: 0 1em 0 0;
}

.top-rank {
  background: #ffde69;
  color: #898787;
}

.site-link {
  color: #010101;
  background: #676a7b;
  float: right;
  text-decoration: none;
  border: black thin solid;
  padding: 0 0.2em;
}

.site-link img {
  width: 1em;
}
</style>
