<template>
    <v-container v-if="collection">
     
      <v-row class="header">
          <v-col cols="4">  
          
            <div class="cardd" v-if="urls.length>=4">
                  <v-row>
                      <img :src="`http://localhost:1337`+this.urls[0]"/>
                      <img :src="`http://localhost:1337`+this.urls[1]"/>
                  </v-row>
                  <v-row>
                      <img :src="`http://localhost:1337`+this.urls[2]"/>
                      <img :src="`http://localhost:1337`+this.urls[3]"/>
                  </v-row>
            </div> 

            <div class="carddAlone" v-else>
              <img :src="`http://localhost:1337`+this.urls[0]"/>
            </div>

          </v-col>
          
          <v-col cols="8" style="margin-left:-100px">

            <h1>{{collection.name}}</h1>
           
            <div class="descricao">
              <p><b>Descrição</b> : ainda nao tem mas agora imagina que tem so para o texto ficar grande e conseguir testar como irá ficar no futuro</p>
            </div>
            
            <div class="nameCreater">
              <a :href="'/users/'+collection.utilizador.id">
                <b> {{collection.utilizador.username}} </b>
              </a>
              <span v-if="collection.memories.length==1">- {{collection.memories.length}} memória </span>
              <span v-else>- {{collection.memories.length}} memórias </span>
            </div>

          </v-col>
      </v-row>

      <v-row v-if="collection.memories.length>0" class="listMemories">
        <v-col cols="12"> 
          <v-data-table
            dark
            :headers="headers"
            :items="collection.memories"
            :hide-default-footer="true"
            @click:row="handleClick"
            class="elevation-1">
            <template v-slot:[`item.images`]="{ value }">
              <img v-if="value.length==0" src="https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg" height="80px" width="140">
              <img v-else :src="`http://localhost:1337`+value[0].url" height="80px" width="140">    
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              {{value.split("T")[0]}}
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row class="searchBar">
        <v-col cols="12"> 
          <p> Vamos encontrar memórias para adicionares à tua coleção!</p>
          <v-toolbar dense floating>
             <v-text-field
               hide-details
               prepend-icon="mdi-magnify"
               single-line
             ></v-text-field>
          </v-toolbar>
        </v-col>
      </v-row>


    </v-container>
</template>


<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          collection: '',
          urls: [],
          headers: [
            { text: 'Memória', align: 'center', sortable: false, value: 'images'},
            { text: 'Titulo', align: 'center',value: 'title' },
            { text: 'Data de criação',align: 'center', value: 'createdAt' },
          ]
        }  
    },
    methods: {
      handleClick: function(value){
          this.$router.push('/memories/' + value.id)
      }
    },
    watch: {
      'collection': function() {
        this.urls=[]
        this.collection.memories.forEach(memory => {
          if (memory.images.length>0) {
            this.urls.push(memory.images[0].url)
          }
        });
      }
    },
    apollo: {
      collection:{
        query: gql`query Collection ($id: ID!){
            collection (id: $id) {
                id
                name
                public
                createdAt
                utilizador {
                  username
                  id
                }
                memories {
                  id
                  title
                  createdAt
                  images {
                    url
                  }
                }
            }
        }
      `,
      variables(){
        return {
          id: this.$route.params.id
        }
      }
    } 
  }
}
</script>



<style> 

h1 {
   padding: 15px 0 15px 0;
}



.header a,b {
  text-decoration: none;
  color: black;
}


.header a:hover {
  color: black;
  text-decoration: underline;
}

.descricao {
  margin-top:30px;
}

.nameCreater {
  margin-top:50px;
}

.header {
  margin-top:40px;
  background-color: cadetblue;
}

.listMemories{
  background-color: coral;
}

.searchBar {
  background-color: cyan;
}

.cardd {
  margin-left:30px;
  margin-top: 10px;
}

.carddAlone {
  margin-left:10px;
}


.cardd img {
  width: 120px;
  height: 120px;
}

.carddAlone img {
  width: 240px;
  height: 240px;
}
</style>