<template>
  <div class="memories">
    <h1 style="padding: 20px 0px 100px 75px; text-align: center; ">Memories</h1>
    <div>
      <Horizontal_List :items="items"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Horizontal_List from '@/components/Horizontal_List.vue'


export default {
  name: 'Memories',
  components: {
    Horizontal_List
  },
  data() {
    return {
      items: [
      { number: '1', title: "Desert", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '2', title: "Areia", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '3', title: "Camelo", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '4', title: "Pó", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '5', title: "Verão", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '6', title: "Calor", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '7', title: "Água", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '8', title: "Passeio", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      { number: '9', title: "Sede", src: `https://super.abril.com.br/wp-content/uploads/2018/07/57b342c70e21637197029eaedeserto.jpeg`},
      ]
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
  overflow: auto;
}


</style>