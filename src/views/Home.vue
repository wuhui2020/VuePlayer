<template>
    <div>
       <div class="fixed-bar">

        <img src="../assets/images/logo.jpg" alt="" class="logo">

        
        <ul class="tabUl">
            <li >
                <router-link to="/index/recommend">推荐歌曲</router-link>
            </li>
            <li >
                <router-link to="/index/hotmusic">热歌榜</router-link>
            </li>
        </ul>
             
        
    </div>
    
    <div class="default-view" :class="{view: songList.length > 0}">
        <keep-alive>
            <router-view></router-view> 
        </keep-alive>
    </div>
        

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            activeTab:"recommend"
        }
    },
    methods:{
        handleTabChange(val){
            this.activeTab = val;
            this.$router.push({path:'index/'+val});
        }
    },
    created(){
        // console.log(this.$route.path)
        var tmpArr = this.$route.path.split('/')
        // console.log(tmpArr)
        if (tmpArr[1] === 'index') {
            this.handleTabChange(tmpArr[2])
        }
        
    },
    computed:{
        ...mapGetters([
           'songList' 
        ])
    }
    
}
</script>
<style>
    .fixed-bar{
        width:100%;
        height:80px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
    }
    .logo{
        width:200px;
        height: 36px;
    }
    
    .tabUl{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
    }
    .tabUl > li{
        width: 50%;
        height: 100%;
        text-align: center;
        font-style: normal;
    }
    .tabUl > li >a{
        text-decoration: none;
    }
   .default-view {
        margin-top: 80px;
    }
    .view{
        margin-bottom: 80px;
    }
    
</style>


