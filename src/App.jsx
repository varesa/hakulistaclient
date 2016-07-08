import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './Store';
import CategoryList from './CategoryList.jsx';
import NewCategory from './NewCategory';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
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

    copyText(ev) {
        var o = {};
        var selected = $("span[data-selected=yes]");
        selected.each(function(index, elem) {
            if ( typeof o[$(elem).attr("data-category")] === "undefined") {
                o[$(elem).attr("data-category")] = [$(elem).attr("data-value")];
            } else {
                o[$(elem).attr("data-category")].push($(elem).attr("data-value"));
            }
        });

        var text = "";

        var categories = Object.keys(o);
        for (var cid = 0; cid < categories.length; cid++) {
            var cat = categories[cid];
            text += cat + ":\n";
            for (var i = 0; i < o[cat].length; i++) {
                text += o[cat][i] + "\n";
            }
            text += "\n\n\n";
        }

        var textarea = $("<textarea>");
        textarea.text(text);
        $("body").append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    render() {
        var edit =
            !this.state.edit
                ?
                    <div><a href="javascript:void(0)" onClick={this.enableEdit.bind(this)}>Muokkaustila</a>
                        &nbsp;&nbsp;&nbsp;<a href="javascript:void(0)"  onClick={this.copyText}>Kopioi</a></div>
                :
                    <div>
                        <NewCategory /><br />
                        <a href="javascript:void(0)" onClick={this.disableEdit.bind(this)}>Lopeta muokkaaminen</a>
                    </div>;

        return (
            <div>
                <CategoryList edit={this.state.edit} />
                <br /><br />
                { edit }
                <br /><br />
            </div>
        );
    }
}


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

import {getCategories} from './Api';
getCategories();
