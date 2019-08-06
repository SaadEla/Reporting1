<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" flat icon color="grey">
                <v-icon title="Personaliser">settings</v-icon>
            </v-btn>
      </template>
      <v-card>
       <v-card-title class="headline primary lighten-2" primary-title>
          Personnaliser la colonne: <slot name="title"/>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <slot v-if='ligname=="Date"' name="Date"/>
              <slot v-if='ligname=="Heure Démarrage"' name="Heure Démarrage"/>
              <slot v-if='ligname=="Heure Arrêt"' name="Heure Arrêt"/>
              <slot v-if='ligname=="Secteur Début"' name="Secteur Début"/>
              <slot v-if='ligname=="Secteur Fin"' name="Secteur Fin"/>
              <slot v-if='ligname=="Durée de Marche"' name="Durée de Marche"/>
              <slot v-if='ligname=="Durée D\u0027arrêt"' name="Durée D'arrêt"/>
              <slot v-if='ligname=="Distance"' name="Distance"/>
              <slot v-if='ligname=="Vitesse Maximale"' name="Vitesse Maximale"/>
              <slot v-if='ligname=="Consommation Théorique"' name="Consommation Théorique"/>
              <slot v-if='ligname=="Température Moyenne"' name="Température Moyenne"/>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      dialog: false
    }),
    props: ['ligname'],

  }
</script>