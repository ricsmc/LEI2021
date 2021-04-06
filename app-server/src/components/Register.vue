<template>
  <div id="register">
      <v-dialog max-width="400px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn 
            v-ripple="{ class: 'primary--text' }" 
            width="300" 
            style="height:40px;"
            class="white--text" 
            v-on="on"
            color="#3c22cc"
            >Register</v-btn>
        </template>
      <v-card>
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
              <v-container pa-0>
                  <p v-if="alert" class="alert">{{this.message}}</p>
          <v-col cols="12">
         
              <v-text-field type="text" v-model="username" label="Username" ></v-text-field>

              <v-text-field type="text" v-model="email" label="Email"></v-text-field>
            
          </v-col>
          <v-col cols="12">
              <v-text-field 
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="value ? 'password' : 'text'" 
              v-model="password" label="Password"
              @click:append="() => (value = !value)"></v-text-field>
          </v-col>
          </v-container>
            </v-card-text>
        
            
            <v-card-actions class="justify-center">
                <v-btn v-ripple="{ class: 'primary--text' }" width="300" style="height:40px;" class="white--text" v-on:click="register()" color="#3c22cc">Register</v-btn>
            </v-card-actions>            
        </v-card>
      </v-dialog>
  </div>
</template>




<script>
import axios from 'axios'
    export default {
        name: 'Register',
        data() {
            return {
                    username: "",
                    password: "",
                    email: "",
                    btnText: "Show Password",
                    type: "password",
                    value: String,
                    renderParams: {
                        width: 300,
                        height: 40,
                        longtitle: true
                    },
                    alert:false,
                    message:'',
                    dialog:false
            }
        },
        methods: {
            register() {
                var json = {}
                json['username'] = this.username
                json['email']    = this.email
                json['password'] = this.password
                axios.post("http://localhost:7000/users/register", json)
                    .then( () => {
                        axios.post("http://localhost:7000/users/login", json)
                            .then(data => {
                                localStorage.setItem('user',data.data.username)
                                localStorage.setItem('jwt',data.data.token)
                                localStorage.setItem('level',data.data.level)
                                localStorage.setItem('id',data.data.id)
                                this.$emit('loged')
                                this.$router.go()
                                this.dialog = false
                            })
                            .catch(err => {
                                    this.alert = true
                                    this.message = err.response.data.message
                                    console.log(err.response.data.message)
                            })
                    .catch(err => {
                        this.alert = true
                        this.message = err.response.data.message
                        console.log("este é erro")
                        console.log(err.response.data.message)
                    })        
                })
                console.log(this.username);
            },    
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
</script>

<style scoped>
    #register {
        margin: auto;
    }
    .alert {
        text-align: center;
        color: red;
    }

</style>