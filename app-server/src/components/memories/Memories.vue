<template>
  <div id="memories" class="memories">
    <h1>Memórias</h1>
    <p>Foram encontrados {{this.number}} resultados!</p>
    
    <v-container>
      <v-row>

        <v-col cols="2">
            <v-select
            :items="values"
            v-model="filter"
            light
            label="Filtro">
            </v-select>
        </v-col>

        <v-col cols="2">
            <v-text-field 
            type="text" 
            v-model="word" 
            label="Palavra">
            </v-text-field>        
        </v-col>

        <v-col cols="2">
            <v-btn style="margin-top:10px" dark @click="procurar()"> 
              Procurar
            </v-btn>        
        </v-col>

      </v-row>
    </v-container>
    
    <v-container>
      <HorizontalList 
      :flag="'memories'" 
      :items="memories" 
      :page="pag" 
      :filter="filter" 
      :totalPags="totalPags" 
      :value="word"
      @update:items="update" 
      @updatePag:page="updatePag"/>
    </v-container>

  </div>
</template>


<script>

import HorizontalList from '@/components/lists/Horizontal_List_Pag.vue'
import gql from 'graphql-tag'
import axios from 'axios'

export default {
  name: 'Memories',
  components: {
   HorizontalList
  },
  data() {
    return {
      pag:0,
      number: 0,
      totalPags: 0,
      word: "",
      filter: "",
      values: ['Título','Descrição']
    }
  },
  methods: {
    update(value){
      this.memories=value;
    },
    updatePag(value){
      this.pag=value;
    },
    async procurar() {
      if (this.filter) {
        var valor
        if (this.filter=='Título')  valor="title";
        if (this.filter=='Descrição')  valor="content";
        var token = localStorage.getItem('jwt')
        await axios.get('http://localhost:1337/memories/count?'+valor+'_contains=' + this.word ,{headers: {'Authorization': `${token}`}})
          .then(response => {
            this.pag=0
            this.number = response.data
            this.totalPags = Math.floor(this.number/4)
            if ((this.number%4)!=0) this.totalPags = this.totalPags + 1  
          })
          .catch(error => console.log(error))
        
        var result = await this.$apollo.query({
          query: gql`
            query Memories ($value: String!)  {
              memories(where: { ${valor}_contains: $value },limit:4) {
                id
                title
                content
                images {
                  url
                }
              }
            }
          `,
          variables: {
            value: this.word,
          },
        })
        this.memories = result.data.memories
      }
    }
  },
  apollo: {
    memories: {
      query: gql`
      query Memories {
        memories(limit:4) {
          id
          title
          images {
            url
          }
        }
      }
    `
    }
  },
  mounted () {
    var token = localStorage.getItem('jwt')
    axios.get('http://localhost:1337/memories/count',{headers: {'Authorization': `${token}`}})
       .then(response => {
          this.number = response.data
          this.totalPags = Math.floor(this.number/4)
          if ((this.number%4)!=0) this.totalPags = this.totalPags + 1  
         })
       .catch(error => console.log(error))
  }
}
</script>




<style>

.memories h1{
  padding: 20px 0px 40px 0px; 
  text-align: center;
}

.memories p{
  text-align: center
}

</style>