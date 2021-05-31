<template>
  <div class="person">
    <v-container style="max-width: 100%">
        <Person_Info/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Person_Info from '@/components/personagem/Person_info.vue'

export default {
  name: 'Person',
  components: {
    Person_Info
  }
}
</script>