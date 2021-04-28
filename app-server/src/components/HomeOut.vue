<template>
    <div id="homeOut">
        <vue-scroll-snap :fullscreen="true">

            <div class="item" id="first">
                
                <v-container style="margin-top:8%">
                   
                    <v-row justify="center">
                        <h1 class="home_title">Conte-nos a sua história!</h1>
                    </v-row>
                    
                    <v-row justify="center">
                        <v-col cols=5 >
                        <h3 class="font-weight-regular text-center">
                            Somos um projeto que pretende fornecer às pessoas uma plataforma onde possam partilhar as suas memórias.
                        </h3>
                        <h3 class="font-weight-regular text-center">
                            Partilhe connosco as suas experiências e conheça a de tantos outros!
                        </h3>
                        <h3 class="font-weight-regular text-center">
                            Conte-nos a sua história!
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
</template>




<script>
import VueScrollSnap from "vue-scroll-snap";

    export default {
        name: 'homeOut',
        data() {
            return { 
            }
        },
        components: {
            VueScrollSnap
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


.see_all {
    justify-content:center;
    color: #4F4E81;
}

.see_all:hover {
    text-decoration: underline;
    color: #015AEE; 
}


</style>