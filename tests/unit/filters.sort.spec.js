import { expect } from 'chai';
import { sortDueDate, sortCompleted } from '@/store/filters.js';
import moment from 'moment';

describe('Test sorting by dueDate functions', () => {
    let list = [];

    beforeEach(() =>
    {
        list = [
            {
                descript: "Do my taxes",
                completed: moment('2019-04-14').toISOString(),
                dueDate: moment('2019-04-14').toISOString(),
                id: 0
            },{
                descript: "Walk the dog",
                completed: moment().add(5,'m').toISOString(),    // Will be date or null for not completed
                dueDate: moment().add(5,'m').toISOString(),
                id: 1
            },{
                descript: "Task that has not been completed on time",
                completed: moment().subtract(30,'m').toISOString(),
                dueDate: moment().subtract(30,'m').toISOString(),
                id: 2
            }
        ];
    });

    it('Sorts a list of tasks by due date', () => {
        // Expected sorted index order is:
        // 3,1,0,4        
        let dueSort = sortDueDate(list);
                
        expect(dueSort[0].id).to.equal(2);
        expect(dueSort[1].id).to.equal(1);
        expect(dueSort[2].id).to.equal(0);

    });

    it('Sorts a list by date, includes task without due date.', () => {
        // Expected sorted index order is:
        // 3,1,0,4
        list.push(
            {
                descript: "No Due Date on this task",                    
                id: 3
            }
        );

        let dueSort = sortDueDate(list);

        expect(dueSort[0].id).to.equal(2);
        expect(dueSort[1].id).to.equal(1);
        expect(dueSort[2].id).to.equal(0);
        expect(dueSort[3].id).to.equal(3);
    });

    it('Sorts a list by date, with multiple task without due date.', () => {        
        list = [ 
            {
                descript: "No Due Date on this task",
                completed: null,
                dueDate: null,                      
                id: 3
            },
            ...list,
            {
                descript: "No Due Date on this task",                      
                id: 4
            },{
                descript: "No Due Date on this task",                   
                id: 5
            }
        ];

        let dueSort = sortDueDate(list);

        expect(dueSort[0].id).to.equal(2);
        expect(dueSort[1].id).to.equal(1);
        expect(dueSort[2].id).to.equal(0);
        expect(dueSort[3].id).to.be.within(3,5);
        expect(dueSort[4].id).to.be.within(3,5);
        expect(dueSort[5].id).to.be.within(3,5);
    });
});

describe('Test sorting by completed date functions', () => {
    let list = [];       

    beforeEach(() =>
    {
        list = [
            {
                descript: "Do my taxes",
                completed: moment('2019-04-14').toISOString(),
                dueDate: moment('2019-04-14').toISOString(),
                id: 0
            },{
                descript: "Walk the dog",
                completed: moment().add(5,'m').toISOString(),    // Will be date or null for not completed
                dueDate: moment().add(5,'m').toISOString(),
                id: 1
            },{
                descript: "Task that has not been completed on time",
                completed: moment().subtract(30,'m').toISOString(),
                dueDate: moment().subtract(30,'m').toISOString(),
                id: 2
            }
        ];
    });

    it('Sorts a list of tasks by completion date', () => {
        // Expected sorted index order is:
        // 3,1,0,4        

        let completedSort = sortCompleted(list);
                
        expect(completedSort[0].id).to.equal(2);
        expect(completedSort[1].id).to.equal(1);
        expect(completedSort[2].id).to.equal(0);
    });

    it('Sorts a list by date, includes task without completion date.', () => {
        // Expected sorted index order is:
        // 3,1,0,4
        list.push(
            {
                descript: "No Due Date on this task",                    
                id: 3
            }
        );

        let completedSort = sortCompleted(list);

        expect(completedSort[0].id).to.equal(2);
        expect(completedSort[1].id).to.equal(1);
        expect(completedSort[2].id).to.equal(0);
        expect(completedSort[3].id).to.equal(3);
    });

    it('Sorts a list by date, with multiple task without completion date.', () => {        
        list = [ 
            {
                descript: "No Due Date on this task",
                completed: null,
                dueDate: null,                      
                id: 3
            },
            ...list,
            {
                descript: "No Due Date on this task",                      
                id: 4
            },{
                descript: "No Due Date on this task",                   
                id: 5
            }
        ];

        let completedSort = sortCompleted(list);

        expect(completedSort[0].id).to.equal(2);
        expect(completedSort[1].id).to.equal(1);
        expect(completedSort[2].id).to.equal(0);
        expect(completedSort[3].id).to.be.within(3,5);
        expect(completedSort[4].id).to.be.within(3,5);
        expect(completedSort[5].id).to.be.within(3,5);
    });
});