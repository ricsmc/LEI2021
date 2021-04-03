<template>
  <div id="new_memory">
    <span class="headline">
        <h2 style="padding: 20px 0px 0px 0px; color:#4F4E81">
        Nova Memória
        </h2>
    </span>
    <v-container pa-0>
        <v-col cols="12">
            <v-text-field flat type="text" class="titulo" style="border-style: none !important;" :rules="rules" v-model="title" label="Título *"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea outlined auto-grow type="text" :rules="rules" v-model="content" label="Corpo *"></v-textarea>
        </v-col>
        <v-row no-gutters>
            <v-col cols="12" sm="6">
                <v-text-field type="text" prepend-icon="mdi-map-marker" v-model="title" label="Local"></v-text-field>
            </v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  color="#4F4E81"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1900-01-01"
                  @change="save"
                ></v-date-picker>
            </v-menu>
        </v-row>
    </v-container>
  </div>
</template>




<script>
    export default {

        name: 'New_Memory',
        data() {
            return {
                date: null,
                menu: false,
                rules: [
                  value => !!value || 'Required',
                ],
            }
        },
        watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

    }
</script>

<style>

.headline {
    text-align: center;
}
.titulo {
    font-size: 200%;
    
}

.titulo.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
}
.titulo.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
}

.titulo.v-input v-label {
    font-size: 20em;
}



</style>