<template> 
<div>
<!--our card-->   
<v-card class="card1">
  <v-card-title>
    <h2 class="font-weight-light display-1">Mes rapports</h2>
  </v-card-title>
  <v-divider></v-divider>
  <v-card-text>
<!--another one saad feat drake :p-->
    <v-card class="card2" flat>
      <v-card-text class="cardtext2">
<!--layout and fles to display visibility better-->
        <v-layout >
          <v-flex xs6 md2>
            <v-text-field outline  v-model="rechercher" label="Rechercher" prepend-icon="youtube_searched_for"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 md1>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-icon  v-on="on" class="refresh" medium>autorenew</v-icon>
              </template>
              <span>Refresh</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
<!--tableau-->
        <table>
          <tr>
            <th v-for="col in cols" :key="col.name">{{col.name}}</th>
          </tr>
          <tr v-for="rap in filteredrapp" :key="rap.seqId">
            <td>{{rap.seqId}}</td>
            <td>{{rap.label}}</td>
            <td>{{rap.type}}</td>
<!--Planifié ou non-->
            <td v-if="rap.generatedOnDemand">Non</td>
            <td v-if="!rap.generatedOnDemand">Oui</td>
 <!--Fin Planifié ou non-->           
            <td>{{rap.startDate}}</td>
            <td>{{rap.endDate}}</td>
<!--Affichage des voitures-->
            <td >
                <v-btn @click="afficherVeh(rap)" flat>Afficher ({{rap.vehicleIds.length}})</v-btn>
            </td>
<!--fin affichage voiture-->
<!--Etat-->
            <td v-if="rap.state=='COMPLETED'">
              <v-icon color="black" small class="btncomp">check_circle</v-icon>
            </td>
            <td v-if="rap.state=='IN_PROGRESS'">
              <v-icon color="black" small class="btncomp">settings</v-icon>
            </td>
<!--Fin Etat-->
<!--button icon-->
            <td class="btnicon" v-if="rap.state=='COMPLETED'">
              <!--VISUALISER-->
              <v-btn fab flat small title="Visualiser le rapport" router :to="'/visrap/' + rap.reportId">   
                  <v-icon>visibility</v-icon>
              </v-btn>
              <!--REPLAY-->
              <v-btn fab flat small title="Relancer le calcul" v-on:click="check(rap.reportId)"> 
                <v-icon>replay</v-icon>
              </v-btn>
              <!--DELETE-->
              <v-btn fab flat small title="Supprimer le rapport" v-on:click="dele(rap)">    
                <v-icon>delete</v-icon>
              </v-btn>
              <!--DOWNLOAD-->
              <v-btn fab flat small title="Téléchargement" v-on:click="download(rap.reportId)">    
                <v-icon>get_app</v-icon>
              </v-btn>
            </td>
            <!---->
            <td class="btnicon" v-if="rap.state=='IN_PROGRESS'">
              <v-btn fab flat small title="Arreter le calcul">    
                <v-icon>stop</v-icon>
              </v-btn>  
            </td>
<!--fin button icon-->
          </tr>
        </table>
      </v-card-text>
    </v-card> 
  </v-card-text>
<!--Afficher vehicule dialogue-->
</v-card> 
    <v-dialog
      v-model="dialog"
      width="540"
    >
      <v-card >
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <div class="font-weight-medium">{{vehid.length}}</div><div class="font-weight-light">Véhicules trouvés</div>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="dialog = false">Fermer</v-btn>
           
        </v-card-title>

        <v-card-text>
            <v-text-field outline small v-model="rechercherpop" label="Rechercher" prepend-icon="youtube_searched_for"></v-text-field>
            <table>
                <tr>
                    <th v-for="col in colpop" :key="col.name">{{col.name}}</th>
                </tr>
                <tr  v-for="vehsort in vehid" :key="vehsort">
                    <template v-for="veh in filteredrapp1" >
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
<!--fin afficher veh dialogue-->
<!--suppresion dialogue-->
<v-dialog v-model="dialog1" persistent width="700">
  <v-card>
    <v-card-title class="headline">Suppression de modèle</v-card-title>
    <v-divider></v-divider>
    <v-card-text>Attention vous étes sur le point de supprimer le modèle : {{sup}}.</v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="dialog1 = false">Annuler</v-btn>
      <v-btn color="error" text @click="supprimer()">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</div>   
