<template> 
<!--our card-->   
<v-card class="card1">
  <v-card-title>
    <h2 class="font-weight-light display-1">Modèles et planification</h2>
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
              <v-btn color="primary">Ajouter</v-btn>
          </v-flex>
        </v-layout>
<!--tableau-->
        <table>
          <tr>
            <th v-for="col in cols" :key="col.name">{{col.name}}</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
<!--button icon-->
            <td v-if="planifie" class="btnicon">
              <!--Modifier-->
              <v-btn fab flat small title="Modifier">   
                  <v-icon>create</v-icon>
              </v-btn>
              <!--Cloner-->
              <v-btn fab flat small title="Cloner"> 
                <v-icon>filter_none</v-icon>
              </v-btn>
              <!--Activer-->
              <v-btn v-if="activer" fab flat small title="Désactiver">    
                <v-icon>highlight_off</v-icon>
              </v-btn>
              <v-btn v-if="!activer" fab flat small title="Activer">    
                <v-icon>check_circle_outline</v-icon>
              </v-btn>
              <!--supprimer-->
              <v-btn fab flat small title="Supprimer">    
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td v-if="! planifie" class="btnicon" >
              <!--Modifier-->
              <v-btn fab flat small title="Modifier">   
                  <v-icon>update</v-icon>
              </v-btn>
              <!--Cloner-->
              <v-btn fab flat small title="Cloner"> 
                <v-icon>filter_none</v-icon>
              </v-btn>
              <!--Lancer-->
              <v-btn fab flat small title="Lancer">    
                <v-icon>play_arrow</v-icon>
              </v-btn>
              <!--supprimer-->
              <v-btn fab flat small title="Supprimer">    
                <v-icon>delete</v-icon>
              </v-btn>
<!--fin button icon-->
            </td>
          </tr>
        </table>
      </v-card-text>
    </v-card> 
  </v-card-text>
</v-card>       
</template>
<script>
  export default {
    data(){
      return{
        rechercher:'',
        planifie:true,
        activer:false,
        cols:[
          {name:'Id'},
          {name:'Libellé'},
          {name:'Type'},
          {name:'Date de création'},
          {name:'Dérnière modification'},
          {name:'Planifié'},
          {name:'Véhicules'},
          {name:''},
        ]
      }
    },
  methods:{
    refresh: function(){
      console.log('COUCOU');
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
  padding-top: 0px;
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
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color:#eee;
}
.v-btn{
  margin: 0px;
}
.btnicon{
  text-align: center;
}


</style>
