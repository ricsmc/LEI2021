 <template>
   <div id="MemoryCard">
        
    <v-container fluid grid-list-xl>         
        <v-card class="card" dark >
            <h5>{{ item.number }}</h5>   
            <img v-if="item.src" :src="`http://localhost:1337`+item.src">
            <img v-else :src="`https://lh3.googleusercontent.com/proxy/9b7tfuzRKz4ucWyl6XQOc9leh7j3nbwS3kNvxOvLjrsYp3WPeFhDjPd5xqQt_ENx4krbYEKaWS1cx3qcRxtoIv4jcJi9d1IHR6eXCbqYSXvMT1yrGg`">
            <p>{{ item.title }}</p> 
        </v-card>
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

.card {
    width: 150px;
    height: 180px;
}

.card h5 {
    color: gray;
}

.card img {
    height: 80px;
    width: 150px;
}
</style>