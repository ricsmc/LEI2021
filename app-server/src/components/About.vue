<template>
  <div id="about" class="about" >
        <vue-scroll-snap :fullscreen="true">
          <div class="item">
          <v-container>
            <h1 class="display-4">SOBRE NÓS</h1>
          </v-container> 
          <v-container style="margin-top:10%">
            <h1 class="overline">Somos um projeto que pretende fornecer às pessoas uma plataforma onde possam partilhar as suas memórias.
            </h1>
            <h1 class="overline">Partilhe connosco as suas experiências e conheça a de tantos outros!
            </h1>
            <h1 class="overline">Conte-nos a sua história!
            </h1>
          </v-container>
          </div>


        

          <div class="item">
          <v-container>
            <h1 class="display-4">CONHEÇA A EQUIPA</h1>
          </v-container>
          <v-container>
             <v-row align="center"
                justify="center">
                <TeamCard v-bind:name="'Ricardo Cunha'" v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block"></TeamCard>

            <TeamCard v-bind:name="'Luis Ramos'" v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block; margin-left:1%"></TeamCard>

            <TeamCard v-bind:name="'Luís Vila'" v-bind:description="'Developer'" v-bind:img="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'" style="display:inline-block; margin-left:1%"></TeamCard>
            </v-row>
            
          </v-container>
          </div>


        
          <div class="item">
          <v-container>
            <h1 class="display-4">CONTACTOS</h1>
          </v-container> 
          <v-container> 
            <v-row align="center"
                justify="center">
              <TeamCard v-bind:name="'Onde estamos'" v-bind:description="'Braga, Portugal'" v-bind:img="'https://freepikpsd.com/wp-content/uploads/2019/10/icone-location-png-3-Transparent-Images.png'" style="display:inline-block"></TeamCard>

              <TeamCard v-bind:name="'Telefone'" v-bind:description="'912345678'" v-bind:img="'http://pixsector.com/cache/ed4319ca/av393c12b3aec5df31bb8.png'" style="display:inline-block; margin-left:1%"></TeamCard>

              <TeamCard v-bind:name="'E-mail'" v-bind:description="'memory@book.com'" v-bind:img="'https://icons-for-free.com/iconfiles/png/512/inbox+letter+mail+message+text+icon-1320086048829188486.png'" style="display:inline-block; margin-left:1%"></TeamCard>
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
                array: ['first','second','third'],
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
            wheel : function(ev){
                var target
                if (ev.deltaY < 0) {
                    if (this.array[0]!="first") {
                        target = document.getElementById(this.array[this.array.length-1]);
                        this.smoothScroll("scrollup",target)
                        }
                    else return;
                }
                else {
                    if (this.array[0]!="third") {
                        target = document.getElementById(this.array[1]);
                        this.smoothScroll("scrolldown",target)
                    }
                    else return;
                    }
            },
            smoothScroll(value, target) {
                if (target=="default") target = document.getElementById(this.array[1]);
                var scrollContainer = target;
                do { 
                    scrollContainer = scrollContainer.parentNode;
                    if (!scrollContainer) return;
                    scrollContainer.scrollTop += 1;
                } while (scrollContainer.scrollTop == 0);

                var targetY = 0;
                do { 
                    if (target == scrollContainer) break;
                    targetY += target.offsetTop;
                } while ((target = target.offsetParent));

                var scroll = function(c, a, b, i) {
                    i++; if (i > 30) return;
                    c.scrollTop = a + (b - a) / 30 * i;
                    setTimeout(function(){ scroll(c, a, b, i); }, 20);
                }

                scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
                var val
                if (value=="scrolldown") {
                    val = this.array[0];
                    this.array.shift();
                    this.array.push(val);
                }
                else {
                    val = this.array[this.array.length-1];
                    this.array.pop();
                    this.array.unshift(val);
                }
            },
            handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }            
        }
    }
</script>

<style>


.first {
    width: 100%;
    height: 100vh;
}

.second {
    width: 100%;
    height: 100vh;
}

.about {
  background-color: rgb(164, 144, 184);
}

.third {
    width: 100%;
    height: 100vh;
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

.pc1{
  position: absolute;
  margin-left: 2%;
  margin-top: 22%;
}

.pc2{
  position: absolute;
  margin-left: 34%;
  margin-top: 22%;
}

.pc3{
  position: absolute;
  margin-left: 66%;
  margin-top: 22%;
}

.overline{
  color: black;
  text-align: center;
}


</style>