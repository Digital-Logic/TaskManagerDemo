import { expect } from 'chai';
import { dueToday, dueTomorrow, pastDue, completed, uncompleted } from '@/store/filters.js';
import moment from 'moment';

describe('Test filter functions', () => {
    const list = [
        {
            descript: "Do in 3 days",
            dueDate: moment().add(3,'days').toISOString(),
            id: 0
        },{
            descript: "Due today",
            completed: null,    // Will be date or null for not completed
            dueDate: moment().toISOString(),
            id: 1
        },{
            descript: "Due tomorrow",
            completed: false,
            dueDate: moment().add(1,'days').toISOString(),
            id: 4
        },{
            descript: "Due yestorday",
            completed: moment().subtract(24,'hours').toISOString(),
            dueDate: moment().subtract(1,'days').toISOString(),
            id: 5
        }
    ];

    it('Get task that are due today', () => {
        let filterToday = dueToday(list);
        expect(filterToday).to.have.lengthOf(1);
        expect(filterToday[0]).to.equal(list[1]);
    });
    it('Get task that are due tomorrow', () => {
        let filterTomorrow = dueTomorrow(list);
        expect(filterTomorrow).to.have.lengthOf(1);
        expect(filterTomorrow[0]).to.equal(list[2]);
    });
    it('Get task that are past due', () => {
        let filterPastDue = pastDue(list);
        expect(filterPastDue).to.have.lengthOf(1);
        expect(filterPastDue[0]).to.equal(list[3]);    
    });
    it('Get task that are completed', () => {
        let filterCompleted = completed(list);
        expect(filterCompleted).to.have.lengthOf(1);
        expect(filterCompleted[0]).to.equal(list[3]);
    });
    it('Get task that are uncompleted', () => {
        let filterUncompleted = uncompleted(list);
        expect(filterUncompleted).to.have.lengthOf(3);
        expect(filterUncompleted).to.have.members(list.slice(0,-1));   
    });
}); 