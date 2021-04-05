<template>
  <v-app id="app">

    <v-app-bar fixed app color="#ffffff" light >
      
      <Burger></Burger>
      <router-link to="/"><img src="../public/memorybook_light2.png" class="logo"/></router-link>
      <v-spacer/>
      <div v-if="this.token" class="dropdown">
        <div class="dropbtn">
          <v-avatar size="50" class="avatar">
            <v-img v-if="utilizador.profile_picture" :src="'http://localhost:1337' + utilizador.profile_picture.url"></v-img>
            <v-img v-else src="https://cdn140.picsart.com/297361716279211.png?type=webp&to=min&r=640"></v-img>
          </v-avatar>
          <b class="username" style="position:relative;  top: 4px;">{{data}}</b>
          <i class="fa fa-sort-desc" style="margin-left:10px;"></i>
        </div>
        <div class="dropdown-content">
          <router-link :to="'/users/' + id">Perfil</router-link>
          <router-link to="/new_memory">Nova Memória</router-link>
          <router-link to="/">Nova Coleção</router-link>
          <a v-on:click="handleLogout()" href="/">
            <i style="margin-right:2px" class="fa fa-sign-out" aria-hidden="true"></i>
            Logout
          </a>
        </div>
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
    handleLogout() {
       localStorage.clear();
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

  .dropdown .dropbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: #4F4E81;
  background-color: inherit;
  font-family: inherit;
  margin: 0;

  }
  .dropbtn {
    padding: 10px 10px 10px 10px;
  }
  
     
  .dropdown-content {
    display: none;
    position: absolute;
    right: 0px;
    top: 64px;
    background-color: #ffffff;
    min-width: 200px;
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    z-index: 1;

  }
  
  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;

  }

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;

}


.username {
  position: relative;
  padding: 10px 10px 0px 15px;
  font-size:150%
}

.avatar {
  box-shadow: 0px 0px 5px 0.1px rgba(0,0,0,0.2);
}


</style>


