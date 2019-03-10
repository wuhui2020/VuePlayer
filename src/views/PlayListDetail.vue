<template>
    <div :class="{view: songList.length > 0}" class="palylist">
        <div @click="back">返回</div>
        <div class="playhead">
            <img :src="coverImgUrl" alt=""/>

        </div>
        <ul class="playul">
            <li v-for="(list,index) in list" :key="index" @click="playAudio(list)">
                <span>{{index+1}}</span>
                <span>{{list.name}}</span>
                <span>{{list.ar[0].name}}</span>
            </li>
        </ul>

    </div>
</template>
<script>
import API from '../api/api.js';
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            coverImgUrl: '../assets/images/default_cover.png',
            name: '歌单标题',
            id: 0,
            fname: '歌单',
            playCount: 0,
            description: '描述描述',
            creator: {
                'avatarUrl': '../assets/images/user-default.png',
                'nickname': '昵称'
            },
            list:[]
        }
    },
    methods:{
        back(){
        //指定跳转到user页面，可带参数router.go({name: 'user', params: {userId: 1}});
        //按历史记录跳转到上一页router.go(-1);
            this.$router.go(-1)
        },
        get(){
            this.$Http.get(API.getPlayListDetail(this.$route.params.id)).then(data=>{
                // console.log(data.data.playlist)
                // console.log(data.data.playlist.tracks)
                this.list = data.data.playlist.tracks;
            }).catch(error=>{
                console.log("加载数据出错"+error)
            })
        },
        playAudio(el){
            // console.log(el)
            // console.log(this.$store)
            document.getElementById('audioPlay').pause();
            this.$store.commit('pause');
            var audio = {};
            audio.id = el.id;
            audio.musicName = el.name;
            audio.singer = el.ar[0].name;
            audio.albumPic = el.al.picUrl;

            this.$store.commit("addToList",audio);
            this.$store.dispatch('getSong',audio.id);
        }
    },
    beforeRouteEnter(to,from,next){
        // console.log(to.params.id)
        // console.log(from)
        // console.log(next)
        next(vm=>{
            // console.log(vm.id)
            if(parseInt(to.params.id) !== parseInt(vm.id)){
                vm.get()
            }
            // 判断过来的路由是否带有对应的参数信息
            if (to.params.coverImg) {
                // 获取songList传入的数据
                vm.coverImgUrl = vm.$route.params.coverImg
                vm.name = vm.$route.params.name
                vm.description = vm.$route.params.desc
                vm.playCount = vm.$route.params.count
                vm.creator = vm.$route.params.creator
                vm.id = vm.$route.params.id
            }
        })
    },
    created(){
        // getPlayListDetail
        // console.log(songList)
    },
    computed: {
        ...mapGetters([
            'songList'
        ])
  },
}
</script>
<style>
.palylist{
    position: relative;
    z-index: 1;
}
    .playhead{
        width: 100%;
        height: 120px;
        overflow: hidden;
    }
    .playhead img{
        width: 100px;
        height: 100px;
    }
    .playul{
        width: 100%;
        background: #fff;
        position: relative;
        z-index: 3;
    }
    .playul > li{
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .view{
        margin-bottom: 80px;
    }
</style>


