<template>
    <div class="Bar">
        <div class="Bar-div">
            <audio :src="audio.location" id='audioPlay' @timeupdate="updateTime" @canplay="canPlaySong" @ended="next"></audio>
            <img :src="audio.albumPic + '?param=100y100'" alt="" class="audioImg"/>
            <!-- <input type='button' :value='loading?"暂停":"播放"' class="startOrstop" @click="toggleStatus"/>
            <input type='button' value='下一首' class="startOrstop" @click="next"/> -->
            <span>{{audio.musicName}}</span>
            <span>{{audio.singer}}</span>
            <button class="startOrstop" @click="toggleStatus">{{playing?"暂停":"播放"}}</button>
            <button class="startOrstop" @click="next">下一首</button>
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
<style>
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
        height: 80px;
        background: #ccc;
        color: #333333;
        position: relative;
    }
    .audioImg{
        float: left;
        width: 60px;
        height: 60px;
    }
    .startOrstop{
        width:60px;
        height:30px;
        display: block;
        border:1px solid #ccc;
        outline: none;
    }
    .pro{
        width:100%;
        height:2px;
        background-color: rgba(255, 255, 255, .5);
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .load{
        width: 100%;
        height: 2px;
        background:#ccc;
        position: absolute;
        bottom: 0;
        left: -100%;
        z-index: 1;
    }
    .play{
        width: 100%;
        height: 2px;
        background:yellow;
        position: absolute;
        bottom: 0;
        left: -100%;
        z-index: 2;
    }
</style>


