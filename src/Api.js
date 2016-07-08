import store from './Store';
import {getCategory} from './Store';

const server = "http://127.0.0.1:5000";

function getCategories() {
    console.log("Updating");
    $.get(server + "/categories", function (response) {
        store.dispatch({
            type: 'CATEGORY_LIST_UPDATED',
            categories: response.data.categories
        });
    });
}

function renameCategory(catid, newname) {
    $.ajax({
        url: server + "/categories/" + catid,
        data: {name: newname},
        method: "PUT",
        success: function (response) {
            store.dispatch({
                type: 'CATEGORY_LIST_UPDATED',
                categories: response.data.categories
            });
        }
    });
}

function deleteCategory(catid){
    $.ajax({
        url: server + "/categories/" + catid,
        method: "DELETE",
        success: function(response) {
            getCategories();
        }
    });
}

function moveCategoryUp(catid) {
    var category = getCategory(catid);
    $.ajax({
        url: "http://127.0.0.1:5000/categories/" + category.data.id,
        data: {order: category.data.order - 1},
        method: "PUT",
        success: function (response) {
            getCategories();
        }
    });
}

function moveCategoryDown(catid) {
    var category = getCategory(catid);
    $.ajax({
        url: "http://127.0.0.1:5000/categories/" + category.data.id,
        data: {order: category.data.order + 1},
        method: "PUT",
        success: function (response) {
            getCategories();
        }
    });
}


export { getCategories, renameCategory, deleteCategory, moveCategoryUp, moveCategoryDown, };
