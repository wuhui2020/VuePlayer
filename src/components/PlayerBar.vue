<template>
    <div class="Bar">
        <div class="Bar-div">
            <audio :src="audio.location" id='audioPlay' @timeupdate="updateTime" @canplay="canPlaySong" @ended="next"></audio>
            <img :src="audio.albumPic + '?param=100y100'" alt="" class="audioImg"/>
            <!-- <input type='button' :value='loading?"暂停":"播放"' class="startOrstop" @click="toggleStatus"/>
            <input type='button' value='下一首' class="startOrstop" @click="next"/> -->
            <div class="musicmsg">
                <span>{{audio.musicName}}</span>
                <span>{{audio.singer}}</span>
            </div>
            <button class="startOrstop pericon" @click="pre"></button>
            <button class="startOrstop starticon" :class="{stopicon:playing}" @click="toggleStatus"></button>
            <button class="startOrstop nexticon" @click="next"></button>
            <button class="startOrstop listicon" ></button>
            <div class='pro'>
                <div class="load" :style="{'-webkit-transform':'translateX(' + prBufferedTime +'%)' }"></div>
                <div class="play" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex';
export default {
    data(){
        return {
            
        }
    },
    methods:{

        canPlaySong(){
            this.$store.commit('closeLoading');
            this.$store.commit('play');
            document.getElementById('audioPlay').play();
        },
        toggleStatus(){
            console.log(this.playing)
            if (this.playing) {
                document.getElementById('audioPlay').pause();
                this.$store.commit('pause')
            }else{
                document.getElementById('audioPlay').play();
                this.$store.commit('play')
            }
        
        },
        next(){
            this.toggleStatus();
            this.$store.commit('playNext');
        },
        pre(){
            this.toggleStatus();
            this.$store.commit('playPre');
        },
        updateTime(){
            //进度条
            var _this = this;
            var myaudio = document.getElementById('audioPlay');
            //设置或返回音频/视频中的当前播放位置（以秒计）
            var time = parseInt(myaudio.currentTime);

            //onsuspend在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本。
            myaudio.onsuspend = function(){
                //返回表示音频/视频已缓冲部分的 TimeRanges 对象
                // length - 获得音视频中已缓冲范围的数量
                // start(index) - 获得某个已缓冲范围的开始位置
                // end(index) - 获得某个已缓冲范围的结束位置
               var TimeRanges  =  myaudio.buffered
               //duration返回音频的长度（以秒计）。
               if(TimeRanges.length > 0 && myaudio.duration > 0){
                   //改变缓存时间
                   _this.$store.commit('updateBufferedTime',parseInt(myaudio.buffered.end(0)))
               }
                
            }

            //改变当前音频时间
            _this.$store.commit('updateDurationTime',parseInt(myaudio.duration))

            if(this.change){
                myaudio.currentTime = this.tmpCurrentTime;
                this.$store.commit('setChange',false)
            }else{
                //改变当前播放位置
                this.$store.commit('updateCurrentTime',time)
            }

        },
        ...mapMutations([
            'play',
            'pause'
        ])
    },
    computed:{
        ...mapGetters([
            'playing',
            'loading',
            'audio',
            'change',
            'currentTime',
            'prBufferedTime',
            'tmpCurrentTime',
            'prCurrentTime'
        ])
    },
    
}
</script>
<style scope>
    .Bar{
        width:100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 998;
        background: #fff;
    }
    .Bar-div{
        float: left;
        width: 100%;
        height: 60px;
        background: #ccc;
        color: #333333;
        position: relative;
    }
    .audioImg{
        float: left;
        width: 58px;
        height: 58px;
    }
    .musicmsg{
        float:left;
        width:150px;
        height:100%;
        font-size:14px;
        margin: 0px 2px;
    }
    .musicmsg span{
        display:block;
        width:100%;
        height:50%;
        line-height:30px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        text-align:center;
    }
    .startOrstop{
        width:36px;
        height:36px;
        display: block;
        border:1px solid #ccc;
        outline: none;
        float:left;
        margin:12px 2px;
    }
    .pericon{
        background:url(../assets/images/per.png) no-repeat center;
        background-size:36px;
    }
    .starticon{
        background:url(../assets/images/start.png) no-repeat center;
        background-size:36px;
    }
    .stopicon{
        background:url(../assets/images/stop.png) no-repeat center;
        background-size:34px;
    }
    .nexticon{
        background:url(../assets/images/next.png) no-repeat center;
        background-size:36px;
    }
    .listicon{
        background:url(../assets/images/list.png) no-repeat center;
        background-size:38px;
    }
    .pro{
        width:100%;
        height:2px;
        background-color: rgba(255, 255, 255, .5);
        position: absolute;
        top: 0;
        left: 0;
    }
    .load{
        width: 100%;
        height: 2px;
        background:#97D3D8;
        position: absolute;
        bottom: 0;
        left: -100%;
        z-index: 1;
    }
    .play{
        width: 100%;
        height: 2px;
        background:#9BEFF5;
        position: absolute;
        bottom: 0;
        left: -100%;
        z-index: 2;
    }
</style>


