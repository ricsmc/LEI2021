<template>
  <div class="horizontalList">

    <div class="left">
      <button style="height: 200px;" id="left_button" @click="swipe(-1,'left_button')">
        <i class="fa fa-angle-left fa-5x" ></i>
      </button>
    </div>
    

    <div class="center" id="content" ref="content">
      <div class="internal" v-for="item in items" :key="item.id">
        <MemoryCard :item="item"/> 
      </div>
    </div>
    
    <div class="right">
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
    items : Object
  },
  methods: {
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
    swipe(direction, id) {
      document.getElementById(id).disabled = true;

      const content = this.$refs.content;
      var w = window.innerWidth / 2;
      this.scrollTo(content, w*direction, 500);
      
      document.getElementById(id).disabled = false ;
    }
  }
}
</script>



    
<style>

html, body { 
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}

.horizontalList {
  text-align: center;
  font-size: 20px;
}

.left{
 float: left; 
 width: 24.5%;
 height: 200px;
}

.internal{
 width: 25%;

 display: inline-block;
}


.center{
 float: left; 
 width: 50%;
 height: 200px;
 margin: 1px;
 overflow: hidden;
 white-space: nowrap;
}

.right{
  float: right; 
  width: 24.5%;
  height: 200px;
}

</style>