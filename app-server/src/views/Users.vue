<template>
  <div class="home">
    <Users_List/>
  </div>
</template>

<script>
// @ is an alias to /src
import Users_List from '@/components/Users_list.vue'

export default {
  name: 'Users',
  components: {
    Users_List
  }
}
</script>
