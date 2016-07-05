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
    render: function () {
        var visible = this.props.isVisibleFunc(this.state.item);
        if (!visible) return null;

        if(!this.props.selected) {
            return (
                <option value={this.props.value}>{this.state.item.name}</option>
            );
        } else {
            return (
                <span>{this.state.item.name} <a href="javascript:void(0)" value={this.props.value} onClick={this.props.onUnselectHandler}>X</a><br /></span>
            );
        }
    }
});

export default Item;
