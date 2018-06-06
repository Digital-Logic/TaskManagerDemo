import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations, actions, getters } from './store.js';
import plugins from './plugins.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins
});
