<template>
  <div>
    
    <keep-alive>
      <router-view></router-view> 
    </keep-alive>
    <PlayerBar v-show="songList.length > 0 && !showDetail"></PlayerBar>
  </div>
</template>

<script>
import PlayerBar from './components/PlayerBar';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{
    PlayerBar
  },
  computed:{
    ...mapGetters([
      'songList',
      'showDetail'
    ])
  }
}
</script>

<style>
@import  './assets/reset.css';

</style>
