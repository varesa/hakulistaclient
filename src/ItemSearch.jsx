import React from 'react';

const server = "https://vtiger.intra.alrekry.fi:8443";

var ItemSearch = React.createClass({
    getInitialState() {
        return {
            value: ""
        }
    },
    create() {
        $.post(server + "/categories/" + this.props.catid + "/items/", {
            name: this.state.value
        });
        document.dispatchEvent(new Event("ITEM_UPDATED"));
    },

    onUpdate(ev) {
        var tmp = this.state;
        tmp.value = ev.target.value;
        this.setState(tmp);

        this.props.onUpdate(ev); // parent
    },

    render() {
        return (
            <div className="form-inline">
                <input className="form-control" type="text" style={{width: "390px"}}
                       placeholder="Hae / Lisää" onChange={this.onUpdate} />
                <input className="form-control" type="button" style={{width: "60px"}} value="Lisää"
                        onClick={this.create} />
            </div>
        );
    }
});

export default ItemSearch;
