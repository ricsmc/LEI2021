<template> 
    <div id="new_collection">
        <v-dialog max-width="400px" v-model="dialog">
            <template v-slot:activator="{ on }">
                <a v-on="on"> Nova Coleção </a>
            </template>
            <v-card >
                <v-card-text >
                    <v-container>

                        <h1 style="text-align:center">Nova Coleção</h1>

                        <v-col cols="12">
                            <v-text-field 
                            prepend-icon="mdi-account"
                            type="text" 
                            v-model="name" 
                            label="Nome"
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12">
                            <v-textarea 
                            outlined 
                            :counter="200"
                            :rules="[v => (v || '' ).length <= 200 || 'Descrição deverá conter 200 caracteres ou menos']"
                            type="text" 
                            prepend-icon="mdi-pencil" 
                            v-model="descricao"  
                            label="Descrição"
                            ></v-textarea>
                        </v-col>

                        <v-container>
                          <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-ripple="{ class: 'primary--text' }" width="150" style="height:40px" class="white--text" elevation="1" v-on:click="newCollection()" color="#4F4E81">Criar</v-btn>
                        </v-container>

                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>



<script>
import axios from 'axios'


export default {
    name: 'new_collection',
    data() {
        return {
            name: "",
            descricao: "",
            dialog:false,
        }
    },
    methods: {
      newCollection() {
        var json = {}
        json['name'] = this.name
        json['public'] = false
        json['utilizador'] = localStorage.getItem('id')
        //json['descricao'] = this.descricao
        var token = localStorage.getItem('jwt')
        axios.post("http://localhost:1337/collections",  json ,{headers: {'Authorization': `${token}`}})
          .then(data => {
            this.$router.push('/collections/' + data.data.id)
            this.$router.go()
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
}    

</script>

