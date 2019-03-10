import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import Recommend from '../views/Recommend';
import Hotmusic from '../views/Hotmusic';
import SongList from '../views/SongList';
import PlayListDetail from '../views/PlayListDetail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',component:Home,
      children:[
        {path: '/index/recommend',component:Recommend},
        {path: '/index/hotmusic',component:Hotmusic},
        {path: '/index/songList',component:SongList}
      ]
    },
    {name:'playListDetail',path:'/playListDetail/:id', component:PlayListDetail},
    {path:'*', redirect:'/index/recommend'}
  ]
})
