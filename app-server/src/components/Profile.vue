<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="text-center">
                <v-avatar size="100">
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
              </div>
              <div class="widget-user-header bg-light">
                <h3 class="center">
                    <p class="text-center">Pierre Gasly</p>
                </h3>
              </div>

            <div class="text-center">
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-6 border-right">
                    <div class="description-block">
                      <h5 class="description-header">3200</h5>
                      <span class="description-text">MEMORIES</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-6 border-right">
                    <div class="description-block">
                      <h5 class="description-header">10</h5>
                      <span class="description-text">COLLECTIONS</span>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
            </div>
            </div>
        </div>

    <v-container>
        <v-data-table :headers="headers1" :items="memories" :items-per-page="5" class="elevation-1" @click:row="handleClick">
        </v-data-table>
    <!--<v-btn @click="handleClick1">Back</v-btn> -->
    </v-container>

    <v-container>
        <v-data-table :headers="headers2" :items="collections" :items-per-page="5" class="elevation-1" @click:row="handleClick">
        </v-data-table>
    <!--<v-btn @click="handleClick1">Back</v-btn> -->
    </v-container>
    </div>
</template>



<script>
import gql from 'graphql-tag'
export default {
    data() {
        return{
          headers1: [
            {
                text:'Title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            {
                text:'Local',
                value:'local'
            }
        ],
          headers2: [
            {
                text:'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text:'Public',
                value:'public'
            }
        ]

        };
    },
    apollo: {
    memories: gql`
      query Memories {
        memories(where:{utilizador: "605788c94f801e6697d497d0"}){
          id
          title
          local
        }   
      }
    `,
    collections: gql`
      query Collections {
        collections(where:{utilizador: "605788c9fc49c376a90dccbc"}){
          id
          name
          public
        }
      }
    `
        
},
    
  methods : {
      handleClick: function(value){
          this.$router.push('/profile/' + value.id)
      }
  }
}
</script>

