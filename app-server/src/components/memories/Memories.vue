<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
    <p style="text-align: center"> Foram encontrados {{this.memories.length}} resultados! </p>
    
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
      values: ['Title','Content']
    }
  },
  methods: {
    async procurar() {
      var result
      if (this.filter=="Title") {
        result = await this.$apollo.query({
          query: gql`
            query Memories ($title: String!)  {
              memories(where: { title_contains: $title }) {
                id
                title
                images {
                  url
                }
              }
            }
          `,
          variables: {
            title: this.word,
          },
        })
        this.memories = result.data.memories
      }
      else if (this.filter=="Content") {
        result = await this.$apollo.query({
          query: gql`
            query Memories ($content: String!)  {
              memories(where: { content_contains: $content }) {
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
            content: this.word,
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