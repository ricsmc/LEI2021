 <template>
   <div id="MemoryCard">
          
    <v-card class="card" dark >
        <img v-if="item.images[0]" :src="`http://localhost:1337`+item.images[0].url">
        <img v-else :src="`https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg`">
        <h6>{{ item.title }}</h6> 
    </v-card>

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

.card {
  width: 160px;
  height: 170px;
}

.card h6 {
  color: gray;
}

.card img {
  padding: 10px 10px 10px 10px;
  height: 100px;
  width: 150px;
}
</style>