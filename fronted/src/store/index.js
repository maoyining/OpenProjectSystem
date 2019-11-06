import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state={
    token: localStorage.getItem('user-token'),
    role:'',
    
};
const getters={
    getToken(){
      if (!state.token) {
        state.token = localStorage.getItem('user-token');
      }
      return state.token;
    },
    getRole(){
        return state.role
    },
   
}
const mutations={
    changeToken(state,string){
      localStorage.setItem('user-token', string)
      state.token=string;
    },
    changeRole(state,num){
        state.role=num;
    },
   

}
const actions={
    getNewToken(context,string){
        context.commit('changeToken',string)
    },
    setNewRole(context,num){
        context.commit('changeRole',num)
    },
   
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


export default store;
