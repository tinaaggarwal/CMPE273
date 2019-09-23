import React, { Component } from 'react';
import axios from 'axios';
import './OwnerProfile.css';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            items: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/ownerSections')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    sections: response.data
                });
            });

        axios.get('http://localhost:3001/ownerSectionsItems')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    items: response.data
                });
            });
    }

    render() {

        const listItems = this.state.sections.map((section) =>
            <li className="list-group-item" key={section.section_id}>
                <h3>{section.section_name}</h3>
                <p>{section.section_description}</p>
                <ul className="list-group list-group-flush">
                    {this.state.items.map((item) => {
                        if (item.section_id === section.section_id) {
                            return (
                                <li className="list-group-item" key={item.item_id}>
                                    <div className="card">
                                        {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                                        <h5 className="card-title">{item.item_name}</h5>
                                        <h6 className="card-subtitle">{item.item_description}</h6>
                                        <p className="card-text">{item.item_price}</p>
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
                <div className="card">
                    <ul className="list-group list-group-flush">{listItems}</ul>
                </div>
            </div>
        );
    }
}

export default Menu;