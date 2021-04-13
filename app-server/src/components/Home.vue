<template>
  <div id="home" class="home" >
    <div v-if="this.token">
        <div style="padding: 40px 0 0 0 ">
            <div style="text-align:center; padding:20px 0 20px 0">
                <h1>Memórias mais recentes</h1>
            </div>
            
            <div style="text-align:center; padding:0 0 30px 0">
                <v-btn
                to="/memories"
                rounded
                color="#fdfdfd"
                >
                    Ver Todas
                </v-btn>
            </div>
            <div justify="center">
                <div cols=12>
                    <Horizontal_List :items="memories"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <vue-scroll-snap :fullscreen="true">
            <div class="item" id="first">
                <v-container style="margin-top:8%">
                    <v-row justify="center">
                        <h1 class="home_title">Conte-nos a sua história!</h1>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols=5 >
                        <h3 class="font-weight-regular text-center">Somos um projeto que pretende fornecer às pessoas uma plataforma onde possam partilhar as suas memórias.

                        </h3>
                        <h3 class="font-weight-regular text-center">Partilhe connosco as suas experiências e conheça a de tantos outros!

                        </h3>
                        <h3 class="font-weight-regular text-center">Conte-nos a sua história!

                        </h3>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-img max-width="450" src="../../public/humaans.png"/>
                    </v-row>
                </v-container>
            </div>
            <div class="item" id="second" style="background-color:#8785C4">
                
            </div>
            <div class="item" id="third">
                <img src="https://i.pinimg.com/originals/c7/9f/4a/c79f4a61778f285ce3c0e2cd19a964f5.jpg">
            </div>
        </vue-scroll-snap>
        <v-row justify="center">
        </v-row>
    </div>
  </div>
</template>




<script>
import VueScrollSnap from "vue-scroll-snap";
import gql from 'graphql-tag'
import Horizontal_List from '@/components/memories/Horizontal_List.vue'


    export default {
        name: 'home',
        data() {
            return { 
                array: ['first','second','third'],
                token: localStorage.getItem('user'),
            }
        },

        components: {
            VueScrollSnap,
            Horizontal_List
        },
        apollo: {
            memories: {
            query : gql`query Memories {
                memories (sort:"createdAt:DESC" , limit:12) {
                    id
                    title
                    images {
                        url
                    }
                }
            }
            `,
        }
        },
        methods: {
            
                 
        }
    }
</script>

<style>


.first {
    width: 100%;
    height: 100vh;
}

.second {
    width: 100%;
    height: 100vh;
}

.third {
    width: 100%;
    height: 100vh;
}


.home section {
    display: block;
}

.home img {
   width: 100%;
   height: 100%;
}



.home_title {
    font-size: 400%;
    color: blue;
}

.router_link {
    text-decoration: none;
}

.see_all {
    justify-content:center;
    color: #4F4E81;
}

.see_all:hover {
    text-decoration: underline;
    color: #015AEE; 
}


</style>