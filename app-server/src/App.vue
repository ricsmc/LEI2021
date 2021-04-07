<template>
  <v-app id="app">

    <v-app-bar fixed app color="#ffffff" light >
      
      <Burger v-if="this.token"></Burger>
      <router-link to="/"><img src="../public/memorybook_light2.png" class="logo"/></router-link>
      <v-spacer/>
      <div v-if="this.token" class="dropdown">
        <Dropdown :utilizador="utilizador"></Dropdown>
      </div>
      <div v-else>
          <div @click="stopApollo"/>
          <Login></Login>
      </div>

    </v-app-bar>
    <v-main>
      <Menu/>
        <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Burger from '@/components/menu/Burger.vue';
import Menu from '@/components/menu/Menu.vue';
import Login from '@/components/Login.vue';
import Footer from '@/components/Footer.vue';
import gql from 'graphql-tag'
import Dropdown from '@/components/menu/DropDown.vue';


export default {

  name: 'App',
   data() {
            return {
                    data:"",
                    show_login:false,
                    token:false,
                    id:''
            }
        },
  created() {
    this.token=localStorage.getItem('jwt'),
    this.data=localStorage.getItem('user')
    if(!this.token){
      this.$apollo.queries.utilizador.skip = true
    }
    else this.$apollo.queries.utilizador.skip = false
    this.id = localStorage.getItem('id')
  },

  apollo: {
    utilizador: {
      query : gql`query Utilizador ($id: ID!){
          utilizador (id: $id) {
            id
            username
            profile_picture {url}
        }
      }
    `,
    variables(){
      return {
        id: localStorage.getItem('id')
      }
    }
  }
  },
  components: {
    Burger,
    Menu,
    Login,
    Footer,
    Dropdown,
  },
  methods: {
    loged: function(da){
      this.data = da
      console.log("username: " + da)
      this.$apollo.queries.users.skip = false

    },
    toggle_login: function(){
      if(this.show_login) this.show_login=false
      else this.show_login=true
      console.log(this.show_login)
    },
    stopApollo(){
      
    }
  },
  

};
</script>


<style>

body {
    overflow: hidden;
    height: 100vh;
} 

html { overflow-y: hidden }

.logo {
  width: 260px;
  padding: 6px 0px 0px 20px;
}

.dropdown {
  overflow: hidden;
}

</style>


