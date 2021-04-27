 <template>
   <div id="CollectionCard">
    <v-container style="padding:6px">
      <v-flex xs12>     
        <v-card dark class="mx-auto" max-width="400">

          <div class="foto">
            <img v-if="item.collection_picture" :src="`http://localhost:1337`+item.collection_picture.url">
            <img v-else :src="`https://atasouthport.com/wp-content/uploads/2017/04/default-image-620x600.jpg`">
          </div>

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

.foto img{
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 100px;
  width: 100%;
}

</style>