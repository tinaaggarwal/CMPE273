import React, { Component } from 'react';
import SectionsModal from './SectionsModal';

class Sections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionName: "",
            sectionDescription: "",
            showSectionsModal: false
        }

        this.showSectionsModal = this.showSectionsModal.bind(this);
        this.sectionNameChangeHandler = this.sectionNameChangeHandler.bind(this);
        this.sectionDescriptionChangeHandler = this.sectionDescriptionChangeHandler.bind(this);
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

    render() {
        console.log(this.state.sectionDescription)
        return (
            <div>
                <h6>Sections</h6>
                {this.state.showSectionsModal ?
                    <SectionsModal
                        isOpen={this.state.showSectionsModal}
                        showSectionsModal={this.showSectionsModal}
                        sectionName={this.state.sectionName}
                        sectionDescription={this.state.sectionDescription}
                        sectionNameChangeHandler={this.sectionNameChangeHandler}
                        sectionDescriptionChangeHandler={this.sectionDescriptionChangeHandler}
                    />
                    :
                    null
                }
                <button onClick={this.showSectionsModal}>Add Section</button>
            </div>
        );
    }
}

export default Sections;