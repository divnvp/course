import Router from 'vue-router';
import Login from './views/Login';
import Help from './views/Help'
import Database from './views/Database'

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/auth',
            component: Login,
            name:'auth'
        },
        {
            path: '/help',
            component: Help,
            name:'help',
        },
        {
            path: '/students/get',
            component: Database,
            name:'database'
        },
    ]
});