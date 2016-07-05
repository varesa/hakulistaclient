import React from 'react';

import Category from './Category.jsx';

var CategoryList = React.createClass({
    getCategories() {
        var this_ = this;
        $.get("http://127.0.0.1:5000/categories", function (response) {
            var tmp = this_.state;
            tmp.categories = response.data.categories;
            this_.setState(tmp);
        });
    },
    getInitialState: function() {
        this.getCategories();
        var this_ = this;
        document.addEventListener("CAT_UPDATED", function () {
            this_.getCategories();
        });
        return { categories: [] }
    },
    render: function () {
        var this_ = this;
        return (
            <div>
                {
                    this.state.categories.map(function(item) {
                        return <Category key={item.data.id} catid={item.data.id} edit={this_.props.edit}
                                selectItem={this.props.selectItem} unselectItem={this.props.unselectItem} />;
                    })
                }
            </div>
        );
    }
});

export default CategoryList;
