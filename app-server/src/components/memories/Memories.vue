<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
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
  apollo: {
    memories: gql`
      query Memories {
        memories {
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
</script>

<style>

html, body { 
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}


</style>