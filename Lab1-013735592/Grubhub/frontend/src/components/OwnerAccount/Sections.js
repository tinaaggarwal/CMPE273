import React, { Component } from 'react';
import SectionsModal from './SectionsModal';
import axios from 'axios';

class Sections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionName: "",
            sectionDescription: "",
            sections: [],
            showSectionsModal: false,
            authFlag: false
        }

        this.showSectionsModal = this.showSectionsModal.bind(this);
        this.sectionNameChangeHandler = this.sectionNameChangeHandler.bind(this);
        this.sectionDescriptionChangeHandler = this.sectionDescriptionChangeHandler.bind(this);
        this.submitSection = this.submitSection.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/ownerSections')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    sections: response.data
                });
            });
    }

    showSectionsModal() {
        this.setState({
            showSectionsModal: !this.state.showSectionsModal
        })
    }

    sectionNameChangeHandler = (e) => {
        this.setState({
            sectionName: e.target.value
        })
    }

    sectionDescriptionChangeHandler = (e) => {
        this.setState({
            sectionDescription: e.target.value
        })
    }

    submitSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            section_name: this.state.sectionName,
            section_description: this.state.sectionDescription
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ownerAddSection', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
        this.showSectionsModal()

    };

    render() {

        let message = null;
        if (this.state.authFlag) {
            message = <p>Section added !!!</p>
        } else {
            message = <p>Cannot add section, try again!</p>
        }

        const listItems = this.state.sections.map((section) =>
            <li className="list-group-item">
                <h3>{section.section_name}</h3>
                <p>{section.section_description}</p>
            </li>
        );

        return (
            <div>
                <h6>Sections</h6>
                {message}
                {this.state.showSectionsModal ?
                    <SectionsModal
                        isOpen={this.state.showSectionsModal}
                        showSectionsModal={this.showSectionsModal}
                        sectionName={this.state.sectionName}
                        sectionDescription={this.state.sectionDescription}
                        sectionNameChangeHandler={this.sectionNameChangeHandler}
                        sectionDescriptionChangeHandler={this.sectionDescriptionChangeHandler}
                        submitSection={this.submitSection}
                    />
                    :
                    null
                }
                <button onClick={this.showSectionsModal}>Add Section</button>
                <br/>
                <br/>
                <div className="card">
                <ul className="list-group list-group-flush">{listItems}</ul>
                </div>
            </div>
        );
    }
}

export default Sections;