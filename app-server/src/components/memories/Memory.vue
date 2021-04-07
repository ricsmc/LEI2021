<template>
  <div class="memory">
    <Memory_Info/>
  </div>
</template>

<script>
// @ is an alias to /src
import Memory_Info from '@/components/memories/Memory_Info.vue'

export default {
  name: 'Memory',
  components: {
    Memory_Info
  }
}
</script>