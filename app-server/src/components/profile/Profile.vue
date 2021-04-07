<template>
  <div id="profile">
    <v-row no-gutter align="center">
      <v-col cols=5>
        <v-responsive min-width=500 max-width=500>
        
        <v-row align="center" >
          <v-col cols=3 offset=4>
            <div style="padding: 60px 0 0 0">
              <v-avatar size="160" class="profile_pic">
                <v-img v-if="utilizador.profile_picture" @click.stop="dialog = true" :src="'http://localhost:1337' + utilizador.profile_picture.url"></v-img>
                <v-img v-else src="https://cdn140.picsart.com/297361716279211.png?type=webp&to=min&r=640"></v-img>
              </v-avatar>
              <v-dialog
                v-model="dialog"
                v-if="utilizador.profile_picture"  :max-width="utilizador.profile_picture.width > 800 ? 800 : utilizador.profile_picture.width"
                >
                <v-card>
                
                  <v-img v-if="utilizador.profile_picture" :src="'http://localhost:1337' + utilizador.profile_picture.url"></v-img>
                  
                </v-card>
              </v-dialog>
            </div>
          </v-col >
            <v-col cols=3 offset=2>
              <div style="padding: 80px 0 0 0px">
              <h2>{{utilizador.username}}</h2>
              </div> 
            </v-col>
        </v-row>
        </v-responsive>
      </v-col>
      
      <v-col cols=3 offset=2 style="padding: 70px 0 0 0">
        <v-row>
          <v-col cols=6 class="mem_col">
            <v-row justify="center">
              <h2 >Memórias</h2>
            </v-row>
            <v-row justify="center">
              <p >{{memories.length}}</p>
            </v-row>
          </v-col>
          <v-col cols=6 class="mem_col">
            <v-row justify="center">
              <h2>Coleções</h2>
            </v-row>
            <v-row justify="center">
              <p>{{collections.length}}</p>
            </v-row>
            
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider style="margin-top: -50px"></v-divider>
    <v-row style="padding: 170px 0px 0px 0px"/>
    <v-row>
      <v-col cols=4 offset=1>
        <v-card max-width="400" elevation="0" outlined style="background-color: inherit;">
          <v-card-title>Sobre:</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text v-if="utilizador.about">{{utilizador.about}}</v-card-text>
          <v-card-text v-else>Este utilizador não tem descrição</v-card-text>
        </v-card>
      </v-col>
      <v-col cols=7>
        <Horizontal_List :items="memories"/>
      </v-col>
    </v-row>
  </div>
</template>



<script>
import gql from 'graphql-tag'
import Horizontal_List from '@/components/memories/Horizontal_List.vue'

export default {
    data() {
        return{
          dialog : false

        };
    },
    components:{
      Horizontal_List
    },
    apollo: {
    memories: { 
      query : gql`
      query Memories ($id: ID!){
        memories(where:{utilizador:  $id}){
          id
          title
          images {
            url
          }
        }   
      }
    `,
    variables(){
      return {
        id: this.$route.params.id
      }
    }
    },
    collections: {
      query: gql`
      query Collections ($id: ID!){
        collections(where:{utilizador:  $id}){
          id
          name
          public
        }
      }
    `,
    variables(){
      return {
        id: this.$route.params.id
      }
    }
    },
    utilizador: {
      query : gql`query Utilizador ($id: ID!){
          utilizador (id: $id) {
            id
            username
            about
            profile_picture {
              url
              width
              }
        }
      }
    `,
    variables(){
      return {
        id: this.$route.params.id
      }
    }
    }
        
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
    },
    img_click(){
      this.view_profile_pic = true
    }
  }
}

</script>
<style>
.mem_col {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;

  }

.mem_col:hover{
  background-color: #ddd;
}

.profile_pic {
  cursor: pointer;
  box-shadow: 0px 0px 5px 0.1px rgba(0,0,0,0.2);
  filter: brightness(100%);
  transition-duration: 0.2s;
  transition-property: filter;
}

.profile_pic:hover {
  filter: brightness(80%);
  transition-duration: 0.2s;
  transition-property: filter;
}

</style>