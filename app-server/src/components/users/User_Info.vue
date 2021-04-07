<template>
    <v-container>
        <p><b>Username</b> : {{utilizador.username}}</p>
        <p><b>Email</b> : {{utilizador.email}}</p>
    </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          utilizador: ''
        }
        
    },

    apollo: {

    utilizador:{
      query: gql`query Utilizador ($id: ID!){
        utilizador (id: $id){
          username
          email
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