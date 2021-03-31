<template>
  <div class="horizontalList">

    <div class="left">
      <button style="height: 200px;" id="left-button" @click="swipe(-1)">
        <i class="fa fa-angle-left fa-5x" ></i>
      </button>
    </div>

    <div class="center" id="content" ref="content">
      <div class="internal" v-for="item in items" :key="item.number">
           div  {{ item.number }} 
      </div>
    </div>
    
    <div class="right">
      <button style="height: 200px;" id="right-button" @click="swipe(1)">
        <i class="fa fa-angle-right fa-5x"></i>
      </button>
    </div>
        
  </div>
</template>

<script>
export default {
  name: "Horizontal-Vue",
  data() {
    return {
      items: [
      { number: '1' },
      { number: '2' },
      { number: '3' },
      { number: '4' },
      { number: '5' },
      { number: '6' },
      { number: '7' },
      { number: '8' },
      { number: '9' },
      ]
    }
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
    swipe(direction) {
      const content = this.$refs.content;
      var w = window.innerWidth / 2;
      this.scrollTo(content, w*direction, 500);
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
  overflow: auto;
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
 height: 100%;
 border: 1px solid black;
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