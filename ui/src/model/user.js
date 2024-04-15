import candidateService from '@/model/candidate.js';

let _user = {
  email: '',
  id: '',
  votes: [],
};

export default {
  async login(email) {
    if (email && email.match(/.+@.+\..+/)) {
      const response = await fetch('/api/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      _user = await response.json();

      localStorage.setItem('email', email);
    } else {
      throw 'Invalid email for login';
    }
  },

  async user() {
    if (!_user.email) {
      const email = localStorage.getItem('email');
      if (email) {
        await this.login(email);
      }
    }
    return _user;
  },

  get loggedIn() {
    return _user.email !== '';
  },

  get isAdmin() {
    return this.loggedIn && _user.email === 'lsj@byu.edu';
  },

  votedFor(candidateId) {
    return this.loggedIn && _user.votes.includes(candidateId);
  },

  vote(candidateId, addVote) {
    if (this.loggedIn) {
      const prevVotedFor = _user.votes.includes(candidateId);
      if (addVote && !prevVotedFor) {
        if (_user.votes.length < 3) {
          _user.votes.push(candidateId);
          candidateService.vote(_user, candidateId, true);
        }
      } else if (!addVote && prevVotedFor) {
        _user.votes = _user.votes.filter((c) => c !== candidateId);
        candidateService.vote(_user, candidateId, false);
      }
    }
  },
};
