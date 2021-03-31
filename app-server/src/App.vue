<template>

  <v-app>

    <v-app-bar app color="#3c22cc" dark>
      
      <Burger></Burger>
      <a href="/" class="logo"><b>memorybook</b></a>
      <v-spacer/>
      
      <div v-if="this.token" class="dropdown">
        <div class="dropbtn">
          <b class="name">{{data}}</b>
          <v-avatar size="50">
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
          <i class="fa fa-sort-desc" style="margin-left:10px"></i>
        </div>
        <div class="dropdown-content">
          <a href="/">Link 1</a>
          <a href="/">Link 2</a>
          <a v-on:click="handleLogout()" href="/">
            <i style="margin-right:2px" class="fa fa-sign-out" aria-hidden="true"></i>
            Logout
          </a>
        </div>
      </div>
      <div v-else>
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
import {mutations} from '@/store.js'



export default {

  name: 'App',
   data() {
            return {
                    data:"",
                    show_login:false,
                    token:false,

            }
        },
  created() {
    this.token=localStorage.getItem('jwt'),
    this.data=localStorage.getItem('user')
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
    },
    toggle_login: function(){
      if(this.show_login) this.show_login=false
      else this.show_login=true
      console.log(this.show_login)
    },
    handleLogout() {
       localStorage.clear();
    },
    sidebar_click() {
      mutations.toggleNav()
    }

  }

};
</script>
<style>
  .v-main {
    background-color: #fffef6;

  }

  .logo {
    font-size: 250%;
    -webkit-text-fill-color: #3c22cc; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #ea00ff;
    text-decoration: none;
    padding: 0px 0px 0px 25px;
  }

  .logo:hover{
    -webkit-text-fill-color: white;
  }

  .dropdown {
    float: left;
    overflow: hidden;
  }

  .dropdown .dropbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  }

  .dropdown .dropbtn:hover{
    color: #ea00ff;
  }
     
  .dropdown-content {
    display: none;
    position: absolute;
    right: 10px;
    background-color: #f9f9f9;
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

.name {
  margin-right:10px;
  font-size:24px
}



</style>


