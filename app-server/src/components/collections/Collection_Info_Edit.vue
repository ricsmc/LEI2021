<template>
    <v-container v-if="collection">
     
      <v-row class="header">
          <v-col cols="4">
            <div @click="chooseImg()" class="image" >
              <Foto :urls="urls" :image="collection.collection_picture"/>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              >
            </div>
          </v-col>
          
          <v-col cols="8" style="margin-left:-50px">
            <v-row>
              <h1>{{collection.name}}</h1>

              <v-col offset="8">
                <EditHeader :collection="collection"/>
              </v-col>
            </v-row>

            <div class="descricao" v-if="collection.description">
              <p><b>Descrição</b> :  {{collection.description}} </p>
            </div>

            <div class="descricao" v-else>
              <p><b>Descrição</b> : Sem descrição!</p>
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
        <v-col cols="12" class="ma-0 pa-0"> 
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
            <template v-slot:[`item.id`]="{ value}" >
              <v-icon small color="red" @click.stop="remove(value)">
                X
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row class="searchBar" >
        <v-col cols="12" align="center" justify="center"> 
          <p> Vamos encontrar memórias para adicionares à tua coleção!</p>
          <v-toolbar dense floating width="27.5rem">
             <v-text-field
               flat solo
               autocomplete="off"
               type="text"
               hide-details
               v-model="search"
               placeholder="Procurar memórias"
               prepend-icon="mdi-magnify"        
             ></v-text-field>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row class="searchList" v-if="searchList.length>0">
        <v-col cols="8" offset="2" class="pa-4"> 
          <v-data-table
            :headers="headerSearchList"
            :items="searchList"
            :hide-default-header="true"
            :hide-default-footer="true"
            class="elevation-1">
            <template v-slot:[`item.images`]="{ value }">
              <img v-if="value.length==0" src="https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg" height="40px" width="70">
              <img v-else :src="`http://localhost:1337`+value[0].url" height="40px" width="70">    
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              {{value.split("T")[0]}}
            </template>
            <template v-slot:[`item.id`]="{ value }">
              <p text v-if="pertenceList(value)" small style="color:#5f9ea0; margin-top:10px">
                Já adicionado!
              </p>
              <v-btn v-else small color="#5f9ea0" @click="addMemory(value)">
                Adicionar
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>




    </v-container>
</template>


<script>
import EditHeader from '@/components/collections/Collection_Header_Edit.vue'
import Foto from '@/components/collections/Collection_Foto.vue'
import axios from 'axios'
import gql from 'graphql-tag'

export default {
    data() {
        return{
          collection: '',
          searchList: [],
          search:"",
          selectedFile: null,
          urls: [],
          headers: [
            { text: 'Memória', align: 'center', sortable: false, value: 'images'},
            { text: 'Título', align: 'center',value: 'title' },
            { text: 'Data de criação',align: 'center', value: 'createdAt' },
            { text: 'Remover', align:'center', sortable: false, value: 'id'}
          ],
          headerSearchList: [
            { text: 'Memória', align: 'center', sortable: false, value: 'images'},
            { text: 'Titulo', align: 'center', value: 'title' },
            { text: 'Data de criação',align: 'center', value: 'createdAt' },
            { text: 'Adicionar',align: 'center', sortable: false, value: 'id' },
          ]
        }  
    },
    components: {
      Foto,
      EditHeader
    },
    methods: {
      handleClick: function(value){
          this.$router.push('/memories/' + value.id)
      },
      chooseImg() {
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        var idCollection = this.$route.params.id
        this.selectedFile = e.target.files[0]
        let formData = new FormData();
        const file = this.selectedFile;
        formData.append(`files.collection_picture`, file, file.name);
        var json = {}
        json['utilizador'] = localStorage.getItem('id')
        var token = localStorage.getItem('jwt')
        formData.append("data", JSON.stringify(json))
        axios.put("http://localhost:1337/collections/"+idCollection, formData , {headers: {'Authorization': `${token}`}})
          .then(() => {
            this.$router.go()
          })
          .catch(err => {
            console.log(err)
          })
      },
      pertenceList(id) {
        var index = this.collection.memories.map(function(item) { return item.id; }).indexOf(id);
        if (index==-1) return false;
        else return true;
      },
      remove(id) {
        var idCollection = this.$route.params.id
        var token = localStorage.getItem('jwt')
        axios.put("http://localhost:1337/memories/"+id+"/removeFromCollections",  {idCollection}, {headers: {'Authorization': `${token}`}})
          .then(() => {
            var index = this.collection.memories.map(function(item) { return item.id; }).indexOf(id);
            this.collection.memories.splice(index, 1);
          })
          .catch(err => {
            console.log(err)
          })
      },
      addMemory(id) {
        var idCollection = this.$route.params.id      
        var token = localStorage.getItem('jwt')
        axios.put("http://localhost:1337/memories/"+id+"/addToCollections",  {idCollection}, {headers: {'Authorization': `${token}`}})
          .then(() => {
            var index = this.searchList.map(function(item) { return item.id; }).indexOf(id);
            var memory = this.searchList[index]
            this.collection.memories.push(memory)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async getInfo(valor) {
        var result = await this.$apollo.query({
          query: gql`
            query Memories ($value: String!, $limit: Int!)  {
              memories(where: { title_contains: $value }, limit:$limit) {
                id
                title
                createdAt
                images {
                  url
                }
              }
            }
          `,
          variables: {
            value: valor,
            limit: 10,
          },
        });
        this.searchList = result.data.memories
      }
    },
    watch: {
      'collection.memories': function() {
        this.urls=[]
        this.collection.memories.forEach(memory => {
          if (memory.images.length>0) {
            this.urls.push(memory.images[0].url)
          }
        });
      },
      'search': function() {
        this.getInfo(this.search);
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
                description
                collection_picture {
                  url
                }
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

.header h1 {
   padding: 15px 0 15px 10px;
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
  background-color: #5f9ea0;
}

.searchBar {
  background-color: cadetblue;
}

.listMemories {
  background-color: cadetblue;
}



.searchList {
  background-color: cadetblue;
}


.cardd {
  margin-left:30px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.carddAlone {
  margin-left:15px;
}


.cardd img {
  width: 120px;
  height: 120px;
}

.carddAlone img {
  width: 240px;
  height: 240px;
}


.image {
  cursor: pointer;
}



</style>