<template>
  <div id="home" class="home" >
    <div v-if="this.token">
        <HelloWorld msg="Welcome to Your Vue.js App"/>   
    </div>
    <div v-else style="margin-top:-56px" @wheel.prevent="wheel">
        <section class="scroll_page first" id="first">
          <img src="https://www.visitgrandola.com/cmgrandola/uploads/page/image1/1186/praias_capa.JPG">
        </section>
        <section class="scroll_page second" id="second">
          <img src="https://s2.glbimg.com/VIQjTjAo7GKrMrrr8MvAFfgYdc4=/smart/e.glbimg.com/og/ed/f/original/2020/10/23/10-praias-desertas-para-fugir-da-aglomeracao-8.jpg">
        </section>
        <section  class="scroll_page third" id="third">
          <img src="https://i.pinimg.com/originals/c7/9f/4a/c79f4a61778f285ce3c0e2cd19a964f5.jpg">
        </section>
        <button type="button" @click="smoothScroll('scrolldown','default')">Click Me!</button>
    </div>
  </div>
</template>




<script>
import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        data() {
            return { 
                array: ['first','second','third'],
                token: localStorage.getItem('user'),
            }
        },
        components: {
            HelloWorld
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
                console.log(this.array)
               
            }            
        }
    }
</script>

<style>


.first {
    width: 100%;
    height: 756px;
    background: #ccc;
}

.second {
    width: 100%;
    height: 756px;
    background: #999;
}

.third {
    width: 100%;
    height: 756px;
    background: #000;
}


.home section {
    display: block;
}

.home img {
   width: 100%;
   height: 756px;
}


.home button{
  position: fixed;
  width: fit-content;
  display: flex;
  justify-content: center;
  font-size: 3vw;
  bottom: 10px;
  left: 40%;
  color: #FFD215;
  z-index: 100;
  cursor: pointer;
}


</style>