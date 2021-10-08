<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded-circle" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container">
    <div class="row">
      <h5>Edit Your Profile</h5>
    </div>
    <div class="row" v-if="account">
      <div class="card p-3">
        <form @submit.prevent="updateAccount()">
          <p class="m-0 p-0">
            <small class="m-0 small-0"><em>Add/Edit Your Name</em></small>
          </p>
          <input type="text" v-model="editable.name" placeholder="Name">
          <br />
          <p class="m-0 p-0">
            <small><em>Add/Edit Your Profile Picture</em></small>
          </p>
          <input type="text" v-model="editable.picture" placeholder="Profile Picture">
          <br />
          <p class="m-0 p-0">
            <small><em>Add/Edit Your Instruments You Play</em></small>
          </p>
          <input type="text" v-model="editable.instrumentTags" placeholder="instrumentTags">
          <br />
          <p class="m-0 p-0">
            <small><em> Add/Edit Your Genres You Enjoy</em></small>
          </p>
          <input type="text" v-model="editable.genresTags" placeholder="genreTags">
          <br />
          <p class="m-0 p-0">
            <small><em>Add/Edit Your Bio</em></small>
          </p>
          <textarea v-model="editable.bio"
                    type="text"
                    class="form-control"
                    name="body"
                    id="body"
                    rows="5"
                    placeholder="About you..."
          >
          </textarea>
          <button class="btn m-1 selectable">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const account = computed(() => AppState.account)
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...account.value }
    })

    return {
      account,
      editable,
      async updateAccount() {
        try {
          editable.value.id
          await accountService.editAccount(editable.value)
          Pop.toast('Profile Updated!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.cover-img{
  height: 25vh;
  background-position: center center;
}

.profile-picture{
position: relative;
bottom: -5em;
border: solid #DAC4C7;
}

.images{
  height: 20px;
}
a{
  color: rgb(27, 26, 26);
}
.btn{
  background-color: #aba0cea1;
  backdrop-filter: blur(10px);
}
.card {
  border: 1px solid rgba(0, 0, 0, 0.041);
  border-radius: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
  display: inline-block;
}
</style>
