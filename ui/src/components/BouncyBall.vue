<template>
  <div class="bouncing-ball">
    <div id="ball"></div>
    <div id="ground">
      <div id="source">
        <a href="https://github.com/webprogramming260/startup-example"
          >GitHub</a
        >
      </div>
    </div>
    <div id="shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'BouncyBall',
};
</script>

<style scoped>
.bouncing-ball {
  position: absolute;
  top: calc(100vh - 200px);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
}

#ground {
  position: absolute;
  background: radial-gradient(#656565, #272727);
  top: 75%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
}

#ground #source {
  display: flex;
  align-items: center;
  margin-right: 1em;
  justify-content: right;
  height: 100%;
  z-index: -2;
}

#ground #source a {
  text-decoration: none;
  color: darkgray;
  z-index: 100;
}

#shadow {
  position: absolute;
  top: 85%;
  left: 50%;
  margin-left: -1em;
  width: 2em;
  height: 1em;
  background: #333;
  border-radius: 50%;
  animation: pulse 0.5s infinite alternate;
  z-index: -2;
}

@keyframes pulse {
  0% {
    width: 2em;
    margin-left: -1em;
  }
  75% {
    width: 2.5em;
    margin-left: -1.25em;
  }
  100% {
    width: 3em;
    margin-left: -1.5em;
  }
}

#ball {
  position: relative;
  background: linear-gradient(#b10000, 50%, #520000);
  top: 3em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin: 0 auto;
  z-index: -1;
  animation: bounce 0.5s cubic-bezier(0.63, 0.09, 0.75, 0.46) infinite alternate;
}

@keyframes bounce {
  0%,
  10% {
    top: 15%;
    height: 3em;
    width: 3em;
  }
  15% {
    height: 3.15em;
    width: 2.9em;
  }
  35% {
    height: 4em;
    width: 2.5em;
  }
  75% {
    height: 4em;
    width: 2.5em;
  }
  95% {
    height: 2em;
    width: 3.5em;
  }
  100% {
    top: 85%;
    height: 1em;
    width: 3em;
  }
}
</style>
