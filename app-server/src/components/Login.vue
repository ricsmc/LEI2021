
<template>
  <div id="login">
      <v-dialog max-width="300px">
        <template v-slot:activator="{ on }">
            <v-btn
            color="primary"
            v-on="on"
            >Login</v-btn>
        </template>
      <v-card width="300px" height="130px">
            <v-card-text>
              <input type="text" v-model="username" placeholder="Username">
              <input :type="type" v-model="password" placeholder="Password"/>
            </v-card-text>

            <v-divider></v-divider>
            
            <v-card-actions>
                <v-btn v-on:click="login()" color="info">Login</v-btn>
                <v-btn v-on:click="showPwd()" color="info">{{ btnText }}</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>




<script>
import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                    username: "",
                    password: "",
                    btnText: "Show Password",
                    type: "password",
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
                        this.$router.push('/')
                        })
                    .catch(err => console.log(err))
                console.log(this.username);
            },
             showPwd() {
                if(this.type === "password") {
                   this.type = "text"
                   this.btnText = "Hide Password"
                } else {
                   this.type = "password"
                   this.btnText = "Show Password"
                }
            },
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
</script>

<style scoped>
    #login {
        margin: auto;
    }
</style>