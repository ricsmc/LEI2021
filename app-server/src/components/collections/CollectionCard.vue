 <template>
   <div id="CollectionCard">
    <v-container style="padding:6px">
      <v-flex xs12>     
        <v-card dark class="mx-auto" max-width="400">
          <v-img 
            v-if="item.image" :src="`http://localhost:1337`+item.image.url"
            height="100px"
          >
          </v-img>
          <v-img 
            v-else :src="`https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg`"
            height="100px"
          >
          </v-img>
  
          <v-card-title>
              <h6>{{ item.name }}</h6>
          </v-card-title>
  
        </v-card>
      </v-flex>
    </v-container>

  </div>   
</template>


<script>

export default {
  name: "CollectionCard",
  props: {
    item: Object
  }
}
</script>


<style>

</style>