import React from 'react';
import {render} from 'react-dom';

import CategoryList from './CategoryList.jsx';
import NewCategory from './NewCategory';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    
    selectItem(catid, itemid, itemtext) {
        
    }
    
    unselectItem(catid, itemid) {
        
    }

    enableEdit(ev) {
        var tmp = this.state;
        tmp.edit = true;
        this.setState(tmp);
    }

    disableEdit(ev) {
        var tmp = this.state;
        tmp.edit = false;
        this.setState(tmp);
    }

    render() {
        var edit =
            !this.state.edit ?
                <a href="javascript:void(0)" onClick={this.enableEdit.bind(this)}>Muokkaustila</a> :
                <div>
                    <NewCategory /><br />
                    <a href="javascript:void(0)" onClick={this.disableEdit.bind(this)}>Lopeta muokkaaminen</a>
                </div>;

        return (
            <div>
                <CategoryList edit={this.state.edit} selectItem={this.selectItem} unselectItem={this.unselectItem}></CategoryList>
                <br /><br />
                { edit }
                <br /><br />
            </div>
        );
    }
}


render(<App/>, document.getElementById('app'));
