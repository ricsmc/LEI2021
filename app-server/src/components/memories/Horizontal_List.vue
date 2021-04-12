<template>
  <div v-if="this.items" class="horizontalList">
      <div class="esq">
        <button style="height: 200px;" id="left_button" @click="swipe(-1,'left_button')">
          <i class="fa fa-angle-left fa-5x" ></i>
        </button>
      </div>

      <div class="centro" id="contente" ref="contente">
        <div class="cartao" v-for="item in items" :key="item.id">
          <span @click="handleClick(item.id)"><MemoryCard :item="item" /></span> 
        </div>
      </div>

      <div class="dir">
        <button style="height: 200px;" id="right_button" @click="swipe(1,'right_button')">
          <i class="fa fa-angle-right fa-5x"></i>
        </button>
      </div>
    
  </div>
</template>






<script>

import MemoryCard from '@/components/memories/MemoryCard.vue'


export default {
  name: "Horizontal-Vue",
  components: {
    MemoryCard
  },
  props : {
    items : Array
  },
  methods: {
    handleClick(id){
      this.$router.push('/memories/' + id)
    },
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      if ( !( (scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
        const startTime = "now" in window.performance ? performance.now() : new Date().getTime();
        
        var fn = function scroll(timestamp) {
          const timeElapsed = timestamp - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          element.scrollLeft = scrollPos + scrollPixels * progress;
          if (timeElapsed < duration) window.requestAnimationFrame(fn); 
          else return;
        }
        window.requestAnimationFrame(fn);
      }
    },
    async swipe(direction, id) {
      //desativa butao
      document.getElementById(id).disabled = true;  

      const contente = this.$refs.contente;
      var w = window.innerWidth / 2;
      this.scrollTo(contente, w*direction, 500);
      await this.sleep(500);

      //ativa butao
      document.getElementById(id).disabled = false ;
    },
    sleep(ms) {
       return new Promise((resolve) => {setTimeout(resolve, ms);});
    }
  }
}
</script>



    
<style>


.horizontalList {
  text-align: center;
  font-size: 20px;
}

.esq{
 float: left; 
 width: 24.5%;
 height: 200px;
}

.cartao{
 width: 25%;
 display: inline-block;
}


.centro{
 float: left; 
 width: 50%;
 height: 200px;
 overflow: hidden;
 white-space: nowrap;
}

.dir{
  float: right; 
  width: 24.5%;
  height: 200px;
}

</style>