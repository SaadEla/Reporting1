<template>
<div>
    <div class=".font-weight-light" center>Choisir les colonnes du rapport</div><br/>
    <table>
        <tr>
            <th v-for="col in cols" :key="col.name">{{col.name}}</th>
        </tr>
        <tr  class="hov" v-for="(lig, index) in lignes" :key="lig.bool">
            <td v-bind:class="{notcheck:!lig.bool}">{{lig.name}}</td>
<!--if checked-->
                <td v-if="lig.bool" class="btns">
                    <v-btn flat icon color="green" @click="lig.bool = !lig.bool">
                        <v-icon>done_outline </v-icon>
                    </v-btn>
                </td>
                <td v-if="lig.bool" class="btns">
                    <v-btn flat icon color="grey" @click="arraymove(lignes, index, index+1)">
                        <v-icon title="Move down">arrow_downward</v-icon>
                    </v-btn>
                    <v-btn flat icon color="grey"  @click="arraymove(lignes, index, index-1)">
                        <v-icon title="Move up">arrow_upward</v-icon>
                    </v-btn>
                </td>
<!--Had td fiha les slooots waaa twiiiiiilaaaa ON VA PASSER LE NOM DE LA LIGNE DANS UN PROPS-->
                <td  v-if="lig.bool" class="btns">
                    <tabpopup v-bind:ligname="lig.name">
                      <template slot="title">{{lig.name}}</template>
<!--Date popup-->
                      <v-form slot="Date">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['05-06-2019(DD-MM-YYYY)', '05/06/2019(DD/MM/YYYY)', '05-06-19(DD-MM-YY)', '05/06/19(DD/MM/YY)', '05 juin. 2019(DD MMM YYYY)', '05 juin. 19(DD MMM YY)', 'mer. juin. 2019(ddd MMM YYYY)', 'mer. juin. 19(ddd MMM YY)', '05 06(DD MM)']" label="Format de date *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Heure Démarrage popup-->
                      <v-form slot="Heure Démarrage">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['09:24:51 (HH:mm:ss)','09:24 (HH:mm)', '09:24:51 am (hh:mm:ss a)', '09:24 am (HH:mm a)']" label="Format Heure du démarrage *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Heure Arrêt popup-->
                      <v-form slot="Heure Arrêt">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['09:24:51 (HH:mm:ss)','09:24 (HH:mm)', '09:24:51 am (hh:mm:ss a)', '09:24 am (HH:mm a)']" label="Format Heure arrêt *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Secteur Début popup-->
                      <v-form slot="Secteur Début">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Secteur Fin popup-->
                      <v-form slot="Secteur Fin">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Durée de Marche popup-->
                      <v-form slot="Durée de Marche">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Minute']" label="Unité (Minute)" v-bind:class="{ disabled: true }"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Durée D'arrêt popup-->
                      <v-form slot="Durée D'arrêt">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Minute']" label="Unité (Minute)" v-bind:class="{ disabled: true }"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Distance popup-->
                      <v-form slot="Distance">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['m','km']" label="Unité *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Vitesse Maximale popup-->
                      <v-form slot="Vitesse Maximale">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['km/h']" label="Unité *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Consommation Théorique popup-->
                      <v-form slot="Consommation Théorique">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['L','m3']" label="Unité *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
<!--Température Moyenne popup-->
                      <v-form slot="Température Moyenne">
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nom de la colonne"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['°C','°F','K']" label="Unité *"></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select :items="['Ascendant','Descendant']" label="Ordre *"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
                    </tabpopup>
                </td>
<!--if not checked-->
                <td v-if="!lig.bool" class="notcheck"><!--v-on:click="afficherbtn(index)" -->
                    <v-btn flat icon color="grey" @click="lig.bool = !lig.bool"  >
                        <v-icon>done_outline </v-icon>
                    </v-btn>
                </td>
                <td v-if="!lig.bool" class="notcheck"></td>
                <td v-if="!lig.bool" class="notcheck"></td>
        </tr>
    </table>
</div>
</template>

<script>
import tabpopup from './tabpopup'
  export default {
    data(){
      return{
        aff:true,
        arraymovelement:'',//FOR THE arrows
        ligname:'', //our props    
        cols:[
          {name:'Nom'},
          {name:'Afficher'},
          {name:'Ordre'},
          {name:''},
        ],
        lignes:[
          {name:'Date',bool:true},
          {name:'Heure Démarrage',bool:true},
          {name:'Heure Arrêt',bool:true},
          {name:'Secteur Début',bool:true},
          {name:'Secteur Fin',bool:true},
          {name:'Durée de Marche',bool:true},
          {name:"Durée D'arrêt",bool:true},
          {name:'Distance',bool:true},
          {name:'Vitesse Maximale',bool:true},
          {name:'Consommation Théorique',bool:true},
          {name:'Température Moyenne',bool:true},

        ]
      }
    },
    components:{ tabpopup },
    methods:{
    transporter: function(name){
      this.tabpop.ligname=name
    },
    arraymove:function(arr, fromIndex, toIndex){
        this.arraymovelement = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, this.arraymovelement);
    }
    }
  }
  
</script>
<style scoped>
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
tr.hov:hover {
  background-color: #eee;
}
.btns{
    text-align: center;
}
.disabled {
    pointer-events:none;
    color: #eee;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
    }
.notcheck{
  display: table-cell;
  text-align: center;
  background-color: #eee;
}
</style>

