<template>
    <v-container>
      
      <v-row class="header">
        <v-col cols="12">  
          <h1>{{collection.name}}</h1>
          <p><b>Id da coleção</b> : {{collection.id}}</p>
          <p><b>Data de criação</b> : {{collection.createdAt.split("T")[0]}}</p>
          <p><b>Public</b> : {{collection.public}}</p>
          <p><b>Descrição</b> : ainda nao tem </p>
          <p><b>Id do criador</b> : {{collection.utilizador.id}}</p>
          <p><b>Nome do criador</b> : {{collection.utilizador.username}}</p>
          <p><b>Número de memórias que contém</b> : {{collection.memories.length}}</p>
        </v-col>
      </v-row>

      <v-row class="listMemories">
        <v-col cols="12"> 
          <div v-for="memory in collection.memories" :key="memory.id">
              <p><b>Id da memória</b> : {{memory.id}}</p>
              <p><b>Titulo da memória</b> : {{memory.title}}</p>
              <p>---------------------------------</p>
          </div>
        </v-col>
      </v-row>

      <v-row class="searchBar">
        <v-col cols="12"> 
          <p> Vamos encontrar memórias para adicionares à tua coleção!</p>
          <v-toolbar dense floating>
             <v-text-field
               hide-details
               prepend-icon="mdi-magnify"
               single-line
             ></v-text-field>
          </v-toolbar>
        </v-col>
      </v-row>


    </v-container>
</template>


<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          collection: ''
        }  
    },
    apollo: {
      collection:{
        query: gql`query Collection ($id: ID!){
            collection (id: $id) {
                id
                name
                public
                createdAt
                utilizador {
                  username
                  id
                }
                memories {
                  id
                  title
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
   padding: 15px 0 15px 0;
}

.header {
  background-color: cadetblue;
}

.listMemories{
  background-color: coral;
}

.searchBar {
  background-color: cyan;
}
</style>