<template>
    <div id="login">
        <h1>Login</h1>
        <v-card width="500" class="mx-auto mt-15">
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
                    .then(data => console.log(data.data))
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
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>