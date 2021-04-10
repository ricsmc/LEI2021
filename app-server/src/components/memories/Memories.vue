<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
    <p v-if="this.memories" style="text-align: center"> Foram encontrados {{this.memories.length}} resultados! </p>
    
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
      <Horizontal_List :items="memories"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Horizontal_List from '@/components/memories/Horizontal_List.vue'
import gql from 'graphql-tag'


export default {
  name: 'Memories',
  components: {
    Horizontal_List
  },
  data() {
    return {
      word: "",
      filter: "",
      values: ['title','content']
    }
  },
  methods: {
    async procurar() {
      if (this.filter) {
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