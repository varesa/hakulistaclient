import React from 'react';

var Item = React.createClass({
    getInitialState: function() {
        var item = this;
        $.get("http://127.0.0.1:5000/categories/0/items/" + this.props.itemid, function (response) {
            var tmp = item.state;
            tmp.item = response.data;
            item.setState(tmp);
        });
        return {item: {name: "Item " + this.props.itemid}};
    },
    getDefaultProps: function () {
        return {
            isVisibleFunc: function () { return true; }
        }
    },
    deleteHandler() {
        $.ajax({
            url: "http://127.0.0.1:5000/categories/999/items/" + this.props.itemid,
            method: "DELETE",
            success: function(response) {
                document.dispatchEvent(new Event("ITEM_UPDATED"));
            }
        });
    },
    render: function () {
        var visible = this.props.isVisibleFunc(this.state.item);
        if (!visible) return null;

        if(!this.props.selected) {
            return (
                <option value={this.props.itemid}>{this.state.item.name}</option>
            );
        } else {
            var edit = null;
            if(this.props.edit) {
                edit = <a href="javascript:void(0)" value={this.props.itemid} onClick={this.deleteHandler}>Poista</a>;
            }
            return (
                <span data-selected="yes" data-category={this.props.catname} data-value={this.state.item.name} >
                    {this.state.item.name} <a href="javascript:void(0)" value={this.props.itemid} onClick={this.props.onUnselectHandler}>X</a>&nbsp;&nbsp;&nbsp;
                    { edit }
                    <br />
                </span>
            );
        }
    }
});

export default Item;
