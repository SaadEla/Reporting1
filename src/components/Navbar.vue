<template>
    <nav>
        <v-toolbar flat app color="primary">
            <v-toolbar-title class="text-uppercase amber--text">
                <span>JP&CO</span>
            </v-toolbar-title>
            <!--Drop Down menu-->
            <v-menu offset-y row class="text-capitalize" >
              <v-btn flat slot="activator" color="white">
                <v-icon left>date_range</v-icon>
                <span>Rapport planifié</span>
              </v-btn>
            <!--List drop down-->
              <v-list class="grey--text">  
                <v-list-tile v-for="link in links" :key="link.titre" router :to="link.route" >
                    <v-list-tile-title >
                        <v-icon color="grey">{{ link.icon }}</v-icon>
                        <span>{{ link.titre }}</span>
                    </v-list-tile-title>
                </v-list-tile >
              </v-list>
            </v-menu>
            <!--End drop down-->
            <v-spacer></v-spacer>
            <!--SignOut-->
            <v-btn flat color="grey">
                <span>Sign Out</span>
                <v-icon>exit_to_app</v-icon>
            </v-btn>
      </v-toolbar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'access_alarms', titre: 'Mes rapports', route: '/' },
        { icon: 'note_add', titre: 'Modèles et planification', route: '/modeles' },
        { icon: 'file_copy', titre: 'Rapport instantané', route: '/rappinst' },
      ],
      available: false
    }
  }
}
</script>

<style scoped>
.v-list__tile  {
    padding: 3px;
}
.v-list{
    padding: 0px;
    
}
.div .span{
    font-size: 2px;
}
</style>