<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                var json = {}
                json['username'] = this.input.username
                json['password'] = this.input.password
                axios.post("http://localhost:7000/users/login", json)
                    .then(data => console.log(data.data))
                    .catch(err => console.log(err))
                console.log(this.input.username);
            }
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