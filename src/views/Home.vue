<template>
    <div>
       <div class="fixed-bar">
        <div class="musictitle">音乐播放器</div>
        <ul class="tabUl">
            <li :class="{tabColor:activeTab=='recommend'}" >
                <router-link  to="/index/recommend">精选歌曲</router-link>
            </li>
            <li :class="{tabColor:activeTab=='hotmusic'}" >
                <router-link  to="/index/hotmusic">热歌榜</router-link>
            </li>
            <li :class="{tabColor:activeTab=='songList'}" >
                <router-link  to="/index/songList">推荐歌单</router-link>
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
            // console.log(val)
            this.activeTab = val;
            // console.log(this.activeTab)
            // this.$router.push({path:'index/'+val});
            
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
    .musictitle{
        width:100%;
        height:36px;
        font-size:16px;
        background:rgba(245,41,41,0.6);
        line-height:36px;
        text-indent:20px;
        color:#fff;
    }
    
    .tabUl{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        background:rgba(243,242,242,0.7);
    }
    .tabUl > li{
        width: 33.3%;
        height: 100%;
        text-align: center;
        font-style: normal;
        cursor:pointer;
    }
    .tabUl > li >a{
        text-decoration: none;
        font-size:14px;
        color:#000;
        cursor:pointer;
    }
    .tabUl > li >a.router-link-exact-active{
        color:red;
    }
   .default-view {
        margin-top: 70px;
    }
    .view{
        margin-bottom: 80px;
    }
    
</style>


