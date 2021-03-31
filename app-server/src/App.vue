<template>

  <v-app>

    <v-app-bar app color="#ffffff" dark>
      
      <Burger></Burger>
      <router-link to="/"><img src="../public/memorybook_light2.png" class="logo"/></router-link>
      <v-spacer/>
      <div v-if="this.token" class="dropdown">
        <div class="dropbtn">
          <v-avatar size="50" class="avatar">
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
          <b class="username" style="position:relative;  top: 4px;">{{data}}</b>
          <i class="fa fa-sort-desc" style="margin-left:10px;"></i>
        </div>
        <div class="dropdown-content">
          <router-link to="/">Link 1</router-link>
          <router-link to="/">Link 2</router-link>
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
    

  }

};
</script>
<style>
  .v-main {
    background-color: #ffffff;

  }

  .logo {
    width: 300px;
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


