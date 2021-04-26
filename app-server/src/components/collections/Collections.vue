<template>
  <div id="collections">
    <h1 style="padding: 20px 0px 40px 0px; text-align: center; ">Coleções</h1>
    <p style="text-align: center"> Foram encontrados {{this.number}} resultados! </p>
    
    <v-container>
      <v-row>
        <v-col cols="2">
            <v-select
            :items="values"
            v-model="filter"
            light
            label="Field">
            </v-select>
        </v-col>
        <v-col  cols="2">
            <v-text-field 
            type="text" 
            v-model="word" 
            label="Word">
            </v-text-field>        
        </v-col>
        <v-col  cols="2">
            <v-btn style="margin-top:10px" dark @click="procurar()"> 
              Search
            </v-btn>        
        </v-col>
      </v-row>
    </v-container>
    
    
    <v-container>
      <Horizontal_List :flag="'collections'" :items="collections" :page="pag" :filter="filter" :totalPags="totalPags" :value="word" @update:items="update" @updatePag:page="updatePag"/>
    </v-container>
    

  </div>
</template>


<script>
// @ is an alias to /src
import Horizontal_List from '@/components/memories/Horizontal_List_Pag.vue'
import gql from 'graphql-tag'
import axios from 'axios'

export default {
  name: 'Collections',
  components: {
   Horizontal_List
  },
  data() {
    return {
      pag:0,
      number: 0,
      totalPags: 0,
      word: "",
      filter: "",
      values: ['name']
    }
  },
  methods: {
    update(value){
      this.collections=value;
    },
    updatePag(value){
      this.pag=value;
    },
    async procurar() {
      if (this.filter) {
        var token = localStorage.getItem('jwt')
        await axios.get('http://localhost:1337/collections/count?'+this.filter+'_contains=' + this.word ,{headers: {'Authorization': `${token}`}})
          .then(response => {
            this.pag=0
            this.number = response.data
            this.totalPags = Math.floor(this.number/4)
            if ((this.number%4)!=0) this.totalPags = this.totalPags + 1  
          })
          .catch(error => console.log(error))
        
        var result = await this.$apollo.query({
          query: gql`
            query Collections ($value: String!)  {
              collections(where: { ${this.filter}_contains: $value },limit:4) {
                id
                name
              }
            }
          `,
          variables: {
            value: this.word,
          },
        })
        this.collections = result.data.collections
      }
    }
  },
  apollo: {
    collections: {
      query: gql`
      query Collections {
        collections(limit:4) {
          id
          name
        }
      }
    `
    }
  },
  mounted () {
    var token = localStorage.getItem('jwt')
    axios.get('http://localhost:1337/collections/count',{headers: {'Authorization': `${token}`}})
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


</style>