import api from '../api';

const defaultUser = {groups: 'guest'};

function setUser(user){
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser(){
    const user = localStorage.getItem('user');
    if (user){
        return JSON.parse(user);
    }else {
        return defaultUser;
    }
}

async function logIn(login, pwd){
    const user = await api.post('auth',`login=${encodeURIComponent(login)}&pwd=${encodeURIComponent(pwd)}`, {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    setUser(user);
}

async function logOut(){
    await api.post('logout');
    setUser(defaultUser);
}

export function getStudents(){
    api.get('students/get').then(response => (this.info = response.data.string()));
}

export {logIn, logOut, getUser}