</template>
<script>
import reporting_api from '../plugins/axios/reporting'
import relay_api from '../plugins/axios/relay'
  export default {
    data(){
      return{
        //dyal popup
        vehid:[],
        dialog: false,
        rechercherpop:'',
        matriculepop:[],
        colpop:[
          {name:'Matricule'},
          {name:'Code'},
          {name:'Conducteur'},
        ],
        //fin
        sup:'',
        rapDel:[],
        dialog1:false,
        rechercher:'',
        rapport:[],
        id:{
          idv:[],
          leng:0
          
        },
        cols:[
          {name:'Id'},
          {name:'Libellé'},
          {name:'Type'},
          {name:'Planifié'},
          {name:'Départ'},
          {name:'Fin'},
          {name:'Véhicules'},
          {name:'État'},
          {name:''},
        ]
      }
    },
    created(){
        reporting_api.get('reports')
        .then((rapp) => {
            this.rapport=rapp.data       
        }).catch((e)=>{
        console.error(e)
          })  
        relay_api.get('users/496/vehicles?with=relationships')
        .then((response) => {
            this.matriculepop = response.data;
        }).catch((e)=>{
            console.error(e)
        })

    },
  methods:{
    download:function(id){
      window.open('https://kpi.jp.co.ma:8443/reports/download_xls/'+id+'?Authorization=Bearer+eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxYTZmMzlhMmE5ZTMwOGE0ZDA3MGNiN2Y4ZjRjNjhmMGZmMmQ1NTJlMTYxZDljNzRjMDNkMjhmNzM1NjA0ZGMyYTUxMjVkNWU2ZjFiM2VmIn0.eyJhdWQiOiIyIiwianRpIjoiNzFhNmYzOWEyYTllMzA4YTRkMDcwY2I3ZjhmNGM2OGYwZmYyZDU1MmUxNjFkOWM3NGMwM2QyOGY3MzU2MDRkYzJhNTEyNWQ1ZTZmMWIzZWYiLCJpYXQiOjE1NjUwODcyMzUsIm5iZiI6MTU2NTA4NzIzNSwiZXhwIjoxNTY1NjkyMDM1LCJzdWIiOiI0OTYiLCJzY29wZXMiOltdfQ.dzxl4CRvufR7sB1J1wIfeJ7EdeIYmdwoiPPtvgwYnlCBODyJemA3iAniZrRAGPznVW_mvN--HxRAec4WhwnS8NNTmWE3VF6-LhtoDLAOGWt7l1VUfC5Clj-j84Kmgs3s-5mIO6_i0NJnLwB1i2Dta_NnvJcYA-xcM9pTGHmVkR9HHCsndmY4Je2KS5YId-8ERM8RYMj-_11SjDH1L478MiflHh_eUYJwcmCTVkvL09TdCdSVa2xstFVVjKhygpWE-qxtkxg3Fx3wlOV3ITM0g08FR5Luwpdhvafal8pd92LRt6UdCBnWANCZ5tNcZSLUbPKHFFBMEt360fjJ68uaUnIZRm4w5J2dHqpPymL3uwzNkIHvxTVpeJUxUevv7WAp2W0rLOtEdOOeADcYXeLJE3xau4UOFAct2xY8UV0YFg5v1suUiUOqeNS3tCRGYrRikU113F5F-0FPaD72nu3LZyEbrIV-847lBwRAWhNKjTeopZoQWtOXH0CenqD558eXWehJIuES1FuNxXDwfL40psJwUzoVpM9814lfa6mKppnU1WMTyl0B3A9zhVBdekbejeAmhRGw00UK3deSV9Nn9t9gnKlfOqu-HSD7KvD0D65ZL-4lFJIla3TmRa-XVZDvFMu4D9_qIPOmH4M94IIMiZnNQ5h5vg-n1gmi4yua_xU')
    },
    dele(rappo){
      this.sup=rappo.seqId
      this.rapDel=rappo
      this.dialog1=true
    },
    supprimer(){
      reporting_api.delete('reports/'+this.rapDel.reportId)
      .then(() => {
          const idx=this.rapport.indexOf(this.rapDel)
          console.log(idx)
          this.rapport.splice(idx, 1)
          this.dialog1=false
        }).catch((e)=>{
          console.error(e)
        })  
    },
    afficherVeh(rap){
      this.vehid=rap.vehicleIds
      this.dialog=true
    },
    refresh: function(){
        reporting_api.get('reports')
        .then((rapp) => {
            this.rapport = rapp.data
          }).catch((e)=>{
            console.error(e)
          }) 
          //console.log("refreshed");
    },

    check: function(){
        //recalculer fonction

    }
  },
  computed: {
    filteredrapp: function(){
      return this.rapport.filter((rappo) => {
        return rappo.startDate.match(this.rechercher);
      });
    },
    filteredrapp1: function(){
      return this.matriculepop.filter((mat) => {
        return mat.name.match(this.rechercherpop);
      });
    }
    }
  }
</script>

<style scoped>
.v-card.card1 {
  margin-top: 25px;
}
.v-card.card2 {
  border: 0.5px solid #E0E0E0;

}
.v-divider{
  margin: 17px;
}
.refresh{
  margin-left: 70px;
  margin-top: 20px;
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
  background-color: #eee;
}
.v-btn{
  margin: 0px;
}
.btnicon{
  text-align: center;
}
.btncomp{
  margin-left: 10px;
}


</style>
