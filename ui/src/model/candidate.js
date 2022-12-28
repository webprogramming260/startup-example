import api from '@/api.js';

let _candidates = [];
let _onupdateCallbacks = [];

// setInterval((cb) => {
//   _vote(_candidates[3].id, true, true);
// }, 1000);

function _updateRankings() {
  const sorted = [..._candidates].sort((a, b) => b.votes - a.votes);
  sorted.forEach((c, i) => {
    c.ranking = i + 1;
    _onupdateCallbacks.forEach((cb) => cb(c));
  });
}

function _vote(user, candidateId, addVote, broadcast) {
  const candidate = _candidates.find((c) => c.id == candidateId);
  if (candidate) {
    addVote ? candidate.votes++ : candidate.votes--;

    _updateRankings();

    if (broadcast) {
      api.sendMessage({ user: user, id: candidateId, addVote: addVote });
    }
  }
}

api.onmessage((msg) => {
  _vote(msg.user, msg.id, msg.addVote, false);
});

export default {
  async candidates() {
    const response = await fetch('/api/candidate');
    const j = await response.json();
    _candidates = j.candidate;
    const sorted = [..._candidates].sort((a, b) => b.votes - a.votes);
    sorted.forEach((c, i) => {
      c.ranking = i + 1;
    });
    return _candidates;
  },

  vote(user, candidateId, addVote) {
    _vote(user, candidateId, addVote, true);
  },

  onupdate(callback) {
    _onupdateCallbacks.push(callback);
  },
};
