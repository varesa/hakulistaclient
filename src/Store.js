import {createStore, combineReducers} from 'redux';


const categoryReducer = function(state = {}, action) {
    var newstate = Object.assign({}, state);
    if(newstate.categories === undefined) {
        newstate.categories = []
    }
    if(action.type === 'CATEGORY_LIST_UPDATED') {
        newstate.categories = action.categories;
    }
   return newstate;
};

const itemReducer = function(state = {}, action) {
    var newstate = Object.assign({}, state);
    if(newstate.items === undefined) {
        newstate.categories = []
    }
    if(action.type === 'ITEM_LIST_UPDATED') {
        newstate.items[action.catid] = action.items;
    }
    return newstate;
};

const reducers = combineReducers({
    categoryState: categoryReducer,
    itemState: itemReducer
});

const store = createStore(reducers);

export default store;

function getCategory(catid) {
    var categories = store.getState().categoryState.categories;
    for(var i = 0; i < categories.length; i++) {
        if(categories[i].data.id === catid) {
            return categories[i];
        }
    }
}

export { getCategory };
