<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 0px 75px;">Memories</h1>
    <Memories_List/>
  </div>
</template>

<script>
// @ is an alias to /src
import Memories_List from '@/components/Memories_List.vue'

export default {
  name: 'Memories',
  components: {
    Memories_List
  }
}
</script>