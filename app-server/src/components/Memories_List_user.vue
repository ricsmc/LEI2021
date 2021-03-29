<template>
    <v-container>
        <v-data-table :headers="headers" :items="memories" :items-per-page="5" class="elevation-1" @click:row="handleClick">
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
                text:'Title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            {
                text:'Local',
                value:'local',
            }
        ]
        }
        
    },
    apollo: {
    memories: gql`
      query Memories {
        memories {
          id
          title
          local
        }
        
      }
    `,
  },
  methods : {
      handleClick: function(value){
          this.$router.push('/profile/memories/' + value.id)
      }
  }
}
</script>