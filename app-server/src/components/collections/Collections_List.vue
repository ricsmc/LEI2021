<template>
    <v-container>
        <v-data-table :headers="headers" :items="collections" :items-per-page="10" class="elevation-1" @click:row="handleClick">
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
                text:'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            {
                text:'ID',
                sortable: true,
                value: 'id'
            }
        ]
        }
        
    },
    apollo: {
    collections: gql`
      query Collections {
        collections {
          id
          name
        } 
      }
    `,
  },
  methods : {
      handleClick: function(value){
          this.$router.push('/collections/' + value.id)
      }
  }
}
</script>