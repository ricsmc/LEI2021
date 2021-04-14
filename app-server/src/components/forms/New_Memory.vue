<template>
  <div id="new_memory" >
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
            <v-col sm="2" >
                <v-text-field type="text" prepend-icon="mdi-map-marker" v-model="local" label="Local"></v-text-field>
            </v-col>
            <v-col sm="2" offset=1>
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
            </v-col>
            <v-col sm="4" offset=1>
              <v-autocomplete
                v-model="values"
                :items="people"
                item-text="name"
                outlined
                dense
                chips
                small-chips
                label="Escolhe as personagens"
                return-object
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col sm="1">
              <v-btn dark elevation="1" v-on:click="newPerson()" style="margin-left:15px"> Criar nova </v-btn>
            </v-col>
        </v-row>
        <v-row>
          <v-container>
            <v-btn fixed center v-ripple="{ class: 'primary--text' }" width="300" style="height:40px;" class="white--text" elevation="1" v-on:click="post()" color="#4F4E81">Criar</v-btn>
          </v-container>
        </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios'
import gql from 'graphql-tag'

    export default {
        name: 'New_Memory',
        data() {
            return {
                values: [],
                date: null,
                menu: false,
                title: "",
                content: "",
                local: '',
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
          post(){
            var json = {}
            json['utilizador'] = localStorage.getItem('id')
            json['title'] = this.title
            json['content'] = this.content
            json['local'] = this.local
            json['date_of_memory'] = this.date
            var token = localStorage.getItem('jwt')
            axios.post("http://localhost:1337/memories",  json,{headers: {'Authorization': `${token}`}})
              .then(data => {
                this.$router.push('/memories/' + data.data.id)
                this.$router.go()
              })
              .catch(err => {
                console.log(err)
              })
          }
        },
        apollo: {
          people: {
            query: gql`
              query People ($id :ID!) {
                people(where:{ memories : {utilizador: {id:$id}}}) {
                  id
                  name
                }
              }
            `,
            variables: {
              id: localStorage.getItem('id')
            }
          }
        }      
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