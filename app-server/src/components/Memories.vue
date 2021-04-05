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
      { number: '1', title: "Desert", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '2', title: "Areia", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '3', title: "Camelo"},
      { number: '4', title: "Pó", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '5', title: "Verão", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '6', title: "Calor", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '7', title: "Água", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '8', title: "Passeio", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
      { number: '9', title: "Sede", src: `/uploads/1024_720_5bcdcfe3f2.jpg`},
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