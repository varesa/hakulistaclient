import React from 'react';

import ItemList from './ItemList.jsx';

var Category = React.createClass({
    getCategory() {
        var this_ = this;
        $.get("http://127.0.0.1:5000/categories/" + this.props.catid, function (response) {
            var tmp = this_.state;
            tmp.category = response.data;
            this_.setState(tmp);
        });
    },
    getInitialState: function() {
        this.getCategory();
        var this_ = this;
        document.addEventListener("CAT_UPDATED", function () {
            this_.getCategory();
        });
        return {category: {name: "Cat " + this.props.catid, order: -1}};
    },

    nameChange(ev) {
        var tmp = this.state;
        tmp.category.name = ev.target.value;
        this.setState(tmp);
    },

    rename(ev) {
        $.ajax({
            url: "http://127.0.0.1:5000/categories/" + this.props.catid,
            data: {name: this.state.category.name},
            method: "PUT",
            success: function (response) {
                document.dispatchEvent(new Event("CAT_UPDATED"));
            }
        });
    },

    delete() {
        $.ajax({ url: "http://127.0.0.1:5000/categories/" + this.props.catid, method: "DELETE", success: function(response) {
           document.dispatchEvent(new Event("CAT_UPDATED"));
        }});
    },

    moveUp() {
        console.log("up");
        $.ajax({
            url: "http://127.0.0.1:5000/categories/" + this.props.catid,
            data: {order: this.state.category.order - 1},
            method: "PUT",
            success: function (response) {
                document.dispatchEvent(new Event("CAT_UPDATED"));
            }
        });
    },

    moveDown() {
        console.log("down");
        $.ajax({
            url: "http://127.0.0.1:5000/categories/" + this.props.catid,
            data: {order: this.state.category.order + 1},
            method: "PUT",
            success: function (response) {
                document.dispatchEvent(new Event("CAT_UPDATED"));
            }
        });
    },

    render: function () {
        var header = this.props.edit ?
            <div className="form-inline">
                <input type="text" className="form-control" value={this.state.category.name} onChange={this.nameChange}/>
                <a href="javascript:void(0)" onClick={this.rename}> Uudelleennimeä </a>
                <a href="javascript:void(0)" onClick={this.moveUp}> Siirrä ylös </a>
                <a href="javascript:void(0)" onClick={this.moveDown}> / alas </a>
                <a href="javascript:void(0)" onClick={this.delete}> Poista </a>
            </div> :
            <h3>{this.state.category.name}</h3>;
        return (
            <div>
                { header }
                <ItemList catid={this.props.catid}
                          selectItem={this.props.selectItem} unselectItem={this.props.unselectItem} />
                <div style={{clear: "both"}}></div>
                <br /><br />
            </div>
        );
    }
});

export default Category;
