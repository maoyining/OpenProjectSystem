import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state={
    token: localStorage.getItem('user-token'),
    role:localStorage.getItem('user-role'),
    username:localStorage.getItem('user-username'),
};
const getters={
    getToken(){
      if (!state.token) {
        state.token = localStorage.getItem('user-token');
      }
      return state.token;
    },
    getRole(){
        if (state.role!=null) {
            state.role = localStorage.getItem('user-role');
        }
        return state.role
    },
    getUsername(){
        if (!state.username) {
            state.username = localStorage.getItem('user-username');
        }
        return state.username
    },
   
}
const mutations={
    changeToken(state,string){
      localStorage.setItem('user-token', string)
      state.token=string;
    },
    changeRole(state,num){
        localStorage.setItem('user-role', num)
        state.role=num;
    },
    changeUsername(state,string){
        localStorage.setItem('user-username', string)
        state.username=string;
    },

}
const actions={
    getNewToken(context,string){
        context.commit('changeToken',string)
    },
    setNewRole(context,num){
        context.commit('changeRole',num)
    },
    getNewUsername(context,string){
        context.commit('changeUsername',string)
    },
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


export default store;
