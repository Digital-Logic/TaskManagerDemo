import Vue from 'vue';
import moment from 'moment';
import { sortDueDate, sortCompletedDate, dueToday, dueTomorrow, pastDue, completed, uncompleted } from './filters.js';

export const state = {
    taskList: [
        {
            descript: "Do my taxes",
            completed: null,
            dueDate: moment('2019-04-14').toISOString(),
            id: 0
        },{
            descript: "Walk the dog",
            completed: null,    // Will be date or null for not completed
            dueDate: moment().add(20,'s').toISOString(),
            id: 1
        },{
            descript: "Finish programming this app",
            completed: null,
            dueDate: moment().add(6,'h').toISOString(),
            id: 2
        },{
            descript: "Task due tomorrow",
            completed: null,
            dueDate: moment().add(24,'h').toISOString(),
            id: 8
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
            descript: "Completed task with NO Due Date.",
            completed: moment().subtract(12,'h').toISOString(),              
            id: 5
        },{
            descript: "This task was completed late",
            completed: moment().subtract(1,'h').toISOString(),
            dueDate: moment().subtract(3,'h').toISOString(),
            id: 6
        },{
            descript: "This Task was completed on time.",
            completed: moment().subtract(3,'h').toISOString(),
            dueDate: moment().add(1,'h').toISOString(),
            id: 7
        }
    ],
    settings: {
        refreshRate: 5000,
        displayWarning: moment.duration(5, 'm').valueOf(), // default is 5 minutes        
        dateFormat: {
            dueDate: false,
            completedDate: false            
        },
        messageDuration: 4000 // 4 seconds
    },
    filters: {
        selected: 0,
        names:  [
            "All Tasks",
            "Today\'s Tasks",
            "Tomorrow\'s Tasks",
            "Overdue Tasks",
            "Completed Tasks"
        ]
    },
    messageQueue: [],
    curTime: moment().toISOString(),    
    timeInterval: null,
    taskIndex: 9
};

export const getters = {
    /* Get, filter, sort task list */
    getTaskById(state) {
        return (id) => state.taskList.find((item) => item.id === id);
    },
    getTaskList(state) {        
        return sortDueDate(state.taskList);
    },
    getOverdueTaskList(state) {
        return sortDueDate(pastDue(uncompleted(state.taskList), state.curTime));
    },
    getUncompletedTaskList(state) {
        return sortDueDate(uncompleted(state.taskList));
    },
    getCompletedTaskList(state) {
        return sortCompletedDate(completed(state.taskList));
    },
    getTodaysUncompletedTasks(state) {
        return sortDueDate(dueToday(uncompleted(state.taskList)));
    },
    getTodaysCompletedTasks(state) {
        return sortCompletedDate(dueToday(completed(state.taskList)));
    },
    getTomorrowsUncompletedTasks(state){
        return sortDueDate(dueTomorrow(uncompleted(state.taskList)));
    },
    getTomorrowsCompletedTasks(state) {
        return sortCompletedDate(dueTomorrow(completed(state.taskList)));
    }
    /* ******* */    
};

export const mutations = {
    ['UPDATE_CURRENT_TIME'](state) {
        state.curTime = moment().toISOString();
    } ,
    ['SET_SELECTED_FILTER'](state, filterID) {
        state.filters.selected = filterID;
    },
    // Sets task.completed time to current time.
    ['TOGGLE_TASK_STATE'](state, task) {
        if (task.completed)
            Vue.delete(task, 'completed');
        else Vue.set(task, 'completed', moment().toISOString());        
    },
    ['DELETE_TASK'](state, index) {     
        if (index < 0 || index >= state.taskList.length)
            throw 'DELETE_TASK: index out of range';
        state.taskList.splice(index, 1);                    
    },
    // Create snackbar message
    ['CREATE_MESSAGE'](state, message) {
        // Validate message parameters 
        if (typeof message !== 'object')
            throw 'Invalid message sent to createMessage';
        if (typeof message.btnMessage !== 'string' ||
            typeof message.message !== 'string') {
                throw 'Invalid text message sent to createMessage';
            }
        state.messageQueue.push(message);
    },
    // Remove last message from the snackbar message queue, FIFO order
    ['SHIFT_MESSAGE_QUEUE'](state) {        
        state.messageQueue.shift();
    },
    // Update the task if the task is in the tasklist, or
    // Add the new task to the task List.
    ['SAVE_TASK'](state, newTask) {              
        let taskIndex = state.taskList.findIndex(item => item.id === newTask.id);
        if (taskIndex !== -1)
        {   // Update Existing Task
            Vue.set(state.taskList, taskIndex, newTask);          
        } else {
            state.taskList.push(newTask);
        }
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
    },
    setSelectedFilter({commit}, filterID) {
        commit('SET_SELECTED_FILTER', filterID);
    },
    toggleTaskState({commit}, task) {
        commit('TOGGLE_TASK_STATE', task);
    },
    deleteTask({ commit, state }, task) { 
        let indexOf = state.taskList.indexOf(task);
        if (indexOf < 0) return;

        // create snackbar message, and provide undo action
        commit('CREATE_MESSAGE', {
            message: `Task Deleted: <strong class="warning--text">${task.descript}</strong>.`,
            btnMessage: 'Undo',
            // Provide undo delete action
            action: () => commit('SAVE_TASK', task),
            shiftMessageQueue: () => commit('SHIFT_MESSAGE_QUEUE')
        });
        // Delete the task
        commit('DELETE_TASK', indexOf);
    },
    saveTask({ commit, state }, newTask)
    {
        // define task id
        if (typeof newTask.id === 'undefined')
        {
            newTask.id = state.taskIndex++;
        }
        commit('SAVE_TASK', newTask);
    }
};