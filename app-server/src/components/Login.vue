<template>
  <div id="login">
      <v-dialog max-width="400px">
        <template v-slot:activator="{ on }">
            <v-btn
            color="primary"
            v-on="on"
            >Login</v-btn>
        </template>
      <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
              <v-container pa-0>
                  <p v-if="alert" class="alert">{{this.message}}</p>
          <v-col cols="12">
            
              <v-text-field type="text" v-model="username" label="Username"></v-text-field>
            
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
                <v-btn v-ripple="{ class: 'primary--text' }" width="300" style="height:40px;" class="white--text" v-on:click="login()" color="#3c22cc">Login</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </v-card-actions>
            
        </v-card>
      </v-dialog>
  </div>
</template>




<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
    export default {

        name: 'Login',
        data() {
            return {
                    username: "",
                    password: "",
                    btnText: "Show Password",
                    type: "password",
                    value: String,
                    params: {
                        client_id: "700992731861-u8shkr16p914ldvtbnsq4ketr09m62ul.apps.googleusercontent.com"
                    },
                    renderParams: {
                        width: 300,
                        height: 40,
                        longtitle: true
                    },
                    alert:false,
                    message:''
            }
        },
        methods: {
            login() {
                var json = {}
                json['username'] = this.username
                json['password'] = this.password
                axios.post("http://localhost:7000/users/login", json)
                    .then(data => {
                        localStorage.setItem('user',data.data.username)
                        localStorage.setItem('jwt',data.data.token)
                        this.$emit('loggedIn')
                        console.log(localStorage.getItem('user'))
                        this.$router.go()
                        })
                    .catch(err => {
                            this.alert = true
                            this.message = err.response.data.message
                            console.log(err.response.data.message)

                    })
                console.log(this.username);
            },
            onSuccess(googleUser) {
                var json = {}
                json['username'] = googleUser.getBasicProfile().zt
                json['password'] = "empty"
                axios.post("http://localhost:7000/users/google/login", json)
                    .then(data => {
                        localStorage.setItem('user',data.data.username)
                        localStorage.setItem('jwt',data.data.token)
                        this.$emit('loggedIn')
                        console.log(localStorage.getItem('user'))
                        this.$router.go()
                        })
                    .catch(err => {
                            this.alert = true
                            this.message = err.response.data.message
                            console.log(err.response)
                  
                    })
            },
            onFailure(){
                
            }
             
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        components: {
            GoogleLogin
        }
    }
</script>

<style scoped>
    #login {
        margin: auto;
    }
    .alert {
        text-align: center;
        color: red;
    }

</style>