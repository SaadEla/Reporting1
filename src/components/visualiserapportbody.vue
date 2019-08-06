<template> 
<!--our card-->   
<v-card class="card">
  <v-card-title  >
        <h2 class="font-weight-light display-1">Visualisation de rapport</h2>
        <v-spacer></v-spacer>
        <v-btn class="ma-2"  small v-on:click="downloadvis()">
        <v-icon >save_alt</v-icon> 
        <span class="text-capitalize mr-0" > Exporter </span>
        </v-btn> 
        <v-btn class="ma-2" color="success" small v-on:click="imprimer()">
            <span class="text-capitalize">Imprimer</span>
        </v-btn>
  </v-card-title>
  <v-divider></v-divider>
  <v-card-text>
<!--info card-->
    <v-card class="card2" flat >
        <v-card-text class="cardtext2">
              <v-layout>
                  <v-flex md6 xs12>
                      <span class="font-weight-medium blue--text mr-5">N° :</span>
                      <span>{{info.seqId}}</span>
                  </v-flex>
                  <v-flex md6 xs12>
                      <span class="font-weight-medium blue--text mr-5" >Période :</span>
                      <span>{{info.startDate}} - {{info.endDate}}</span>
                  </v-flex>
              </v-layout><br/>
              <v-layout>
                  <v-flex md6 xs12>
                      <span class="font-weight-medium blue--text mr-5">Intitulé :</span>
                      <span>{{info.label}}</span>
                  </v-flex>
                  <v-flex md6 xs12>
                      <span class="font-weight-medium blue--text mr-5" >Spécificités :</span>
                      <span>Durée minimale : {{info.minStopDuration}}</span><br/>
                      <span class="infoTopDist">Distance maximale : {{info.minDistance}}</span>
                  </v-flex>
              </v-layout><br/>
              <v-layout>
                  <v-flex md6 xs12>
                      <span class="font-weight-medium blue--text mr-5">Type :</span>
                      <span>{{info.type}}</span>
                  </v-flex>
              </v-layout>
        </v-card-text>
    </v-card><br/>
<!-- fin info card-->
<!--button en dessus du tableau-->
      <div id="tab">
      <div v-for="(rap,index) in info.vehicleIds" :key="rap">
        <div v-for="vehicule in veh" :key="vehicule.id">
          <template v-if="rap==vehicule.id">
            <v-layout class="visuali">
                <v-flex md11>
                    <v-btn color="deep-purple darken-4 white--text" tile class="bt1 ml-1">{{vehicule.registration_number}} / {{vehicule.driver}}</v-btn>
                </v-flex>
                <v-flex md1>
                    <v-btn color="deep-purple darken-4 white--text text-capitalize" tile class="bt2 " >Visualiser</v-btn>
                </v-flex>
            </v-layout>
          </template>
        </div>
    <!-- fin button en dessus du tableau-->
    <!--Grand tableau-->
        <table>
            <tr>
                <th v-for="col in colums" :key="col.name">{{col.name}}</th>
            </tr>
            <tr v-for="(vehtrips,indexa) in info.vehicleTrips[index].trips" :key="indexa">
              <template >
                <td>{{indexa}}</td>
                <td>{{vehtrips.convertedData[0].value}}</td>
                <td>{{vehtrips.convertedData[1].value}}</td>
                <td>{{vehtrips.convertedData[2].value}}</td>
                <td>{{vehtrips.convertedData[3].value}}</td>
                <td>{{vehtrips.convertedData[4].value}}</td>
                <td>{{vehtrips.convertedData[5].value}}</td>
                <td>{{vehtrips.convertedData[6].value}}</td>
                <td>{{vehtrips.convertedData[7].value}}</td>
                <td >bb</td>
                <td >aa</td>
                <td >ss</td>
                <td >
                  <v-btn   small >
                    <span class="text-capitalize mr-0">Voir</span>
                  </v-btn> 
                </td>
              </template>
            </tr>
        </table><br/>
<!--Fin Grand tableau-->
        <table class="tab2"  >
            <tr>
                <th v-for="coll in columsi" :key="coll.name">{{coll.name}}</th>
            </tr>
            <tr >
                <td>{{info.vehicleTrips[index].simpleStatistics.totalTraveledDistance}}</td>
                <td>{{info.vehicleTrips[index].simpleStatistics.nbrOfStops}}</td>
                <td>{{info.vehicleTrips[index].simpleStatistics.totalRunningDuration}}</td>
                <td>{{info.vehicleTrips[index].simpleStatistics.totalStopDuration}}</td>
                <td>{{info.vehicleTrips[index].simpleStatistics.maxSpeed}}</td>
            </tr>
        </table><br/>
        </div>
      </div>
  </v-card-text>
