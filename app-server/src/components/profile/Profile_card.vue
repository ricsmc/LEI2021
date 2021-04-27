<template>
<div id="app">
  <div >
              <v-card
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
                  <v-list-item-subtitle>{{description}}</v-list-item-subtitle>
                </v-card-text>
              </v-card>
          </div>
</div>
</template>

<script>
export default {
  name:"Profile_card",
  data(){
    return {
      }
  },
  props:['name', 'description']
}

</script>


<style>

</style>