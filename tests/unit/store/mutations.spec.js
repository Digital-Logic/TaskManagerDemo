import { expect } from 'chai';
import { mutations } from '@/store/store.js';
import moment from 'moment';


describe('Testing Mutations', () => {
    it('Create Snackbar message', ()=> {
        const { CREATE_MESSAGE } = mutations;
        const state = {
            messageQueue: []
        };
        
        expect(() => CREATE_MESSAGE(state)).to.throw("Invalid message sent to createMessage");
        expect( ()=> CREATE_MESSAGE(state, {})).to.throw("Invalid text message sent to createMessage");
        expect(state.messageQueue).to.have.length(0);
        CREATE_MESSAGE(state, { message: 'Hello', btnMessage: 'Hello'});      
        expect(state.messageQueue).to.have.length(1);
    });

    it('Sift message queue', () => {
        const { CREATE_MESSAGE, SHIFT_MESSAGE_QUEUE } = mutations;
        const state = {
            messageQueue: []
        };
        CREATE_MESSAGE(state, { message: 'Hello', btnMessage: 'Hello'});
        expect(state.messageQueue).to.have.length(1);
        CREATE_MESSAGE(state, { message: 'Goodbye', btnMessage: 'Goodbye'});
        expect(state.messageQueue).to.have.length(2);
        SHIFT_MESSAGE_QUEUE(state);
        expect(state.messageQueue).to.have.length(1);
        expect(state.messageQueue[0].message).to.equal('Goodbye');
    });

    it('Delete Task', () => {
        const { DELETE_TASK } = mutations;
        const state = {
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
                }
            ]
        };
        expect(state.taskList).to.have.length(2);        
        expect( () => DELETE_TASK(state, 3)).to.throw("DELETE_TASK: index out of range");
        expect( () => DELETE_TASK(state, -1)).to.throw("DELETE_TASK: index out of range");
        expect(state.taskList).to.have.length(2);
        DELETE_TASK(state, 1);
        expect(state.taskList).to.have.length(1);
    });
    
    it('Save task', () => {
        const { SAVE_TASK } = mutations;
        const state = {
            taskList: []
        };

        SAVE_TASK(state, { descript: 'My Task', id: 0 });
        expect(state.taskList).to.have.length(1);
        SAVE_TASK(state, { descript: 'New Task', id: 1});
        expect(state.taskList).to.have.length(2);
        SAVE_TASK(state, { descript: 'Modified Task', id: 0 });
        expect(state.taskList).to.have.length(2);
        expect(state.taskList[0].descript).to.equal('Modified Task');
    });
});
