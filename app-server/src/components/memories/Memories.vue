<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 40px 0px; text-align: center; ">Memories</h1>
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
      <Horizontal_List :items="memories" :page="pag" :filter="filter" :totalPags="totalPags" :value="word" @update:items="update" @updatePag:page="updatePag"/>
    </v-container>
    

  </div>
</template>


<script>
// @ is an alias to /src
import Horizontal_List from '@/components/memories/Horizontal_List_Pag.vue'
import gql from 'graphql-tag'
import axios from 'axios'

export default {
  name: 'Memories',
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
      values: ['title','content']
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
        var token = localStorage.getItem('jwt')
        await axios.get('http://localhost:1337/memories/count?'+this.filter+'_contains=' + this.word ,{headers: {'Authorization': `${token}`}})
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
              memories(where: { ${this.filter}_contains: $value },limit:4) {
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


</style>