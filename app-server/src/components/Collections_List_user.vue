<template>
    <v-container>
        <v-data-table :headers="headers" :items="collections" :items-per-page="5" class="elevation-1" @click:row="handleClick">
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
                sortable: false,
                value: 'name',
            },
            {
                text:'Created at',
                value:'createdAt',
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
          createdAt
        }
        
      }
    `,
  },
  methods : {
      handleClick: function(value){
          this.$router.push('profile/collections/' + value.id)
      }
  }
}
</script>