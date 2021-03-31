<template>
    <div id="menu">
        <Sidebar>
        <v-list style="background-color: #3c22cc;">
          <v-list-item-group color="primary" class="sidebar-panel-nav">

            <router-link to="/" class="rtr-link">
              <v-list-item class="sidebar-list" link color="#3c22cc"  @click="sidebar_click()">
                <v-list-item-content class="sidebar-content"> 
                  Home
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/about" class="rtr-link">
              <v-list-item link color="#3c22cc"  @click="sidebar_click()">  
                <v-list-item-content class="sidebar-content"> 
                  About
                </v-list-item-content>
              </v-list-item>
            </router-link>
            
            <router-link to="/profile" class="rtr-link">
              <v-list-item link color="#3c22cc" @click="sidebar_click()">
                <v-list-item-content class="sidebar-content"> 
                  Profile
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/users" class="rtr-link">
              <v-list-item link color="#3c22cc"  @click="sidebar_click()">
                <v-list-item-content class="sidebar-content"> 
                  Users
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/memories" class="rtr-link">
              <v-list-item link color="#3c22cc"  @click="sidebar_click()">
                <v-list-item-content class="sidebar-content"> 
                  Memories
                </v-list-item-content>
              </v-list-item>
            </router-link>

          </v-list-item-group>
        </v-list>
      </Sidebar>
    </div>
</template>

<script>
import Sidebar from '@/components/menu/Sidebar.vue';

export default {
    components : {
        Sidebar,
    }
}
</script>

<style>
.rtr-link {
  text-decoration: none;
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
    text-decoration: none;
    
  }
</style>