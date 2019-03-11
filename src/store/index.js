import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import API from '../api/api'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        audio:{
            'id':0,
            'musicName':"歌曲名称",
            'singer':"演唱者",
            'albumPic':'/static/placeholder_disk_play_program.png',
            'location':'',
            'album':''
        },
        lyric:'',
        currentIndex:0,//当前播放的歌曲位置
        playing:false,//是否正在播放
        loading:false,//是否正在加载中,
        showDetail:false,//
        songList:[],//播放列表
        currentTime:0,//当前播放的时间
        temCurrentTime:0,
        durationTime:0,//音频的长度（以秒计）
        bufferedTime:0, //缓冲时间
        chagne:false,//判断是更改的时间还是播放的时间
        hotMusic:[] //全部热门歌曲

    },
    mutations:{
        play (state) {
            state.playing = true
        },
        pause(state){
            state.playing = false;
        },
        setChange(state,flag){
            state.chagne = flag;
        },
        setAudio(state){
            // console.log(state.audio)
            state.audio = state.songList[state.currentIndex -1][0];
            // console.log(state.songList[state.currentIndex -1][0])
            // console.log(state.audio)
        },
        setLocation(state,location){
            state.audio.location = location;
        },
        setHotMusic(state,list){
            console.log(list)
            state.hotMusic = list;
        },
        addToList(state,songs){
            var songArr = Array.prototype.concat.call(songs)
            // console.log(state)
            // console.log(songs)
            // console.log(songArr)
            songArr.forEach(item => {
                var flag = false;
                state.songList.forEach(function(el,index){
                    if(el.id === item.id){
                        flag = true;
                        state.currentIndex = index + 1;
                    }
                });
                if(!flag){
                    state.songList.push(songArr);
                    state.currentIndex = state.songList.length;
                }
            });
        },
        openLoading(state){
            state.loading = true;
        },
        updateDurationTime (state, time) {
            state.durationTime = time
        },
        updateBufferedTime(state,time){
            state.bufferedTime = time;
        },
        updateCurrentTime(state,time){
            state.currentTime = time
        },
        closeLoading (state) {
            state.loading = false
        },
        playNext(state){
            state.currentIndex++;
            if(state.currentIndex > state.songList.length){
                state.currentIndex = 1;
            }
            state.audio = state.songList[state.currentIndex - 1][0];
        },
        playPre(state){
            state.currentIndex--;
            if(state.currentIndex < 1){
                state.currentIndex = state.songList.length;
            }
            state.audio = state.songList[state.currentIndex -1][0];
        }
    },
    getters:{
        songList: state => state.songList,
        showDetail: state => state.showDetail,
        audio:state => state.audio,
        loading:state=> state.loading,
        playing:state=>state.playing,
        change:state=>state.chagne,
        prCurrentTime: state => {
        return state.currentTime / state.durationTime * 100
        },
        prBufferedTime: state => {
        return state.bufferedTime / state.durationTime * 100
        },

        hotMusic:state=>state.hotMusic
    },
    //异步的数据操作
    actions:{
        getSong({commit,state},id){
            // cancel token 取消请求
            //  可以使用 CancelToken.source 工厂方法创建 cancel token
            var CancelToken = Axios.CancelToken;
            var source = CancelToken.source();
            if(state.loading && state.songList.length > 0){
                source.cancel();
            }
            commit("openLoading");
            Axios.get(API.getSong(id)).then(data=>{
                // console.log(data.data.data[0].url)
                var musicUrl = data.data.data[0].url;
                // console.log(musicUrl)
                commit('setAudio');
                commit('setLocation',musicUrl);
            })
            .catch((error)=>{
                // console.log(error)
                console.log("获取歌曲出错")
            })
        }
    }


})
export default store