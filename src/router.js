import Router from 'vue-router';
import Login from './views/Login';
import Database from './views/Database'
import MainTheme from "@/views/MainTheme";
import DatabaseGroup from "@/views/DatabaseGroup";

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/',
            component: MainTheme,
            name:'main'
        },
        {
            path: '/auth',
            component: Login,
            name:'auth'
        },
        {
            path: '/students/get',
            component: Database,
            name:'database'
        },
        {
            path: '/groups/get',
            component: DatabaseGroup,
            name:'groups'
        },
    ]
});