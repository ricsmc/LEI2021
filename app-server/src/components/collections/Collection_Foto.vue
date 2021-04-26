<template> 
    <div id="collection_foto">

        <div class="carddAlone" v-if="image">
          <img :src="`http://localhost:1337`+this.image.url"/>
        </div>
         
        <div class="cardd" v-else-if="urls.length>=4">
              <v-row>
                  <img :src="`http://localhost:1337`+this.urls[0]"/>
                  <img :src="`http://localhost:1337`+this.urls[1]"/>
              </v-row>
              <v-row>
                  <img :src="`http://localhost:1337`+this.urls[2]"/>
                  <img :src="`http://localhost:1337`+this.urls[3]"/>
              </v-row>
        </div> 

        <div class="carddAlone" v-else-if="urls.length>0">
          <img :src="`http://localhost:1337`+this.urls[0]"/>
        </div>

        <div class="carddAlone" v-else>
          <img src="https://atasouthport.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
        </div>

    </div>
</template>



<script>

export default {
    name: 'collection_foto',
    props: {
        urls : Array,
        image : Object
    }
}    

</script>
