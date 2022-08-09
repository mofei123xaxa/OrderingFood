import Vue from 'vue'


import Vuex from 'vuex'

Vue.use(Vuex);


// 处理异步请求
const actions = {
    order({commit},value){
        commit('ORDER_NUM',value)
    }
};

// 唯一能修改status的地方
const mutations = {
    // 接收小程序传递来的新订单
    ORDER_NUM(state,value){
        state.order = value
    },
    ling(state,value){
        state.order = value
    }
};

// 唯一能存储数据的地方
const state = {
    // 存储小程序返回的下单次数
    order:0
}

export default new Vuex.Store({
    state,
    actions,
    mutations

})

