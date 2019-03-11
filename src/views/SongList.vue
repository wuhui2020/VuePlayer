<template>
    <div>
        <ul class="listUl">
            <li v-for="(itemobj,index ) in hotMusic" :key="index" class="listList">
                    <router-link :to="{name:'playListDetail',params:{id:itemobj.id, name: itemobj.name, coverImg: itemobj.picUrl, creator: itemobj.copywriter, count: itemobj.playCount, desc: itemobj.description }}">
                    <img v-lazy="itemobj.picUrl" class="listImg"/>
                    </router-link>
                
            </li>
        </ul>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        console.log(this.hotMusic)
    },
    computed:{
        ...mapGetters([
            'hotMusic'
        ])
    }
}
</script>
<style>
    .listUl{
      width:100%;
      height: 200px;
      
  }
  .listList{
     width:33%;
     height: 100px;
     font-style: none;
     float:left;
  }
  .listImg{
      width: 100%;
      height: 80px;
  }
</style>


