<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Informations générales</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Personnaliser les colonnes</v-stepper-step>

      <v-divider></v-divider>
<!--si il ya option notifier-->
      <v-stepper-step :complete="e1 > 3" step="3" v-if="notif">Notifications</v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step step="4" v-if="notif">Planification</v-stepper-step>
<!-- FIN si il ya option notifier-->
      <v-stepper-step step="3" v-if="!notif">Notifications</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
<!--stepper 1-->        
      <v-stepper-content step="1"  >
        <v-card class="mb-5" color="white">
            <step1 v-on:notifier="addstep($event)"/>
        </v-card>
        <v-btn color="primary" @click="e1 = 2">Suivant</v-btn>
      </v-stepper-content>
<!--stepper2-->
      <v-stepper-content step="2">
        <v-card class="mb-5" color="white" >
            <step2 />
        </v-card>
        <v-btn color="primary" @click="e1 = 1">Précédent</v-btn>
        <v-btn color="primary" @click="e1 = 3" class="btn2">Suivant</v-btn>
      </v-stepper-content>
<!--stepper3-->
      <v-stepper-content step="3">
        <v-card class="mb-5" color="white">
            <step3 />
        </v-card>
        <v-layout>
            <v-btn color="primary" @click="e1 = 2">Précédent</v-btn>
<!--si il y a planifie-->
            <v-btn color="primary" @click="e1 = 4" class="btn2" v-if="notif">Suivant</v-btn>
<!--FIN si il y a planifie-->
          <v-spacer></v-spacer>
          <v-flex md5>
            <v-btn color="primary" v-if="!notif" >Exécuter</v-btn>
            <v-btn color="primary" class="btn2" v-if="!notif">Enregistrer et exécuter</v-btn>
            <v-btn class="btn2" router :to="'/rappinst'" v-if="!notif">Quitter</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
<!--step 4 planifie-->
      <v-stepper-content step="4" v-if="notif">
        <v-card class="mb-5" color="white">
            <step4 />
        </v-card>
        <v-layout>
          <v-flex md1 xs1>
            <v-btn color="primary" @click="e1 = 3">Précédent</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex md3 >
            <v-btn  router :to="'/rappinst'" class="right">Quitter</v-btn>
            <v-btn  color="primary" class="right">Enregistrer</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
import step4 from './step4'
  export default {
    data () {
      return {
        e1: 0,
        notif:false
      }  
    },
    components: {
      step1,
      step2,
      step3,
      step4
    },
    methods:{
      addstep:function(updated){
        this.notif=updated
      }
    }

  }
</script>
<style scoped>
.btn2{
    margin-left: 2px; 
}
</style>

