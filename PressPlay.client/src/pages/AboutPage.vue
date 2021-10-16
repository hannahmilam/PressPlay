<template>
  <div class="about bg-white">
    <div class="row">
      <div class="overlay hidden-mobile">
        <div class="text">
          <div class="wrapper">
            <div id="L" class="letter">
              A
            </div>
          </div>
          <div class="wrapper">
            <div id="I" class="letter">
              B
            </div>
          </div>
          <div class="wrapper">
            <div id="G" class="letter">
              O
            </div>
          </div>
          <div class="wrapper">
            <div id="H" class="letter">
              U
            </div>
          </div>
          <div class="wrapper">
            <div id="T" class="letter me-5">
              T
            </div>
          </div>
          <div>
          </div>
          <div class="wrapper">
            <div id="N" class="letter ms-5">
              U
            </div>
          </div>
          <div class="wrapper">
            <div id="E" class="letter">
              S
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-between m-5">
      <div class="col-md-3 my-3">
        <h3>Jeremy Fowler</h3>
        <div class="card">
          <div class="card-header p-0 m-0">
            <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFuabiEJOCi1w/profile-displayphoto-shrink_800_800/0/1633578363008?e=1639008000&v=beta&t=ReJCaXUjRMvdiouFx-YqQ1NQqv8mmRdMBRcfq8-dS8U" class="rounded-top img-fluid" alt="">
          </div>
          <div class="card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus aliquam autem quod reprehenderit impedit aspernatur id quasi facilis, maxime quam amet placeat blanditiis.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <h3>Cam Olson</h3>
        <div class="card">
          <div class="card-header p-0 m-0">
            <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFV87LwfR3-qw/profile-displayphoto-shrink_800_800/0/1592784538938?e=1639008000&v=beta&t=v-DJ1eOozyy6Ni44FCLQ82ylp6aajEZWwUS9cWvFS7w" class="rounded-top img-fluid" alt="">
          </div>
          <div class="card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus aliquam autem quod reprehenderit impedit aspernatur id quasi facilis, maxime quam amet placeat blanditiis.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <h3>Hannah Milam</h3>
        <div class="card">
          <div class="card-header p-0 m-0">
            <img src="https://avatars.githubusercontent.com/u/87681889?v=4" class="rounded-top img-fluid" alt="">
          </div>
          <div class="card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus aliquam autem quod reprehenderit impedit aspernatur id quasi facilis, maxime quam amet placeat blanditiis.
            </p>
          </div>
        </div>
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
h3{
font-family: 'Scheherazade New', serif;
}
.overlay {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 30vh;
z-index: 100;

background: rgb(255, 255, 255);
background: linear-gradient(0deg,
rgba(255, 255, 255, 1) 75%,
rgba(255, 255, 255, 0.9) 80%,
rgba(255, 255, 255, 0.25) 95%,
rgba(255, 255, 255, 0) 100%
);
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

.wrapper {
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
.letter {
transition: ease-out 1s;
transform: translateY(40%);
}
&:hover {
.letter {
transform: translateY(-30%);
}
}
}
}

   @media only screen and (max-width: 768px) {
     .hidden-mobile {
       display: none;
     }
 }

</style>
