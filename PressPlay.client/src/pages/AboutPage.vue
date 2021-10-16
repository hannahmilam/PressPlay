<template>
  <div class="container-fluid">
    <div class="row">
      <div class="overlay hidden-mobile">
        <div class="text">
          <div class="letter-wrapper">
            <div id="L" class="letter">
              A
            </div>
          </div>
          <div class="letter-wrapper">
            <div id="I" class="letter">
              B
            </div>
          </div>
          <div class="letter-wrapper">
            <div id="G" class="letter">
              O
            </div>
          </div>
          <div class="letter-wrapper">
            <div id="H" class="letter">
              U
            </div>
          </div>
          <div class="letter-wrapper">
            <div id="T" class="letter me-5">
              T
            </div>
          </div>
          <div>
          </div>
          <div class="letter-wrapper">
            <div id="N" class="letter ms-5">
              U
            </div>
          </div>
          <div class="letter-wrapper">
            <div id="E" class="letter">
              S
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card-wrapper">
          <div class="profile-card js-profile-card">
            <div class="profile-card__img">
              <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFuabiEJOCi1w/profile-displayphoto-shrink_400_400/0/1633578363008?e=1639612800&v=beta&t=8CJ38QYABEWdo4lCrPPTt3gPtgHsRdwGEqk2PvnLsTQ" alt="profile card">
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">
                Jeremy Fowler
              </div>
              <div class="profile-card__txt">
                Full Stack Developer
              </div>

              <a href="https://github.com/Jeremy-Fowler" class="profile-card-social__item github" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-github"></i>
                </span>
              </a>

              <a href="https://www.linkedin.com/in/jeremy-b-fowler/" class="profile-card-social__item linkedin" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-linkedin"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <svg hidden="hidden">
          <defs>
            <symbol id="icon-github" viewBox="0 0 32 32">
              <title>github</title>
            </symbol>
          </defs>
        </svg>
      </div>
      <div class="col-4">
        <div class="card-wrapper">
          <div class="profile-card js-profile-card">
            <div class="profile-card__img">
              <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFV87LwfR3-qw/profile-displayphoto-shrink_800_800/0/1592784538938?e=1639008000&v=beta&t=v-DJ1eOozyy6Ni44FCLQ82ylp6aajEZWwUS9cWvFS7w" alt="profile card">
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">
                Cam Olson
              </div>
              <div class="profile-card__txt">
                Full Stack Developer
              </div>

              <a href="https://github.com/CameronOlson" class="profile-card-social__item github" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-github"></i>
                </span>
              </a>

              <a href="https://www.linkedin.com/in/cameronsolson/" class="profile-card-social__item linkedin" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-linkedin"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <svg hidden="hidden">
          <defs>
            <symbol id="icon-github" viewBox="0 0 32 32">
              <title>github</title>
            </symbol>
          </defs>
        </svg>
      </div>
      <div class="col-4">
        <div class="card-wrapper">
          <div class="profile-card js-profile-card">
            <div class="profile-card__img">
              <img src="https://avatars.githubusercontent.com/u/87681889?v=4" alt="profile card">
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">
                Hannah Milam
              </div>
              <div class="profile-card__txt">
                Full Stack Developer
              </div>

              <a href="https://github.com/hannahmilam" class="profile-card-social__item github" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-github"></i>
                </span>
              </a>

              <a href="https://www.linkedin.com/in/hannah-milam/" class="profile-card-social__item linkedin" target="_blank">
                <span class="icon-font">
                  <i class="fab fa-linkedin"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <svg hidden="hidden">
          <defs>
            <symbol id="icon-github" viewBox="0 0 32 32">
              <title>github</title>
            </symbol>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped lang="scss">

html {
  position: relative;
  overflow-x: hidden!important;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Scheherazade New', serif;
  color: #324e63;
}

a, a:hover {
  text-decoration: none;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.card-wrapper {
  width: 100%;
  width: 100%;
  height: auto;
  padding: 50px 20px;
  padding-top: 100px;
  margin-top: 50px;
  display: flex;
  background-image: url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60');
  background-size: cover;
  display: flex;

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
  }

}

.profile-card {
  width: 100%;
  min-height: 300px;
  margin: auto;
  box-shadow: 0px 8px 60px -10px rgba(13,28,39,0.6);
  border-radius: 12px;
  max-width: 300px;
  position: relative;
  backdrop-filter: blur(10px);

  &.active {
    .profile-card__cnt {
      filter: blur(6px);
    }

    .profile-card-message,
    .profile-card__overlay {
      opacity: 1;
      pointer-events: auto;
      transition-delay: .1s;
    }

  }

  &__img {
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-50%);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 4;
     box-shadow: 0px 5px 50px 0px #360426, 0px 0px 0px 7px rgb(228 93 213 / 22%);

    @media screen and (max-width: 576px) {
      width: 120px;
      height: 120px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

  }

  &__cnt {
    margin-top: -35px;
    text-align: center;
    padding: 0 20px;
    padding-bottom: 40px;
    transition: all .3s;
  }

  &__name {
    font-weight: 700;
    font-size: 24px;
    color: white;
    margin-bottom: 15px;
  }

  &__txt {
    font-size: 18px;
    font-weight: 500;
    color: white;
    margin-bottom: 15px;

  }

  &-social {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    &__item {
      display: inline-flex;
      width: 55px;
      height: 55px;
      margin: 15px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: #405de6;
      box-shadow: 0px 7px 30px rgba(43,98,169,0.5);
      position: relative;
      font-size: 21px;
      flex-shrink: 0;
      transition: all .3s;

      @media screen and (max-width: 768px) {
        width: 50px;
        height: 50px;
        margin: 10px;
      }

      @media screen and (min-width: 768px){
        &:hover {
          transform: scale(1.2);
        }
      }

      &.github {
        background: linear-gradient(45deg, #0a0a0a, #242c2a);
        box-shadow: 0px 4px 30px rgba(78, 95, 81, 0.6);
      }

      &.linkedin {
        background: linear-gradient(45deg, #1347d5, #24aff0);
        box-shadow: 0px 4px 30px rgba(45, 182, 223, 0.6);
      }

    }

    &:focus {
      outline: none;
      border-color: #8a979e;
    }

  }

  &__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    background: rgba(22, 33, 72, 0.35);
    border-radius: 12px;
    transition: all .3s;
  }

}

h3{
text-shadow: 2px 2px 8px #242121a6;
font-family: 'Scheherazade New', serif;
color: white;
backdrop-filter: blur(10px);
padding: 15px;
}

.text {
font-family: 'Scheherazade New', serif;
font-size: 100px;
display: flex;
position: absolute;
bottom: 12vh;
left: 50%;
transform: translateX(-50%);
user-select: none;
color: white;

.letter-wrapper {
padding-left: 10px;
padding-right: 10px;
padding-top: 10px;
.letter {
transition: ease-out .5s;
transform: translateY(90%);
}
&:hover {
.letter {
transform: translateY(70%);
}
}
}
}

   @media only screen and (max-width: 768px) {
     .hidden-mobile {
       display: none;
     }
 }
//  .container-fluid{
//    height: 100vh;
//    background-color: white;
//  }
</style>
