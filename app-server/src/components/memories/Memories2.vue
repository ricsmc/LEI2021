<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 40px 0px; text-align: center; ">Memories</h1>
    <p style="text-align: center"> Foram encontrados 40 resultados! </p>
        
    <div>
      <Horizontal_List :items="memories"/>
    </div>

  </div>
</template>


<script>
// @ is an alias to /src
import Horizontal_List from '@/components/memories/Horizontal_List.vue'
import gql from 'graphql-tag'

export default {
  name: 'Memories',
  components: {
   Horizontal_List
  },
  data() {
    return {
      number: 0,
    }
  },
  apollo: {
    memories: {
      query: gql`
      query Memories {
        memories(limit:40) {
          id
          title
          images {
            url
          }
        }
      }
    `
    }
  }
}
</script>




<style>


</style>