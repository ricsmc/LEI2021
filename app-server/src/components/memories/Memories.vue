<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
    <p style="text-align: center"> Foram encontrados {{this.number}} resultados! </p>
    
    <v-col  class="input" cols="12">

        <v-select
        :items="values"
        v-model="filter"
        light
        label="Field">
        </v-select>

        <v-text-field 
        type="text" 
        v-model="word" 
        label="Word"
        @change="procurar()">
        </v-text-field>
        
    </v-col>
    
    <div>
      <Horizontal_List :items="memories" :filter="filter" :totalPags="totalPags" :value="word" @update:items="update"/>
    </div>

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
    async procurar() {
      if (this.filter) {
        var token = localStorage.getItem('jwt')
        await axios.get('http://localhost:1337/memories/count?'+this.filter+'_contains=' + this.word ,{headers: {'Authorization': `${token}`}})
          .then(response => {
            this.number = response.data
            this.totalPags = Math.floor(this.number/4) + 1
          })
          .catch(error => console.log(error))
        
        var result = await this.$apollo.query({
          query: gql`
            query Memories ($value: String!)  {
              memories(where: { ${this.filter}_contains: $value }) {
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
        memories {
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
         this.totalPags = Math.floor(this.number/4) + 1
         })
       .catch(error => console.log(error))
  }
}
</script>




<style>

html, body { 
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}

.input{
  width: 200px;
  margin-left: 200px;
}

</style>