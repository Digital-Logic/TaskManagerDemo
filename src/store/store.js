import moment from 'moment';
import { sort } from './filters.js';

export var state = {
    taskList: [
        {
            descript: "Do my taxes",
            completed: null,
            dueDate: moment('2019-04-14').toISOString(),
            id: 0
        },{
            descript: "Walk the dog",
            completed: null,    // Will be date or null for not completed
            dueDate: moment().add(5,'m').toISOString(),
            id: 1
        },{
            descript: "Finish programming this app",
            completed: null,
            dueDate: moment().add(6,'h').toISOString(),
            id: 2
        },{
            descript: "Task that has not been completed on time",
            completed: null,
            dueDate: moment().subtract(30,'m').toISOString(),
            id: 3
        },{
            descript: "No Due Date on this task",
            completed: null,               
            id: 4
        },{
            descript: "Completed task with NO Due Date on this task",
            completed: moment().subtract(12,'h').toISOString(),              
            id: 5
        },{
            descript: "This is a completed Task",
            completed: moment().subtract(1,'d').toISOString(),
            dueDate: moment().subtract(3,'h').toISOString(),
            id: 6
        },{
            descript: "This is a completed Task, with due date in the future",
            completed: moment().subtract(1,'d').toISOString(),
            dueDate: moment().add(1,'h').toISOString(),
            id: 7
        }
    ],
    settings: {
        refreshRate: 20000
    },
    curTime: moment().toISOString(),    
    timeInterval: null
};

export const getters = {
    getRefreshRate(state) {
        return state.refreshRate;
    },
    getTaskList(state) {
        const sortByDue = sort('dueDate');
        return sortByDue(state.taskList);
    } 
};

export const mutations = {
    ['UPDATE_CURRENT_TIME'](state) {
        state.curTime = moment().toISOString();
    }   
};

export const actions = {
    setInterval({state, commit}) {
        state.timeInterval = setInterval(function() {
            commit('UPDATE_CURRENT_TIME');
        }, state.settings.refreshRate);
    },
    destoryInterval({state}) {
        clearInterval(state.timeInterval);
    }
};