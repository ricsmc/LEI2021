 <template>
   <div id="MemoryCard">
    <v-container>
      <v-flex xs12>     
        <v-card dark class="mx-auto" max-width="400">
          <v-img 
            v-if="item.images[0]" :src="`http://localhost:1337`+item.images[0].url"
            height="100px"
          >
          </v-img>
          <v-img 
            v-else :src="`https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg`"
            height="100px"
          >
          </v-img>
  
          <v-card-title>
              <h6>{{ item.title }}</h6>
          </v-card-title>
  
        </v-card>
      </v-flex>
    </v-container>

  </div>   
</template>


<script>

export default {
  name: "MemoryCard",
  props: {
    item: Object
  }
}
</script>


<style>

</style>