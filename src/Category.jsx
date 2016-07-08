import React from 'react';

import ItemList from './ItemList.jsx';
import {renameCategory, deleteCategory, moveCategoryUp, moveCategoryDown} from './Api';

class Category extends React.Component {

    nameChange(ev) {
        var tmp = this.state;
        tmp.name = ev.target.value;
        this.setState(tmp);
    }

    rename(ev) {
        renameCategory(this.props.category.data.id, this.state.name);
    }

    del() {
        deleteCategory(this.props.category.data.id);
    }

    moveUp() {
        moveCategoryUp(this.props.category.data.id);
    }

    moveDown() {
        moveCategoryDown(this.props.category.data.id);
    }

    render() {
        var header = this.props.edit ?
            <div className="form-inline">
                <br/><br/>
                <input type="text" className="form-control" value={this.props.category.data.name} onChange={this.nameChange}/>
                <a href="javascript:void(0)" onClick={this.rename.bind(this)}> Uudelleennimeä </a>
                <a href="javascript:void(0)" onClick={this.moveUp.bind(this)}> Siirrä ylös </a>
                <a href="javascript:void(0)" onClick={this.moveDown.bind(this)}> / alas </a>
                <a href="javascript:void(0)" onClick={this.del.bind(this)}> Poista </a>
            </div> :
            <h3>{this.props.category.data.name}</h3>;
        return (
            <div>
                { header }
                <ItemList catid={this.props.category.data.id} catname={this.props.category.data.name} edit={this.props.edit}
                          selectItem={this.props.selectItem} unselectItem={this.props.unselectItem} />
                <div style={{clear: "both"}}></div>
                <br /><br />
            </div>
        );
    }
}

export default Category;
