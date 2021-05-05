<template>
    <v-container v-if="this.memory">
      <v-row style="padding: 10px 0 0 0">
        <v-col>
        <v-card
          class="mx-auto"
          max-width="900"
          min-width="100%"
          min-height="300"
          outlined
        >

      
          <v-card-title>
            {{memory.title}}
          </v-card-title>
      
          <v-card-subtitle>
            <v-icon small>mdi-map-marker</v-icon>
            <span v-if="memory.local">{{memory.local}}</span>   •   <span v-if="memory.date_of_memory">{{memory.date_of_memory.split("T")[0]}}</span>
          </v-card-subtitle>
              <v-card-text  v-for="person in memory.people" :key="person.name"><b>Personagem</b> : {{person.name}} </v-card-text>
          <v-card-text>
            {{memory.content}}
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
              <v-autocomplete
                v-model="values"
                :items="collections"
                item-text="name"
                outlined
                dense
                chips
                small-chips
                label="Adiciona às tuas coleções"
                return-object
                multiple
                style="padding:0 0 0 10px"
              ></v-autocomplete>
            </v-col>
            <v-col cols="1">
              <v-btn dark @click="adicionar()"> Adicionar </v-btn>
            </v-col>
            </v-row>
            
          </v-card-actions>
          
         
        </v-card>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 text-left">
                    Autor:
                  </v-list-item-title>
                  <div class="subtitle-1 mb-4">
                    {{memory.utilizador.username}}
                  </div>
                  
                </v-list-item-content>
          
                <v-avatar
      
                  size="80"

                >
                  <v-img v-if="memory.utilizador.profile_picture" @click.stop="dialog = true" :src="'http://localhost:1337' + memory.utilizador.profile_picture.url"></v-img>
                  <v-img v-else src="https://cdn140.picsart.com/297361716279211.png?type=webp&to=min&r=640"></v-img>
                </v-avatar>
              </v-list-item>
          
            
            </v-card>
            </v-col>
            
          </v-row>
          <v-row justify="center">
            <v-col cols=3 >
              <v-btn href="#" v-scroll-to="'#galeria'">Galeria</v-btn>
            </v-col>
            <v-col cols=3>
              <v-btn href="#" v-scroll-to="'#videos'">Videos</v-btn>
            </v-col>
          </v-row>
          
        </v-col>
      </v-row>
      <v-row>
        <v-col>

          <v-card outlined id="galeria">
        <v-card-title>Galeria</v-card-title>
        <v-card-subtitle>{{memory.images.length}} {{memory.images.length == 1 ? 'Foto' : 'Fotos'}}</v-card-subtitle>
        <v-carousel style="width:100%;height:auto;" v-model="model" show-arrows-on-hover key="" hide-delimiter-background>
          <v-carousel-item v-for="image in memory.images" :key="image.url">
              <v-img max-height="500px" contain :src="`http://localhost:1337`+image.url"></v-img>
          </v-carousel-item>
          
        </v-carousel>
      </v-card>
        </v-col>
        
      
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined id="videos">
            <v-card-title>
              Videos
            </v-card-title>
            <v-card-subtitle>{{memory.videos.length}} {{memory.videos.length == 1 ? 'Video' : 'Videos'}}</v-card-subtitle>
            <v-container v-for="video in memory.videos" :key="video.url">
              <v-col align="center">
                <video style="height:500px;"  class="my_video" :src="`http://localhost:1337`+video.url" controls></video>
              </v-col>
          </v-container>
          </v-card>
        </v-col>
        
      </v-row>
      
     
      
      

    </v-container>
</template>


<script>
import gql from 'graphql-tag'
import axios from 'axios'

export default {
    data() {
        return {
          values: [],
          memory: '',
          videos: {
            options: {
                autoplay: false,
                volume: 0.5
            },
            errorMsg: 'Vídeo não disponível!'
          },
          play_p: "mdi-play",
          video: '',
          juice: ''
          
          } 
    },
    components: {
    
    },
    created(){
      this.video= document.querySelector('.video')
      this.juice= document.querySelector('.orange-juice')
    },
    methods: {
      adicionar() {
        if (this.values.length>0) {
          this.values.forEach(elem => {
            var idCollection = elem.id    
            var token = localStorage.getItem('jwt')
            axios.put("http://localhost:1337/memories/"+this.$route.params.id+"/addToCollections",  {idCollection}, {headers: {'Authorization': `${token}`}})
              .then(() => {
                this.$router.go()
              })
              .catch(err => {
                console.log(err)
              })
          });
        }
      },
      play_pause() {
        console.log(this.video.paused)
        if(this.video.paused){
          this.play_p="mdi-pause";
          this.video.play();
        }
        else{
          this.play_p="mdi-play";
          this.video.pause();
        }
      }
    },
    apollo: {
      memory:{
        query: gql`query Memory ($id: ID!){
          memory (id: $id){
            id
            title
            local
            content
            date_of_memory
            images {
              url
            }
            videos {
              url
            }
            people {
              name
              local_of_birth
              date_of_birth
              date_of_death
            }
            utilizador {
              username
              profile_picture {
                url
              }
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
        }
      }`,
      variables(){
        return {
          id: localStorage.getItem('id')
        }
      }
    }
  }
}
</script>



<style> 

h1 {
   padding: 15px 0 15px 0;
}




</style>