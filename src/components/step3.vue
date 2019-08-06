<template>
<div class="lay">
    <v-layout row wrap >
        <v-flex md12 xs12>
            <div class="font-weight-medium">Personnes à notifier</div><br/>
            <v-text-field label="Email" placeholder="Ajouter email" outline></v-text-field>
        </v-flex>
        <v-flex md12 xs12>
            <v-radio-group  row>
                <v-radio label="Transmettre le rapport" value="radio-1"></v-radio>
                <v-radio label="Notifier uniquement par email" value="radio-2"></v-radio>
            </v-radio-group>
        </v-flex>
    </v-layout>
</div>
</template>

<script>

  export default {

  }
</script>
<style scoped>
.lay{
    padding-top: 20px;
}
</style>

