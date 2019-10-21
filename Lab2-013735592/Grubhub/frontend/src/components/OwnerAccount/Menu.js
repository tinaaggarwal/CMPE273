import React, { Component } from 'react';
import './OwnerProfile.css';
import './Menu.css';
import { ownerMenuActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            items: []
        }
    }

    componentDidMount() {

        this.props.ownerSections();

        this.props.ownerItemsList();

    }

    submitDeleteItem = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            deleteId: e.target.id
        }
        console.log(data.deleteId)
        //set the with credentials to true
        this.props.ownerDeleteItem(data);

        window.location.reload();

    };

    render() {

        let message = null;

        if (this.props.errorMessage) {
            message = <p>Failed, try again!</p>
        }

        if (this.props.deletedMessage) {
            message = <p>Item successfully deleted!</p>
        }

        const listItems = this.props.sections.map((section) =>
            <li className="list-group-item" key={section.section_id}>
                <h3>{section.section_name}</h3>
                <p>{section.section_description}</p>
                <ul className="list-group list-group-flush">
                    {this.props.items.map((item) => {
                        if (item.section_id === section.section_id) {
                            return (
                                <li className="list-group-item" key={item.item_id}>
                                    <div className="card">
                                        <div className="itemLayout">
                                            <img className="itemImage" src={item.item_image} title={item.item_name}/>
                                            <div className="itemDetails">
                                                <h5 className="card-title">{item.item_name}</h5>
                                                <h6 className="card-subtitle">{item.item_description}</h6>
                                                <p className="card-text">$ {item.item_price}</p>
                                                <button onClick={this.submitDeleteItem} id={item.item_id} className="btn btn-link" type="button" name="Update">Delete</button>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            );
                        }
                    })}
                </ul>
            </li>
        );

        return (
            <div className="divStyle">
                {message}
                <div className="card">
                    <ul className="list-group list-group-flush">{listItems}</ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        sections: state.ownerMenu.sections,
        items: state.ownerMenu.items,
        deletedMessage: state.ownerMenu.deletedMessage,
        errorMessage: state.ownerMenu.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => ({
    ownerSections: () => dispatch(ownerMenuActions.ownerSections()),
    ownerItemsList: () => dispatch(ownerMenuActions.ownerItemsList()),
    ownerDeleteItem: data => dispatch(ownerMenuActions.ownerDeleteItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);