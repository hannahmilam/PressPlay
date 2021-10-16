<template>
  <div class="container-fluid bg-img">
    <div class="container">
      <div class="row pt-3">
        <h5 class="txt">
          Edit Your Profile
        </h5>
      </div>
      <div class="row justify-content-center" v-if="account">
        <div class="card p-3">
          <div class="row">
            <div class="col-6">
              <form @submit.prevent="updateAccount()">
                <p class="m-0 p-0">
                  <small class="m-0 small-0"><em>Add/Edit Your Name</em></small>
                </p>
                <input type="text" class="form-control" v-model="editable.name" placeholder="Name">
                <br />
                <p class="m-0 p-0">
                  <small><em>Add/Edit Your Profile Picture</em></small>
                </p>
                <input type="text" class="form-control" v-model="editable.picture" placeholder="Profile Picture">
                <br />
                <p class="m-0 p-0">
                  <small><em>Add/Edit Your Cover Image</em></small>
                </p>
                <input type="text" class="form-control" v-model="editable.coverImg" placeholder="Cover Image">
                <br />
                <p class="m-0 p-0">
                  <small><em>Add/Edit Your Instruments You Play</em></small>
                </p>
                <input type="text" class="form-control" v-model="editable.instrumentTags" placeholder="instrumentTags">
                <br />
                <p class="m-0 p-0">
                  <small><em> Add/Edit Your Genres You Enjoy</em></small>
                </p>
                <input type="text" class="form-control" v-model="editable.genresTags" placeholder="genreTags">
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
            <div class="col-6 text-center">
              <h3 class="txt">
                Welcome {{ account.name }}
              </h3>
              <img :src="account.picture" class="rounded-circle" alt="">
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="card">
            <HomeProjectCards v-for="p in projects" :key="p.id" :project="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
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
  box-shadow: 0 0 1rem 0 rgba(230, 224, 224, 0.747);
  display: inline-block;
  background: inherit;
  backdrop-filter: blur(10px)
}
.bg-img{
background-image: url('https://images.unsplash.com/photo-1609702839586-e9b637bb93b9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBtdXNpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60');
background-size: cover;
background-repeat: no-repeat;
color: white;
}
.txt{
  text-shadow: 2px 2px 4px #000000;
  font-family: 'Scheherazade New', serif;
}
</style>
