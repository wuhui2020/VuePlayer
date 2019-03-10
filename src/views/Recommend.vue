<template>
    <div>
        <div class="loading-wrapper" v-if="isloading" >
          <div class="loading"></div>
          <div class="loading-txt">正在加载中</div>
        </div>
        <div class="container" v-show="!isloading">
            
           <div class="bannerdiv">
               <swiper :options="swiperOption">
                    <swiper-slide v-for="item in bannerList" :key="item.imageUrl">
                        <img :src="item.imageUrl" alt="" class="banner-item"/>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
           </div>
            <div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songList'}">更多></router-link></div>
            <ul class="listUl">
                <li v-for="(itemobj,index ) in playList" :key="index" class="listList">
                     <router-link :to="{name:'playListDetail',params:{id:itemobj.id, name: itemobj.name, coverImg: itemobj.picUrl, creator: itemobj.copywriter, count: itemobj.playCount, desc: itemobj.description }}">
                        <img v-lazy="itemobj.picUrl" class="listImg"/>
                     </router-link>
                    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import API from "../api/api.js";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                }
            },
            isloading: true,
            bannerList: [],
            playList: [],
            mvList: []
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    methods:{
        loadData(){
            let personSongList = this.$Http.get(API.getPersonalized());
            let bannerList = this.$Http.get(API.getBannerList());
            let personMVList = this.$Http.get(API.getPersonalizedMV());
            // console.log(personSongList)
            Promise.all([personSongList,bannerList,personMVList]).then(data=>{
                
                this.playList = data[0].data.result.splice(0,6);
                this.bannerList = data[1].data.banners;
                this.mvList = data[2].data.result;
                this.isloading = false
                //  console.log( this.playList);
            })
            
        }
    },
    created(){
        this.loadData();
    }

}
</script>
<style lang="less" >
     .loading {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 70%;
    margin-left: -1.25rem;
    background: url('../assets/images/rage_loading.png') no-repeat;
    background-size: cover;
    -webkit-animation: rotating 5s  linear infinite;
    animation: rotating 5s linear infinite;
  }
  .loading-txt {
    position: absolute;
    top:0;
    color: #4a4a4a;
    margin-top: 87%;
    width: 100%;
    text-align:center;
  }

  .bannerdiv{
      width: 100%;
      height: 160px;
  }
  .banner-item {
    width: 100%;
    height: 160px;
    background: url('../assets/images/banner-item-load.png') no-repeat; 
    background-size: cover;
  }
    .g-title {
    padding-left: 25px;
    color: #333;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  .song-list {
    background: url("../assets/images/aei.png") no-repeat left center;
    background-size: 20px 20px;
  }
  .gridlist-demo{
      width: 100%;
      height: 200px;
      overflow: hidden;
  }
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

