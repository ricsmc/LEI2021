 <template>
   <div id="MemoryCard">
        
    <v-container fluid grid-list-xl>         
        <v-card class="card" dark >
            <h5>{{ number }}</h5>
            <img :src="src">
            <p>{{ title }}</p> 
        </v-card>
    </v-container>
  
  </div>   
</template>


<script>

export default {
  name: "MemoryCard",
  props: ['src','title','number']
}
</script>


<style>

.card {
    width: 150px;
    height: 200px;
}

.card h5 {
    color: gray;
}

.card img {
    height: 80px;
    width: 150px;
}
</style>