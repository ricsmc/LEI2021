<template>
    <v-container>
        <h1>{{memory.title}}</h1>
        <p><b>Local</b> : {{memory.local}}</p>
        <p>{{memory.content}}</p>
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

    apollo: {

    memory:{
      query: gql`query Memory ($id: ID!){
        memory (id: $id){
          id
          title
          local
          content
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