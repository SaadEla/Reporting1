<template>
<div>
    <v-layout row wrap  class="lay">
        <v-flex md12 xs12>
            <div class="font-weight-medium">Fréquence</div><br/>
            <v-overflow-btn outline :items="dropdown_list" label="Fréquence"></v-overflow-btn>
        </v-flex><br/>
        <v-flex md12 xs6>
            <div class="font-weight-medium">Les jours</div>
        </v-flex><br/>     
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Lundi"></v-checkbox></v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Mardi"></v-checkbox></v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Mercredi"></v-checkbox> </v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Jeudi"></v-checkbox> </v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Vendredi"></v-checkbox> </v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Samedi"></v-checkbox> </v-flex>
            <v-flex md1 xs1><v-checkbox  class="mx-2" label="Dimanche"></v-checkbox> </v-flex>

        <v-flex md12 xs6>
            <div class="font-weight-medium">A partir de</div><br/>
            <v-btn  v-on:click="backgr()" id="back">Demain</v-btn>
            <v-menu ref="menu"  :close-on-content-click="false" v-model="menu" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-btn   v-on="on" v-on:click="backgr2()" id="back2">
                        {{date}}
                    </v-btn>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        <v-flex md6 xs12><br/>
            <div class="font-weight-medium">Jusqu'au</div><br/>
            <v-btn  class="dop" v-on:click="backgr1()" id="back1">Indéterminée</v-btn>
            <v-menu ref="menu2"  :close-on-content-click="false" v-model="menu2" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-btn   v-on="on" v-on:click="backgr3()" id="back3">
                        {{date2}}
                    </v-btn>
                </template>
                <v-date-picker v-model="date2" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        <v-flex md12 xs12 class="mt-5">
            <v-radio-group  row>
                <v-radio label="Active" value="radio-1"></v-radio>
                <v-radio label="Non active" value="radio-2"></v-radio>
            </v-radio-group>
        </v-flex>
    </v-layout><br/>
</div>
</template>

<script>

  export default {
    data () {
      return {
        dropdown_list: [
            { text: 'Journalier'},
            { text: 'Hebdomadaire'},
            { text: 'Mensuel'}
        ],
         date: new Date().toISOString().substr(0, 10),
         menu: false,
         date2: new Date().toISOString().substr(0, 10),
         menu2: false,
         dop:true
      }  
    },
    methods:{
      backgr:function(){
        document.getElementById("back").style.background = "blueviolet";
        document.getElementById("back2").style.background = "white";
      },
      backgr1:function(){
        document.getElementById("back1").style.background = "blueviolet";
        document.getElementById("back3").style.background = "white";
      },
      backgr2:function(){
        document.getElementById("back2").style.background = "blueviolet";
        document.getElementById("back").style.background = "white";
      },
      backgr3:function(){
        document.getElementById("back3").style.background = "blueviolet";
        document.getElementById("back1").style.background = "white";
      }

    }

  }
</script>
<style>
.lay{
    padding-top: 20px;
}
.v-btn{
    margin-right: 10px;
}

</style>