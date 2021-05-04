<template>
    <v-container v-if="this.memory">
        <h1>{{memory.title}}</h1>
        <p><b>Local</b> : {{memory.local}}</p>
        <p><b>Data</b> : {{memory.date_of_memory.split("T")[0]}}</p>
        <p><b>Texto</b> : {{memory.content}}</p>

        <v-row>
          <v-col cols="4" v-for="person in memory.people" :key="person.name">
              <p><b>Personagem</b> : {{person.name}} </p>
              <p v-if="person.local_of_birth">
                <b>Local</b> : {{person.local_of_birth}} 
              </p>
              <p v-if="person.date_of_birth && person.date_of_death">
                <b>Data</b> : {{person.date_of_birth.split("T")[0]}} ~ {{person.date_of_death.split("T")[0]}}
              </p>
              <p v-else-if="person.date_of_birth">
                <b>Data</b> : {{person.date_of_birth.split("T")[0]}}
              </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
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
              ></v-autocomplete>
            </v-col>
            <v-col cols="1">
              <v-btn dark @click="adicionar()"> Adicionar </v-btn>
            </v-col>
        </v-row>

        <v-row>
          <v-col cols="5" v-for="image in memory.images" :key="image.url">
            <v-img :src="`http://localhost:1337`+image.url"></v-img>
          </v-col>
        </v-row>

        <v-row >
          <v-col cols="6" v-for="video in memory.videos" :key="video.url">
            <my-video :sources="[{src:`http://localhost:1337`+video.url, type:'video/mp4'}]" :options="videos.options" :errorMsg="videos.errorMsg"></my-video>
          </v-col>
        </v-row>
        
        

    </v-container>
</template>


<script>
import myVideo from 'vue-media-player'
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
          }
        }  
    },
    components: {
      myVideo
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