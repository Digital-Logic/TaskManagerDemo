import { expect } from 'chai';
import { getters } from '@/store/store.js';
import moment from 'moment';


describe('Testing getters', () => {
    // Mock store
    const state = {
        taskList: [
            {
                descript: "Do taxes",
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
                id: 4
            },{
                descript: "Completed task with NO Due Date.",
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
        ]
    };
    it('Gets overdue task', () => {
        let taskList = getters.getOverdueTaskList(state);
        expect(taskList).to.have.lengthOf(1);
        expect(taskList[0].id).to.equal(3);
    });

    it('Gets completed task', () => {
        let taskList = getters.getCompletedTaskList(state);
        expect(taskList).to.have.lengthOf(3);
        expect(taskList).to.have.members(state.taskList.slice(-3));
    });
    it('Get todays task', () => {
        let taskList = getters.getTodaysUncompletedTasks(state);
        expect(taskList).to.have.lengthOf(3);
    });
});