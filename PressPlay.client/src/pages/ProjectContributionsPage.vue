<template>
  <div class="row">
    <div class="col-10 m-auto">
      <div class="card">
        <div class="card-header">
          <span
            class="selectable ms-3"
            data-bs-toggle="modal"
            data-bs-target="#contribution-form"
          >
            New Contribution +</span
          >
        </div>
        <div class="card-body">
          <div v-if="contributions.length > 0">
            <ContributionsCards
              v-for="c in contributions"
              :key="c.id"
              :contribution="c"
            />
          </div>
          <div v-else>
            <p>Be the first contribution</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      contributions: computed(() => AppState.contributions)
    }
  }
}
</script>

<style lang="scss" scoped>
a:after {
  background: linear-gradient(120deg, #6559ae, #ff7159, #6559ae);
  background-size: 400% 400%;
  -webkit-clip-path: polygon(
    0% 100%,
    4px 100%,
    4px 4px,
    216px 4px,
    216px 66px,
    4px 66px,
    4px 100%,
    100% 100%,
    100% 0%,
    0% 0%
  );
  -moz-animation: gradient 3s ease-in-out infinite,
    border 1s forwards ease-in-out reverse;
  -webkit-animation: gradient 3s ease-in-out infinite,
    border 1s forwards ease-in-out reverse;
  animation: gradient 3s ease-in-out infinite,
    border 1s forwards ease-in-out reverse;
}
span {
  background: linear-gradient(120deg, #6559ae, #ff7159, #6559ae);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-animation: gradient 3s ease-in-out infinite;
  -webkit-animation: gradient 3s ease-in-out infinite;
  animation: gradient 3s ease-in-out infinite;
}

/* motion */
@-moz-keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@-webkit-keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@keyframes gradient {
  0% {
    background-position: 14% 0%;
  }
  50% {
    background-position: 87% 100%;
  }
  100% {
    background-position: 14% 0%;
  }
}
@-moz-keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
@-webkit-keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
@keyframes border {
  0% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      4px 66px,
      4px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  25% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 66px,
      216px 66px,
      216px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
  50% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      216px 4px,
      100% 0%,
      0% 0%
    );
  }
  75% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 4px,
      4px 0%,
      0% 0%
    );
  }
  100% {
    -webkit-clip-path: polygon(
      0% 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      4px 100%,
      0% 100%
    );
  }
}
</style>
