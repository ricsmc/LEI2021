<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="text-center">
                <v-avatar size="100">
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
              </div>
              <div class="text-center">
                <h3 class="text-center">
                    <p class="text-center">Pierre Gasly</p>
                </h3>
              </div>

            <div class="text-center">
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-6 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3200</h5>
                      <span class="description-text">MEMORIES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-6 border-right">
                    <div class="description-block">
                      <h5 class="description-header">10</h5>
                      <span class="description-text">COLLECTIONS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
            </div>
            </div>
        </div>
        

  <div class='text-center'>My memories</div>

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

  </div>
</template>



<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          headers1: [
            {
                text:'Title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            {
                text:'Local',
                value:'local'
            }
        ],
          headers2: [
            {
                text:'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text:'Public',
                value:'public'
            }
        ],

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

        };
    },
    apollo: {
    memories: gql`
      query Memories {
        memories(where:{utilizador: "605788c94f801e6697d497d0"}){
          id
          title
          local
        }   
      }
    `,
    collections: gql`
      query Collections {
        collections(where:{utilizador: "605788c9fc49c376a90dccbc"}){
          id
          name
          public
        }
      }
    `
        
},
    
  methods : {
      handleClick: function(value){
          this.$router.push('/profile/' + value.id)
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
    swipe(direction) {
      const content = this.$refs.content;
      var w = window.innerWidth / 2;
      this.scrollTo(content, w*direction, 500);
    }
  }
}

</script>

