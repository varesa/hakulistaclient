import React from 'react';

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
        $.post("http://127.0.0.1:5000/categories/", {
            name: this.state.value
        });
        var tmp = this.state;
        tmp.value = "";
        this.setState(tmp);
        document.dispatchEvent(new Event("CAT_UPDATED"));
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
