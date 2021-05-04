<template>
  <div id="about" class="about" >
    <vue-scroll-snap :fullscreen="true">
      
      <div class="item">
        <v-container>
          <h1 class="display-4">SOBRE NÓS</h1>
        </v-container> 
        <v-container style="margin-top:10%">
          <h1 class="overline">Somos um projeto que pretende fornecer às pessoas uma plataforma onde possam partilhar as suas memórias.</h1>
          <h1 class="overline">Partilhe connosco as suas experiências e conheça a de tantos outros!</h1>
          <h1 class="overline">Conte-nos a sua história!</h1>
        </v-container>
      </div>


      <div class="item">
        <v-container>
          <h1 class="display-4">CONHEÇA A EQUIPA</h1>
        </v-container>
        <v-container>
          <v-row align="center" justify="center">
            <TeamCard v-bind:name="'Ricardo Cunha'" v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block"></TeamCard>
            <TeamCard v-bind:name="'Luis Ramos'"    v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block; margin-left:1%"></TeamCard>
            <TeamCard v-bind:name="'Luís Vila'"     v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block; margin-left:1%"></TeamCard>
          </v-row>  
        </v-container>
      </div>

        
      <div class="item">
        <v-container>
          <h1 class="display-4">CONTACTOS</h1>
        </v-container> 
        <v-container> 
          <v-row align="center" justify="center">
            <TeamCard v-bind:name="'Onde estamos'" v-bind:description="'Braga, Portugal'" v-bind:img="'https://freepikpsd.com/wp-content/uploads/2019/10/icone-location-png-3-Transparent-Images.png'" style="display:inline-block"></TeamCard>
            <TeamCard v-bind:name="'Telefone'"     v-bind:description="'912345678'"       v-bind:img="'http://pixsector.com/cache/ed4319ca/av393c12b3aec5df31bb8.png'" style="display:inline-block; margin-left:1%"></TeamCard>
            <TeamCard v-bind:name="'E-mail'"       v-bind:description="'memory@book.com'" v-bind:img="'https://icons-for-free.com/iconfiles/png/512/inbox+letter+mail+message+text+icon-1320086048829188486.png'" style="display:inline-block; margin-left:1%"></TeamCard>
          </v-row>
        </v-container>
      </div>
    
    </vue-scroll-snap>     
  </div>
</template>

<script>
import TeamCard from '@/components/profile/Profile_card.vue';
import VueScrollSnap from "vue-scroll-snap";

    export default {
        name: 'about',
        data() {
          return { 
            token: localStorage.getItem('user'),
            window: {
              width: 0,
              height: 0
            }
          }
        },
        created() {
          window.addEventListener('resize', this.handleResize);
          this.handleResize();
        },
        destroyed() {
          window.removeEventListener('resize', this.handleResize);
        },
        components : {
          TeamCard,
          VueScrollSnap
        },
        methods: {
          handleResize() {
          this.window.width = window.innerWidth;
          this.window.height = window.innerHeight;
        }            
      }
    }
</script>

<style>


.about {
  background-color: rgb(164, 144, 184);
}

.about section {
  display: block;
}

.about img {
  width: 100%;
  height: 100%;
}

.display-4{
  color: black;
  margin-top: 2%;
  margin-left: 3%;
}

.overline{
  color: black;
  text-align: center;
}


</style>