<template>
  <div id="login">
      <v-dialog max-width="400px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn
            color="primary"
            v-on="on"
            >Login</v-btn>
        </template>
            <v-tabs v-model="tab" show-arrows background-color="#3c22cc" icons-and-text dark grow>
                <v-tabs-slider color="#000000"></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i">
                    <v-icon large>{{ i.icon }}</v-icon>
                    <div class="caption py-1">{{ i.name }}</div>
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <v-container pa-0>
                                <p v-if="alert" class="alert">{{this.message}}</p>
                                <v-col cols="12">
                                    <v-text-field 
                                    type="text" 
                                    v-model="username" 
                                    :rules="[rules.required]"
                                    label="Username">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    :append-icon="valueLogin ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :type="valueLogin ? 'password' : 'text'" 
                                    v-model="password" label="Password"
                                    :rules="[rules.required]"
                                    @click:append="() => (valueLogin = !valueLogin)">
                                    </v-text-field>
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
                </v-tab-item>
                
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <v-container pa-0>
                                <p v-if="alert" class="alert">{{this.message}}</p>
                                <v-col cols="12">
                                    <v-text-field 
                                    type="text" 
                                    v-model="username" 
                                    :rules="[rules.required]"
                                    label="Username" >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    type="text" 
                                    v-model="email" 
                                    :rules="[rules.required]"
                                    label="Email">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    :append-icon="valueRegistarPass ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :type="valueRegistarPass ? 'password' : 'text'"
                                    :rules="[rules.required]"  
                                    v-model="password" label="Password"
                                    @click:append="() => (valueRegistarPass = !valueRegistarPass)">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    :append-icon="valueRegistarConfirPass ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :type="valueRegistarConfirPass ? 'password' : 'text'"
                                    :rules="[rules.required, passwordMatch]" 
                                    block 
                                    v-model="passverify"
                                    label="Confirm Password"
                                    @click:append="() => (valueRegistarConfirPass = !valueRegistarConfirPass)">
                                    </v-text-field>
                                </v-col>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn v-ripple="{ class: 'primary--text' }" width="300" style="height:40px;" class="white--text" v-on:click="register()" color="#3c22cc">Register</v-btn>
                        </v-card-actions>            
                    </v-card>
                </v-tab-item>

            </v-tabs>   
      </v-dialog>
  </div>
</template>




<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
import cryptoJS from 'crypto-js'

    export default {
        name: 'Login',
        data() {
            return {
                    tab: 0,
                    tabs: [
                        {name:"Login", icon:"mdi-account"},
                        {name:"Register", icon:"mdi-account-outline"}
                    ],
                    rules: {
                        required: value => !!value || "This camp is required.",
                    },
                    username: "",
                    password: "",
                    passverify: "",
                    email: "",
                    btnText: "Show Password",
                    type: "password",
                    valueLogin: String,
                    valueRegistarPass: String,
                    valueRegistarConfirPass: String,
                    params: {
                        client_id: "700992731861-u8shkr16p914ldvtbnsq4ketr09m62ul.apps.googleusercontent.com"
                    },
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
        computed: {
            passwordMatch() {
                return () => this.password === this.passverify || "Password must match";
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
                        localStorage.setItem('level',data.data.level)
                        localStorage.setItem('id',data.data.id)
                        this.$emit('loggedIn')
                        this.$router.go()
                        this.dialog = false
                    })
                    .catch(err => {
                            this.alert = true
                            this.message = err.response.data.message
                            console.log(err.response)                  
                    })
            },
            onFailure(){   
            },
            register() {
                var json = {}
                json['username'] = this.username
                json['email']    = this.email
                var pass = cryptoJS.AES.encrypt(this.password, 'passphrase').toString();
                json['password'] = pass
                axios.post("http://localhost:7000/users/register", json)
                    .then( () => {
                        json['password'] = this.password
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