<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
    <Memories_List/>
  </div>
</template>

<script>
// @ is an alias to /src
import Memories_List from '@/components/Horizontal_List.vue'

export default {
  name: 'Memories',
  components: {
    Memories_List
  }
}
</script>

<style>

html, body { 
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  overflow: auto;
}


</style>