</v-card>       
</template>
<script>
import reporting_api from '../plugins/axios/reporting'
import relay_api from '../plugins/axios/relay'

  export default {
    data(){
      return{
        veh:[],
        info:[],
        id: this.$route.params.id,
        colums:[
          {name:'Numéro'},
          {name:'Date'},
          {name:'Heure démarrage'},
          {name:'Heure arrêt'},
          {name:"Secteur début"},
          {name:"Secteur fin"},
          {name:"Durée de marche"},
          {name:"Durée d'arrêt"},
          {name:'Distance(m)'},
          {name:'Vitesse Maximale (Km/h)'},
          {name:'Consommation Théorique (L)'},
          {name:'Température Moyenne (°C)'},
          {name:'Visualiser'},
        ],
        columsi:[
          {name:'Distance Parcourue'},
          {name:"Nombre d'arrêts"},
          {name:'Durée de Marche'},
          {name:"Durée d'Arrêt"},
          {name:'Vitesse Maximale '},
        ]
      }
    },
    methods:{
      downloadvis:function(){
        window.open('https://kpi.jp.co.ma:8443/reports/download_xls/'+this.info.reportId+'?Authorization=Bearer+eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxYTZmMzlhMmE5ZTMwOGE0ZDA3MGNiN2Y4ZjRjNjhmMGZmMmQ1NTJlMTYxZDljNzRjMDNkMjhmNzM1NjA0ZGMyYTUxMjVkNWU2ZjFiM2VmIn0.eyJhdWQiOiIyIiwianRpIjoiNzFhNmYzOWEyYTllMzA4YTRkMDcwY2I3ZjhmNGM2OGYwZmYyZDU1MmUxNjFkOWM3NGMwM2QyOGY3MzU2MDRkYzJhNTEyNWQ1ZTZmMWIzZWYiLCJpYXQiOjE1NjUwODcyMzUsIm5iZiI6MTU2NTA4NzIzNSwiZXhwIjoxNTY1NjkyMDM1LCJzdWIiOiI0OTYiLCJzY29wZXMiOltdfQ.dzxl4CRvufR7sB1J1wIfeJ7EdeIYmdwoiPPtvgwYnlCBODyJemA3iAniZrRAGPznVW_mvN--HxRAec4WhwnS8NNTmWE3VF6-LhtoDLAOGWt7l1VUfC5Clj-j84Kmgs3s-5mIO6_i0NJnLwB1i2Dta_NnvJcYA-xcM9pTGHmVkR9HHCsndmY4Je2KS5YId-8ERM8RYMj-_11SjDH1L478MiflHh_eUYJwcmCTVkvL09TdCdSVa2xstFVVjKhygpWE-qxtkxg3Fx3wlOV3ITM0g08FR5Luwpdhvafal8pd92LRt6UdCBnWANCZ5tNcZSLUbPKHFFBMEt360fjJ68uaUnIZRm4w5J2dHqpPymL3uwzNkIHvxTVpeJUxUevv7WAp2W0rLOtEdOOeADcYXeLJE3xau4UOFAct2xY8UV0YFg5v1suUiUOqeNS3tCRGYrRikU113F5F-0FPaD72nu3LZyEbrIV-847lBwRAWhNKjTeopZoQWtOXH0CenqD558eXWehJIuES1FuNxXDwfL40psJwUzoVpM9814lfa6mKppnU1WMTyl0B3A9zhVBdekbejeAmhRGw00UK3deSV9Nn9t9gnKlfOqu-HSD7KvD0D65ZL-4lFJIla3TmRa-XVZDvFMu4D9_qIPOmH4M94IIMiZnNQ5h5vg-n1gmi4yua_xU')
      },
      imprimer:function(){
        var headstr = "<html><head><title>JP track </title></head><br/><body><div style='font-size: 25px;margin-bottom:20px;'><span>JPtrack</span><span style='margin-left: 620px;'>"+this.info.startDate+"-"+this.info.endDate+"</span></div>";
        var footstr = "</body>";
        var newstr = document.getElementById('tab').innerHTML;
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = headstr+newstr+footstr;
        window.print();
        document.body.innerHTML = oldstr;
      }
    },
    created(){
        reporting_api.get('reports/'+ this.id)
        .then((rapp) => {
            this.info = rapp.data
          }).catch((e)=>{
            console.error(e)
          })  
        relay_api.get('users/496/vehicles?with=relationships')
        .then((response) => {
            this.veh = response.data;
        }).catch((e)=>{
            console.error(e)
        })

    },


  }
</script>

<style scoped>
.infoTopDist{
  margin-left: 128px;
}
.visuali{
    margin-bottom: -4px;
    margin-left: -3px;
}
.v-card {
  margin-top: 25px;
}
.v-card.card2 {
  border: 0.5px solid #E0E0E0;
}
.bt1{
    width:1180px;
}
.bt2{
    width:50px;
    margin-left: 19px;

}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
table.tab2 {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 75%;
  margin-left: 170px;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #eee;
  
}
</style>

