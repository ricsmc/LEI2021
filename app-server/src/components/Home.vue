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
        <HomeOut/>
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