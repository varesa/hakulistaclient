import React from 'react';

import {getCategories} from './Api';

const server = "https://vtiger.intra.alrekry.fi:8443";

var NewCategory = React.createClass({
    getInitialState() {
        return { value: "" };
    },
    onUpdate(ev) {
        var tmp = this.state;
        tmp.value = ev.target.value;
        this.setState(tmp);
    },
    create() {
        $.post(server + "/categories/",
            { name: this.state.value },
            function () { getCategories(); }
        );

        var tmp = this.state;
        tmp.value = "";
        this.setState(tmp);
    },
   render() {
       return (
           <div className="form-inline">
                <input className="form-control" type="text" style={{width: "390px"}}
                       placeholder="Lisää ryhmä" value={this.state.value} onChange={this.onUpdate} />
                <input className="form-control" type="button" style={{width: "60px"}} value="Lisää"
                       onClick={this.create} />
           </div>
       )
   }
});

export default NewCategory;
