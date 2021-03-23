<template>

  <v-app>

    <v-app-bar app color="#3c22cc" dark>
      
      <Burger></Burger>
      <v-spacer/>
      <h1>{{data}}</h1>
    </v-app-bar>
    
    <v-main>
      <Sidebar>
        <v-list style="background-color: #3c22cc;">
          <v-list-item-group v-model="selectedItem" color="primary" class="sidebar-panel-nav">
            <v-list-item class="sidebar-list" link color="#3c22cc" href="/">
              <v-list-item-content class="sidebar-content"> 
                Home
              </v-list-item-content>
            </v-list-item>
            <v-list-item link color="#3c22cc" href="/about">
              <v-list-item-content class="sidebar-content"> 
                About
              </v-list-item-content>
            </v-list-item>
            <v-list-item link color="#3c22cc" href="/login">
              <v-list-item-content class="sidebar-content"> 
                Login
              </v-list-item-content>
            </v-list-item>
            <v-list-item link color="#3c22cc" href="/users">
              <v-list-item-content class="sidebar-content"> 
                Users
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </Sidebar>
      
      
      <router-view/>
     
    </v-main>
  </v-app>
</template>

<script>
import Burger from '@/components/menu/Burger.vue';
import Sidebar from '@/components/menu/Sidebar.vue';


export default {

  name: 'App',
   data() {
            return {
                    data:localStorage.getItem('user')
            }
        },
  components: {
    Burger,
    Sidebar
  },
  methods: {
    loged: function(da){
      this.data = da
      console.log("username: " + da)
    },
  }

};
</script>
<style>
  .v-main {
    background-color: #fffef6;
  }

  .sidebar-panel-nav {
    background-color: #3c22cc;
  }
  .sidebar-content {
    background-color: #3c22cc;
    color: white; 
    font-size: 150%;
    list-style-type: none;
    font-weight: bold;
    
  }

  .sidebar-content:hover{
    color: #ea00ff;
  }
</style>

