import moment from 'moment';

// // Sort list by date comparing property [prop]
// const sortGenerator = function(prop) {
//     // return sorting function
//     return (list) => list.sort((itemA, itemB) => {    
//         if (itemA[prop] == itemB[prop]) return 0;
//         // check for null, undefined value
//         if (!itemA[prop]) return 1;
//         if (!itemB[prop]) return -1;    

//         return moment(itemA[prop]).isBefore(itemB[prop]) ? -1 : 1;
//     });
// };

export const sortDueDate = function(list) {
    return list.sort((itemA, itemB) => {
        if (itemA.dueDate == itemB.dueDate) return 0;
        if (!itemA.dueDate) return 1;
        if (!itemB.dueDate) return -1;

        return moment(itemA.dueDate).isBefore(itemB.dueDate) ? -1 : 1;
    });
};

export const sortCompletedDate = function(list) {
    return list.sort((itemA, itemB) => {
        if (itemA.completed == itemB.completed) return 0;
        if (!itemA.completed) return -1;
        if (!itemB.completed) return 1;

        return moment(itemA.completed).isAfter(itemB.completed) ? -1 : 1;
    });
};

// return task that are due today
export const dueToday = function(list) {
    return list.filter( ({ dueDate }) => {
        if (!dueDate) return false; // no due date specified return false
        return moment(dueDate).isSame(moment(), 'day');
    });    
};
// return task that are due tomorrow
export const dueTomorrow = function(list) {
    return list.filter( ({ dueDate }) => {
        if (!dueDate) return false;
        return moment(dueDate).isSame(moment().add(1,'day'), 'day');
    });
};
// Task that where completed today
// export const completedToday = function(list) {
//     return list.filter( ({ completed }) => moment(completed).isSame(moment(), 'day'));
// };
// return task that are past due

//export const 
export const pastDue = function(list) { 
    return list.filter( ({dueDate}) => moment(dueDate).isBefore(moment(), 'second'));
};
// return completed task only
export const completed = function(list) {
    return list.filter( ({ completed } ) => completed ? true : false );
};
// return uncompleted task only
export const uncompleted = function(list) {
    return list.filter( ({ completed }) => completed ? false : true );
};

