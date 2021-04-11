<template>
<div id="app">
  <v-app id="inspire">
    <v-card
      class="mx-auto"
      max-width="434"
      tile
    >
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col
            align-self="start"
            class="pa-0"
            cols="12"
          >
            <v-avatar
              class="ava"
              size="150"
            >
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" ></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{nome}}
                </v-list-item-title>
                <v-list-item-subtitle>Engenheiro Informático</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
    </v-card>
  </v-app>
</div>
</template>

<script>

</script>


<style>
.mx-auto{
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(99,9,121,1) 35%, rgba(0,212,255,1) 100%);
}

.ava{
    margin-top: 5%;
    margin-left: 5%;
}
</style>