<template>
  <div id="about" class="about" >
    <div @wheel.prevent="wheel">
        <section class="scroll_page first" style="padding:50px 0 0 0" id="first">
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
        </section>
        <section class="scroll_page second" id="second"  style="padding:50px 0 0 0">
          <v-container>
            <h1 class="display-4">CONHEÇA A EQUIPA</h1>
          </v-container>
          <v-container>
             <v-row align="center"
                justify="center">
                <TeamCard v-bind:name="'Riczão'" v-bind:description="'Developer'" style="display:inline-block"></TeamCard>

            <TeamCard v-bind:name="'Ramz'" v-bind:description="'Developer'" style="display:inline-block; margin-left:1%"></TeamCard>

            <TeamCard v-bind:name="'Villenz'" v-bind:description="'Developer'" style="display:inline-block; margin-left:1%"></TeamCard>
            </v-row>
            
          </v-container>
        </section>
        <section  class="scroll_page third" id="third">
          
        </section>
        <v-btn style="left:50%" icon class="arrow" @click="smoothScroll('scrolldown','default')"><v-icon large>mdi-chevron-down</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import TeamCard from '@/components/profile/Profile_card.vue'


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
          TeamCard
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
  color: white;
  text-align: center;
}


</style>