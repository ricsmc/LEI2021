<template>
  <div id="app">
    <div style="margin-top:0px" @wheel.prevent="wheel">
      <v-app id="inspire">
        <v-parallax  
        class="background"
        src="https://www.solidbackgrounds.com/images/2560x1440/2560x1440-pastel-purple-solid-color-background.jpg"
        height="600"
        jumbotron>
          <h1 class="overline">Somos um projeto que pretende fornecer às pessoas uma plataforma onde possam partilhar as suas memórias.
          </h1>
          <h1 class="overline">Partilhe connosco as suas experiências e conheça a de tantos outros!
          </h1>
          <h1 class="overline">Conte-nos a sua história!
          </h1>
        </v-parallax>
        <h1 class="display-4">ABOUT US</h1>
      </v-app>
    </div>
    <div style="margin-top:-56px" @wheel.prevent="wheel">
      <v-app id="inspire">
        <v-parallax  
        class="background"
        src="https://www.solidbackgrounds.com/images/2560x1440/2560x1440-pastel-purple-solid-color-background.jpg"
        height="600"
        jumbotron>
          <ProfileCard class="pc1"/>
          <ProfileCard class="pc2"/> 
          <ProfileCard class="pc3"/> 
        </v-parallax>
        <h1 class="display-4">MEET THE TEAM</h1>
      </v-app>
    </div>
    <div style="margin-top:-56px" @wheel.prevent="wheel">
      <v-app id="inspire">
        <v-parallax  
        class="background"
        src="https://www.solidbackgrounds.com/images/2560x1440/2560x1440-pastel-purple-solid-color-background.jpg"
        height="600"
        jumbotron>
          <h1 class="subtitle-1">Somos 3 amiguinhos :)</h1>
        </v-parallax>
        <h1 class="display-4">CONTACT US</h1>
      </v-app>
    </div>
  </div>
</template>



<script>

import ProfileCard from './profile/Profile_card.vue'

    export default {
        name: 'about',
        data() {
            return { 
                array: ['first','second','third'],
                token: localStorage.getItem('user'),
            }
        },
        components: {
          ProfileCard
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
            }            
        }
    }

</script>


<style>
.display-4{
  color: black;
  position: absolute;
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