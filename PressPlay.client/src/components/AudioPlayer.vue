<template>
  <div v-if="currentSong.src">
    <div id="app-cover">
      <div id="player">
        <div id="player-track">
          <div id="album-name"></div>
          <div id="track-name"></div>
          <div id="track-time">
            <div id="current-time"></div>
            <div id="track-length"></div>
          </div>
          <div id="s-area">
            <div id="ins-time"></div>
            <div id="s-hover"></div>
            <div id="seek-bar"></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" class="active">
            <img :src="currentSong.albumArt" class="active" id="_1">
            <div id="buffer-box">
              Buffering ...
            </div>
          </div>
          <div id="player-controls">
            <div class="control">
              <div class="button selectable" id="play-pause-button" @click="toggleAudio">
                <i :id="'audio-play-'+currentSong.id" class="fas fa-play visually-hidden"></i>
                <i :id="'audio-pause-'+currentSong.id" class="fas fa-pause"></i>
              </div>
            </div>
            <div class="pt-4">
              <audio :id="currentSong.id" controls style="width: 25px;" :src="currentSong.src"> </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  setup() {
    watchEffect(() => {
      if (AppState.currentSong.id !== null) {
        logger.log('audio player current song', AppState.currentSong)
      }
    })
    return {
      currentSong: computed(() => AppState.currentSong),
      toggleAudio() {
        const currentSong = document.getElementById(this.currentSong.id)
        if (!currentSong) {
          return logger.log('no audio element found')
        }
        if (currentSong.paused) {
          currentSong.play()
          document.getElementById('album-art').classList.add('active')
          document.getElementById(`audio-pause-${currentSong.id}`).classList.remove('visually-hidden')
          document.getElementById(`audio-play-${currentSong.id}`).classList.add('visually-hidden')
        } else {
          currentSong.pause()
          document.getElementById('album-art').classList.remove('active')
          document.getElementById(`audio-pause-${currentSong.id}`).classList.add('visually-hidden')
          document.getElementById(`audio-play-${currentSong.id}`).classList.remove('visually-hidden')
        }
      },
      downloadMp3() {
        const currentSong = document.getElementById(this.currentSong.id)
        if (!currentSong) {
          return logger.log('no audio available for download')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
*:focus {
  outline: none;
}

body {
  margin: 0;
  background-color: #ffeff5;
}

#app-cover {
  right: 0;
  left: 0;
  width: 430px;
  height: 100px;
  margin: -4px auto;
}

#player {
  position: relative;
  height: 100%;
  z-index: 3;
}

#player-content {
  position: relative;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 30px 80px #656565;
  border-radius: 15px;
  z-index: 2;
}

#album-art {
  position: absolute;
  top: -40px;
  width: 115px;
  height: 115px;
  margin-left: 40px;
  transform: rotateZ(0);
  transition: 0.3s ease all;
  box-shadow: 0 0 0 10px #fff;
  border-radius: 50%;
  overflow: hidden;
}

#album-art.active {
  top: -60px;
  box-shadow: 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1;
}

#album-art:before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin: -10px auto 0 auto;
  background-color: #d6dee7;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px #fff;
  z-index: 2;
}

#album-art img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
}

#album-art img.active {
  opacity: 1;
  z-index: 1;
}

#album-art.active img.active {
  z-index: 1;
  animation: rotateAlbumArt 3s linear 0s infinite forwards;
}

@keyframes rotateAlbumArt {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

#player-controls {
  width: 250px;
  height: 100%;
  margin: 0 5px 0 141px;
  float: right;
  overflow: hidden;
}

.control {
  width: 33.333%;
  float: left;
  padding: 12px 0;
}

.button {

  padding: 25px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.button i {
  display: block;
  color: #3f4144;
  font-size: 26px;
  text-align: center;
}
audio{
  background: transparent;
}
</style>
