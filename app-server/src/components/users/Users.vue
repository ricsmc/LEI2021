<template>
  <div class="users">
    <Users_List/>
  </div>
</template>

<script>
// @ is an alias to /src
import Users_List from '@/components/users/Users_list.vue'

export default {
  name: 'Users',
  components: {
    Users_List
  }
}
</script>
