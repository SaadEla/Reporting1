<template>
<div>
    <v-layout row wrap>
        <v-flex md6 xs12>
            <v-btn  v-on:click="notifier()">Notifier</v-btn>
        </v-flex>
        <v-flex md6 xs12>
            
        </v-flex>
    </v-layout>
</div>
</template>

<script>

export default {
    data () {
      return {
        not:false
      }  
    },
    methods:{
        notifier:function(){
          this.not=!this.not
          this.$emit('notifier',this.not);
      }
  }

  }
</script>
