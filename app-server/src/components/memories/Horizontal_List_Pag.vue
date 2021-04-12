<template>
  <div v-if="this.items" id="horizontal_pagination">
    <v-row >
        <v-col cols=12>
            <div class="horizontalList">
                
              <div class="left" >
                <button style="height: 200px;" id="left_button" @click="buscarInfo(-1)">
                  <i class="fa fa-angle-left fa-5x" ></i>
                </button>
              </div>

              <div class="center" id="content" ref="content">
                <div class="internal" v-for="item in items" :key="item.id">
                  <span @click="handleClick(item.id)"><MemoryCard :item="item" /></span> 
                </div>
              </div>

              <div class="right">
                <button style="height: 200px;" id="right_button" @click="buscarInfo(1)">
                  <i class="fa fa-angle-right fa-5x"></i>
                </button>
              </div>

            </div>
        </v-col>
    </v-row>

    <v-row justify="center">
        <div class="pagination">
            <b> ola </b>
        </div>
    </v-row>



  </div>
</template>






<script>

import MemoryCard from '@/components/memories/MemoryCard.vue'
import gql from 'graphql-tag'

export default {
  name: "Horizontal-Vue",
  data() {
    return {
      page:0,
      start:0,
      limit:4,
    }
  },
  components: {
    MemoryCard
  },
  props : {
    items : Array,
    value : String,
    filter: String,
    totalPags: Number,
  },
  methods: {
    handleClick(id){
      this.$router.push('/memories/' + id)
    },
    async buscarInfo(direction) {

      if (this.page==0 && direction=="-1") {return false}
      if (this.page==this.totalPags-1 && direction=="1") {return false}
      if (direction=="-1") {this.start = this.start - 4; this.page = this.page - 1}
      if (direction=="1")  {this.start = this.start + 4; this.page = this.page + 1}

      var result  
      if (this.filter) {
        result = await this.$apollo.query({
          query: gql`
            query Memories ($value: String!, $start: Int!, $limit: Int!)  {
              memories(where: { ${this.filter}_contains: $value }, start:$start, limit:$limit) {
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
            value: this.value,
            start: this.start,
            limit: this.limit,
          },
        })
      }
      else {
        result = await this.$apollo.query({
          query: gql`
            query Memories($start: Int!, $limit: Int!)  {
              memories( start:$start, limit:$limit) {
                id
                title
                images {
                  url
                }
              }
            }
          `,
          variables: {
            start: this.start,
            limit: this.limit,
          },
        })
      }
      this.$emit('update:items', result.data.memories)
    }
  }
}
</script>



    
<style>

.horizontalList {
  text-align: center;
  font-size: 20px;
}

.pagination{
   text-align: center;
  font-size: 20px;
}

.left{
 float: left; 
 width: 25%;
 height: 200px;
}

.internal{
 width: 25%;

 display: inline-block;
}


.center{
 float: left; 
 width: 50%;
 height: 200px;
 margin: 1px;
 overflow: hidden;
 white-space: nowrap;
}

.right{
  float: right; 
  width: 24.5%;
  height: 200px;
}

</style>