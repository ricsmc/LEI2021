<template>
    <v-container>
        <h1>{{memory.title}}</h1>
        <p><b>Local</b> : {{memory.local}}</p>
        <p><b>Data</b> : {{memory.date_of_memory}}</p>
        <p><b>Texto</b> : {{memory.content}}</p>

        <div v-for="person in memory.people" :key="person.name">
            <p><b>Personagem</b> : {{person.name}} </p>
        </div>

        <v-row>
          <v-col cols="5" v-for="image in memory.images" :key="image.url">
            <v-img :src="`http://localhost:1337`+image.url"></v-img>
          </v-col>
        </v-row>

    </v-container>
</template>


<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          memory: ''
        }  
    },
    created() {

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
            people {
              name
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
  }
}
</script>



<style> 

h1 {
   padding: 15px;
}

.show {
  height: 300px;
  width: 300px;
}

</style>