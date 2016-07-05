import React from 'react';

import ItemSearch from './ItemSearch.jsx';
import Item from './Item.jsx';

var ItemList = React.createClass({

    getItems() {
        var itemList = this;
        $.get("http://127.0.0.1:5000/categories/" + this.props.catid + "/items", function (response) {
            var tmp = itemList.state;
            tmp.items = response.data.items;
            itemList.setState(tmp);
        });
    },

    getInitialState: function() {
        this.getItems();

        var this_ = this;
        document.addEventListener('ITEM_UPDATED', function () {
            this_.getItems();
        });

        return {items: [], selected: [], filter: ""};
    },
    
    updateSearch(ev) {
        var tmp = this.state;
        tmp.filter = ev.target.value;
        this.setState(tmp);
    },
    
    isItemVisible(item) {
        return item.name.toLowerCase().includes(this.state.filter.toLowerCase());
    },

    onSelectHandler(ev) {
        var sel_id = ev.target.value;
        var tmp = this.state;
        tmp.selected.push(parseInt(sel_id));
        this.setState(tmp);
    },

    onUnselectHandler(ev) {
        var sel_id = ev.target.attributes['value'].value; // <a>.value doesn't exist
        var tmp = this.state;
        tmp.selected.splice(tmp.selected.indexOf(sel_id));
        this.setState(tmp);
    },

    isSelected(item) {
        return this.state.selected.indexOf(item.data.id) > -1
    },
    
    render: function () {
        var itemList = this;
        var state = this.state;
        return (
            <div>
                <ItemSearch onUpdate={this.updateSearch} catid={this.props.catid} />
                <!-- Unselected -->
                <div style={{float: "left", width: "450px"}}>
                    <select multiple="yes" style={{width: "450px", height: "500px"}} onChange={itemList.onSelectHandler}>
                    {
                        state.items.map(function(item) {
                            if(!itemList.isSelected(item)) {
                                return <Item key={item.data.id} value={item.data.id} itemid={item.data.id} selected={false}
                                             isVisibleFunc={itemList.isItemVisible} />;
                            } else {
                                return null;
                            }
                        })
                    }
                    </select>
                </div>
                <!-- Selected -->
                <div style={{float: "left", width: "100px", marginLeft: "20px"}}>
                    {
                        state.items.map(function(item) {
                            if(itemList.isSelected(item)) {
                                return <Item key={item.data.id} value={item.data.id} itemid={item.data.id} selected={true}
                                             onUnselectHandler={itemList.onUnselectHandler} />;
                            } else {
                                return null;
                            }

                        })
                    }
                </div>
            </div>
        );
    }
});

export default ItemList;
