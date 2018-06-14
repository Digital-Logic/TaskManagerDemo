import createPersistedState from 'vuex-persistedstate';

const key = "TASK_MANAGER_V1";
const plugins = [];

function createStorage (storage) {
    return createPersistedState({
        key,
        paths: ['taskList', 'settings'],
        storage
    });
}

/* Node compatible local storage */ 
const nodeStorage = () => {
    return import(/* webpackChunkName: 'dom-storage' */ 'dom-storage')
    .then(module => createStorage(new module.default(null, { strict: true } )) )
    .catch(function(e){
        console.log(e);
    });
};


if (window.localStorage && process.env.VUE_APP_LOCAL_STORAGE === 'true') 
    plugins.push(createStorage(window.localStorage));
else plugins.push(nodeStorage);


export default plugins;

