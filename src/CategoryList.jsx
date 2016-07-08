import React from 'react';
import { connect } from 'react-redux';

import Category from './Category.jsx';

class CategoryList extends React.Component {
    render() {
        var this_ = this;
        return (
            <div>
                {
                    this.props.categories.map(function(item) {
                        return <Category key={item.data.id} category={item} edit={this_.props.edit} />;
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        categories: store.categoryState.categories
    }
};

export default connect(mapStateToProps)(CategoryList);
