<template> 
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="540"
    >
      <template v-slot:activator="{ on }">
        <v-btn flat
          color="primary"
          light
          v-on="on"
        >
          Afficher
        </v-btn>
      </template>

      <v-card >
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <div class="font-weight-medium">{{vehid.leng}}</div><div class="font-weight-light">Véhicules trouvés</div>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="dialog = false">Fermer</v-btn>
           
        </v-card-title>

        <v-card-text>
            <v-text-field outline small v-model="rechercherpop" label="Rechercher" prepend-icon="youtube_searched_for"></v-text-field>
            <table>
                <tr>
                    <th v-for="col in colpop" :key="col.name">{{col.name}}</th>
                </tr>
                <tr  v-for="vehsort in vehid.idv" :key="vehsort">
                    <template v-for="veh in filteredrapp" >
                        <template v-if="vehsort==veh.id">
                            <td>{{veh.registration_number}}</td>
                            <td>{{veh.name}}</td>
                            <td >{{veh.driver}}</td>
                        </template>
                    </template>
                </tr>
            </table>
        </v-card-text>

      </v-card>
    </v-dialog>
  </div>     
</template>
<script>
import relay_api from '../plugins/axios/relay'

 export default {
    props:['vehid'],
    data () {
      return {
        dialog: false,
        rechercherpop:'',
        matriculepop:[],
        colpop:[
          {name:'Matricule'},
          {name:'Code'},
          {name:'Conducteur'},
        ]
      }
    },
    created(){
        relay_api.get('users/496/vehicles?with=relationships')
        .then((response) => {
            this.matriculepop = response.data;
        }).catch((e)=>{
            console.error(e)
        })
    },
    computed: {
    filteredrapp: function(){
      return this.matriculepop.filter((mat) => {
        return mat.name.match(this.rechercherpop);
      });
    }
    }

  }
</script>

<style scoped>
.font-weight-light{
    margin-left: 20px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color:#eee;
}

</style>
