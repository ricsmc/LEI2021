<template>
    <v-container v-if="this.memory">
      <v-row style="padding: 10px 0 0 0">
        <v-col>
        <v-card
          class="mx-auto"
          max-width="900"
          min-width="100%"
          outlined
        >
          <v-app-bar
          flat
          color="white"
          >
            <v-toolbar-title
            v-if="!editing"
            >
              {{memory.title}}
            </v-toolbar-title>
            <v-container v-else style="padding:30px 0 0 0">
              <v-text-field
              type="text"
              label="Título"
              v-model="title"
              clearable
              >
              </v-text-field>
            </v-container>
            
            <v-spacer></v-spacer>
            <v-btn @click="editing=!editing" icon v-if="memory.utilizador.username==user">
              <v-icon v-if="editing" class="fa fa-times fa-lg" aria-hidden="true" color="red"></v-icon>
              <v-icon v-else class="fa fa-pencil fa-lg" aria-hidden="true" ></v-icon>
            </v-btn>
            
          </v-app-bar>
          
          
      
          <v-card-subtitle v-if="!editing">
            <span v-if="memory.local"><v-icon small>mdi-map-marker</v-icon>{{memory.local}}</span>   <span v-if="memory.local && memory.date_of_memory">•</span>   <span v-if="memory.date_of_memory">{{memory.date_of_memory.split("T")[0]}}</span>
          </v-card-subtitle>
          <v-container v-else>
            <v-row>
            <v-col>
              <v-text-field
                type="text"
                v-model="local"
                clearable
                label="Local"
                append-icon="mdi-map-marker"
                >
              </v-text-field>
            </v-col>
            <v-col>
              <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Data"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  color="#4F4E81"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1900-01-01"
                  @change="save"
                ></v-date-picker>
            </v-menu>
            </v-col>
            </v-row>
          </v-container>
          
          <v-card-text  v-for="person in memory.people" :key="person.name"><b>Personagem</b> : {{person.name}} </v-card-text>
          <v-card-text v-if="!editing">
            {{memory.content}}
          </v-card-text>
          <v-container v-else>
            <v-textarea
            v-model="content"
            label="Conteúdo"
            >
            </v-textarea>
          </v-container>
          <v-card-actions v-if="editing">
            <v-btn plain @click="saveInfo()">
              Guardar
            </v-btn>
          </v-card-actions>
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
                    Autor
                  </v-list-item-title>
                  <router-link :to="'/users/' + memory.utilizador.id" style="color:#8785C4" class="subtitle-1 mb-4 profile-link">
                    <v-btn left plain color="indigo" class="username">{{memory.utilizador.username}}</v-btn>
                  </router-link>
                  
                </v-list-item-content>
          
                <v-avatar
      
                  size="80"

                >
                  <v-img v-if="memory.utilizador.profile_picture" @click.stop="dialog = true" :src="'http://localhost:1337' + memory.utilizador.profile_picture.url"></v-img>
                  <v-img v-else src="../../../public/user.png"></v-img>
                </v-avatar>
              </v-list-item>
          
            
            </v-card>
            </v-col>
            
          </v-row>
          <v-row justify="center">
            <v-col cols=3 >
              <v-btn href="#" v-scroll-to="'#galeria'" plain color="indigo">Galeria</v-btn>
            </v-col>
            <v-col cols=3>
              <v-btn href="#" v-scroll-to="'#videos'" plain color="indigo">Videos</v-btn>
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
          juice: '',
          editing:false,
          menu:false,
          date:null,
          title:null,
          local:null,
          content:null,
          user:null
          
          } 
    },
    components: {
    
    },
    created(){
      this.video= document.querySelector('.video')
      this.juice= document.querySelector('.orange-juice')
      this.date= this.memory.date_of_memory.split("T")[0]
      this.title= this.memory.title
      this.local= this.memory.local
      this.content= this.memory.content
      this.user= localStorage.getItem("user")
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
      },
      saveInfo(){
        let formData = new FormData();
        var json = {}
        json['title'] = this.title
        json['content'] = this.content
        json['local'] = this.local
        json['date_of_memory'] = this.date
        var token = localStorage.getItem('jwt')

        formData.append("data", JSON.stringify(json));

        axios.put("http://localhost:1337/memories/" + this.$route.params.id, formData , {headers: {'Authorization': `${token}`}})
          .then(() => {
            this.$router.go()
          })
          .catch(err => {
            console.log(err)
          })
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
              id
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

.profile-link {
  text-decoration: none;
  
}
.profile-link:hover {
  color:#38387c;
  
}

.username {
    text-transform: none;
    align-content: left;
}

</style>