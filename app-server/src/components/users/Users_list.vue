<template>
    <v-container class="list">
        <v-data-table :headers="headers" :items="utilizadors" :items-per-page="5" class="elevation-1" @click:row="handleClick">
        </v-data-table>
    </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
            headers: [
            {
                text:'Username',
                align: 'start',
                sortable: false,
                value: 'username',
            },
            {
                text:'Email',
                value:'email'
            }
        ]
        }
        
    },
    apollo: {
    utilizadors: gql`
      query Utilizadors {
        utilizadors {
          id
          username
          email
        }
        
      }
    `,
  },
  methods : {
      handleClick: function(value){
          this.$router.push('/users/' + value.id)
      }
  }
}
</script>

<style>

</style>