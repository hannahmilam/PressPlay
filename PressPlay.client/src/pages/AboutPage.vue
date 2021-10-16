<template>
  <div class="container-fluid">
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
        <div class="card" style="background-image: url('https://media-exp1.licdn.com/dms/image/C4E03AQFuabiEJOCi1w/profile-displayphoto-shrink_800_800/0/1633578363008?e=1639008000&v=beta&t=ReJCaXUjRMvdiouFx-YqQ1NQqv8mmRdMBRcfq8-dS8U')">
          <div class="card-title">
            <h3>Jeremy Fowler</h3>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quasi recusandae magni?</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card" style="background-image: url('https://media-exp1.licdn.com/dms/image/C4E03AQFV87LwfR3-qw/profile-displayphoto-shrink_800_800/0/1592784538938?e=1639008000&v=beta&t=v-DJ1eOozyy6Ni44FCLQ82ylp6aajEZWwUS9cWvFS7w')">
          <div class="card-title">
            <h3>Cam Olson</h3>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quasi recusandae magni?</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card" style="background-image: url('https://avatars.githubusercontent.com/u/87681889?v=4')">
          <div class="card-title">
            <h3>
              Hannah Milam
            </h3>
          </div>
          <div class="card-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quasi recusandae magni?</p>
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
.card{
  height: 350px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 500ms ease;
  overflow: hidden;
}
.card:hover{
  transform: scale(1.02);
}
.card-body{
padding: 1.5em;
transform: translateY(95%);
color: white;
text-shadow: 2px 2px 8px #363434;
}
.card:hover .card-body{
transform: translateY(60%);
}
h3{
text-shadow: 2px 2px 8px #242121a6;
font-family: 'Scheherazade New', serif;
color: white;
backdrop-filter: blur(10px);
padding: 15px;
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
transform: translateY(50%);
}
&:hover {
.letter {
transform: translateY(-5%);
}
}
}
}

   @media only screen and (max-width: 768px) {
     .hidden-mobile {
       display: none;
     }
 }
 .container-fluid{
   height: 100vh;
   background-color: white;
 }
</style>
