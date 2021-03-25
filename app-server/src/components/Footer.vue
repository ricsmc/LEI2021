<template>
    <v-footer color="primary lighten-1" padless>

      <v-row justify="center" no-gutters>
          <v-btn 
            v-for="icon in icons"
            :key="icon"
            color="white"
            rounded
            class="my-2"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
        </v-btn>
        </v-row>

        <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-row>

      <v-row justify="center" class="b" no-gutters>
            <b >
                Memories:
            </b> 
                <span style="color:white; margin-left:2px"> {{this.memories}} </span>
            
            <b style="margin-left:20px">
                Users:
            </b> 
                <span style="color:white; margin-left:2px"> {{this.utilizadors}} </span>
       </v-row>

    </v-footer>
</template>


<script>
import axios from 'axios'
export default {
   data: () => ({
    memories: 0,
    utilizadors: 0,
    links: [
      'Home',
      'About Us',
      'Team',
      'Contact Us',
    ],
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
    mounted () {
        var token = localStorage.getItem('jwt')
        axios.get('http://localhost:1337/utilizadors/count',{headers: {'Authorization': `${token}`}})
           .then(response => (this.utilizadors = response.data))
           .catch(error => console.log(error))
        axios.get('http://localhost:1337/memories/count',{headers: {'Authorization': `${token}`}})
           .then(response => (this.memories = response.data))
           .catch(error => console.log(error))
    }
}
</script>


<style scoped>
    b {
        color:white
    }

</style>