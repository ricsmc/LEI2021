<template>
<div id="app">
  <div >
              <v-card
                :loading="loading"
                class="mx-auto my-12"
                max-width="290"
              >
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>
            
                <v-img
                  height="250"
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
            
                <v-card-title>{{name}}</v-card-title>
            
                <v-card-text>
                  
                </v-card-text>
            
                <v-divider class="mx-4"></v-divider>
            
                <v-card-title>Tonight's availability</v-card-title>
                <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
          <v-chip>8:00PM</v-chip>
  
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
            
                <v-card-text>
                  
                </v-card-text>
              </v-card>
          </div>
</div>
</template>

<script>
export default {
  name:"Profile_card",
  props:['name']
}

</script>


<style>

</style>