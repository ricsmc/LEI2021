<template>
  <v-app id="app">

    <v-app-bar fixed app light color="white">
    
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
    <v-main style="padding: 64px 0 0 0">
      <Menu/>
        <router-view />
    </v-main>
    <div v-if="this.token && this.about"> 
      <Footer/>
    </div>
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
                    id:'',
                    about:true
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
    this.about = true
  },

  updated(){
    if(this.$route.name == "about")
      this.about = false
    else
      this.about = true
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
      
    },
  },
  

};
</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

html, body {
  font-family: 'Noto Sans JP', sans-serif;
}

#app {
  font-family: 'Noto Sans JP', sans-serif;
}

body {
    overflow: auto;
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


