<template>
  <div class="home">
    <User_Info/>
  </div>
</template>

<script>
// @ is an alias to /src
import User_Info from '@/components/User_Info.vue'

export default {
  name: 'User',
  components: {
    User_Info
  }
}
</script>