<template>
  <div id="home" class="home" >
    <div v-if="this.token" justify="center" class="homeIn">
       
        <h1>Memórias mais recentes</h1>
        
        <div class="botaoVerTodas">
            <v-btn to="/memories" rounded color="#fdfdfd">
                Ver Todas
            </v-btn>
        </div>
        
        <div cols=12>
            <Horizontal_List :flag="'memories'" :items="memories"/>
        </div>

    </div>
    <div v-else>
<<<<<<< Updated upstream
        <vue-scroll-snap :fullscreen="true">
            <div class="item" id="first">
                <v-container style="margin-top:2%">
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
=======
        <HomeOut/>
>>>>>>> Stashed changes
    </div>
  </div>
</template>




<script>
import HomeOut from '@/components/HomeOut.vue'
import gql from 'graphql-tag'
import Horizontal_List from '@/components/lists/Horizontal_List.vue'


    export default {
        name: 'home',
        data() {
            return { 
                token: localStorage.getItem('user'),
            }
        },
        components: {
            HomeOut,
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
            `
            }
        }
    }
</script>

<style>

.homeIn {
   text-align:center;
   padding: 40px 0 0 0 
}

.botaoVerTodas{
   padding:0 0 30px 0
}

.home h1 {
   padding:30px 0 20px 0
}

.home img {
   width: 100%;
}

.home_title {
    font-size: 400%;
    color: blue;
}

.router_link {
    text-decoration: none;
}




</style>