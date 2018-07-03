import {createStore,combineReducers } from 'redux';
import uuid from 'uuid';

const demoState = {
    expenses : [{
        id : 'asjdhaksjd',
        description : 'House rent  ',
        note : 'This is a note',
        amount : 100,
        createdAt : 0
    }],
    filters : {
        text : 'rent',
        sortBy : 'amount',
        startDate : undefined,
        endDate : undefined
    }
};

/* Add expense action */
/* Actions specify what action should be done to the state or what change should be made to the data */
const addExpense = ({description = '', note =  '' , amount = 0 , createdAt = 0 }={}) => ({
    type : 'ADD_EXPENSE',
    expense : {
        id : uuid(),
        description ,
        note ,
        amount ,
        createdAt   
    }
});

/* Remove expense action  */
const removeExpense = (id) => ({
    type : 'REMOVE_EXPENSE',
    id
});

/* Edit expense action */

const editExpense = (id,update)=> ({
    type : 'EDIT_EXPENSE',
    id,
    update
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });
  
  // SORT_BY_DATE
  const sortByDate = () => ({
    type: 'SORT_BY_DATE'
  });
  
  // SORT_BY_AMOUNT
  const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
  });
  
  // SET_START_DATE
  const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
  });
  
  // SET_END_DATE
  const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
  });

const getVisibleExpenses = (expenses,{text,sortBy,endDate,startDate}) =>{
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
        return startDateMatch && endDateMatch && textMatch;
      });
}
const expensesReducerDefaultState = [];
/* Reducer to make any change to the state  */

/* Reducers are pure functions meaning that the function make use of only those arguements mentioned  */

/* Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes. */
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE' : 
            return [...state,action.expense];
        case 'REMOVE_EXPENSE' : 
            return state.filter(({ id })=>{
                return id!== action.id;
            });
        case 'EDIT_EXPENSE' : 
            return state.map((expense)=>{
                if(expense.id === action.id ){
                    return {
                        ...expense,
                        ...action.update
                    };
                }else {
                    return expense;
                }
            });
        default : 
            return state;
    }
};
/* Spread Operator : [...array1] means to display array of name 'array1' , [...array1,'Item'] means to add 'item' to array1  */

const filterReducerDefaulState = {
    text : '',
    sortBy : 'date',
    startDate : undefined,
    endDate : undefined
};

const filterReducer = (state = filterReducerDefaulState ,action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
        default : 
            return state;
    }
};

/* Here the reducers are mentioned  */
const store = createStore(
    combineReducers({
        expenses : expensesReducer,
        filters : filterReducer
    })
);

/* Subscribe function runs whenever there is a change in the state of store created */
store.subscribe(()=>{
    const state =store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);

    console.log(visibleExpenses);
});

/* Dispatch  is used to run an action which we have  */
const expenseOne = store.dispatch(addExpense({
    description : 'rent',
    note: 'THis is some rent ',
    amount : 100,
    createdAt : 10
}));

const expenseTwo = store.dispatch(addExpense({
    description : 'Coffee',
    note: 'THis is some Coffee ',
    amount : 200,
    createdAt : 20
}));

/* console.log(expenseOne); */
/* To remove the expense  */
/* store.dispatch(removeExpense( expenseOne.expense.id )); */

/* To edit the expense  */
/* store.dispatch(editExpense(expenseTwo.expense.id,{ amount : 600 })); */

store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

/* store.dispatch(setStartDate(125)); // startDate 125
store.dispatch(setStartDate()); // startDate undefined
store.dispatch(setEndDate(1250)); // endDate 1250 */