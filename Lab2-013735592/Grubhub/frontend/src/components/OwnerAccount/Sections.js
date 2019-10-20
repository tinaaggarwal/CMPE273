import React, { Component } from 'react';
import SectionsModal from './SectionsModal';
import './OwnerProfile.css';
import { ownerMenuActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class Sections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionName: "",
            sectionDescription: "",
            sections: [],
            showSectionsModal: false,
            authFlag: false,
            errorMessage: false,
            updatedMessage: false,
            deletedMessage: false,
            btnType: "",
            editSectionID: null
        }

        this.showSectionsModal = this.showSectionsModal.bind(this);
        this.sectionNameChangeHandler = this.sectionNameChangeHandler.bind(this);
        this.sectionDescriptionChangeHandler = this.sectionDescriptionChangeHandler.bind(this);
        this.submitSection = this.submitSection.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.submitDeleteSection = this.submitDeleteSection.bind(this);
        this.btnTypeClicked = this.btnTypeClicked.bind(this);
    }

    componentDidMount() {

        this.props.ownerSections();

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

    btnTypeClicked = (e) => {

        if(e.target.name == 'Update') {

            const sectionToEdit = this.props.sections.filter(section => {
                return section.section_id == e.target.id;
              });

            this.setState({
                editSectionID: e.target.id,
                sectionName: sectionToEdit[0].section_name,
                sectionDescription: sectionToEdit[0].section_description
            })
        }

        this.setState({
            btnType: e.target.name
        });
        this.showSectionsModal()
    }

    submitSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            section_name: this.state.sectionName,
            section_description: this.state.sectionDescription
        }
        
        this.props.ownerAddSection(data);

        this.showSectionsModal();
        window.location.reload();
    };

    updateSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            section_id: this.state.editSectionID,
            section_name: this.state.sectionName,
            section_description: this.state.sectionDescription
        }
        this.props.ownerUpdateSection(data);

        this.showSectionsModal();
        window.location.reload();
    };

    submitDeleteSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            deleteId: e.target.id
        }

        console.log(data.deleteId)
        this.props.ownerDeleteSection(data);

        window.location.reload();
    };

    render() {

        let sectionsList;
        let message = null;
        
        if (this.props.authFlag) {
            message = <p>Section added !!!</p>
        }
        
        if (this.props.errorMessage) {
            message = <p>Failed, try again!</p>
        }

        if (this.props.updatedMessage) {
            message = <p>Section successfully updated!</p>
        }

        if (this.props.deletedMessage) {
            message = <p>Section successfully deleted!</p>
        }

        if (this.props.sections.length > 0) {
            sectionsList = this.props.sections.map((section) =>
                <li className="list-group-item" key={section.section_id}>
                    <p>{section.section_name}</p>
                    <p>{section.section_description}</p>
                    <button onClick={this.btnTypeClicked} id={section.section_id} className="btn btn-link" type="button" name="Update">Edit</button>
                    <button onClick={this.submitDeleteSection} id={section.section_id} className="btn btn-link" type="button" name="Delete">Delete</button>
                </li>
            );
        }

        return (
            <div className="divStyle">
                <h6>Sections</h6>
                <div className="card">
                    <ul className="list-group list-group-flush">{sectionsList}</ul>
                </div>
                {message}
                {this.state.showSectionsModal ?
                    <SectionsModal
                        isOpen={this.state.showSectionsModal}
                        showSectionsModal={this.showSectionsModal}
                        sectionName={this.state.sectionName}
                        sectionDescription={this.state.sectionDescription}
                        sectionNameChangeHandler={this.sectionNameChangeHandler}
                        sectionDescriptionChangeHandler={this.sectionDescriptionChangeHandler}
                        submitSection={this.state.btnType === 'Add' ? this.submitSection : this.updateSection}
                        btnType={this.state.btnType}
                    />
                    :
                    <div>
                        <button onClick={this.btnTypeClicked} name="Add">Add Section</button>
                        <br />
                        <br />
                    </div>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        sections: state.ownerMenu.sections,
        deletedMessage: state.ownerMenu.deletedMessage,
        errorMessage: state.ownerMenu.errorMessage,
        authFlag: state.ownerMenu.authFlag
    };
};

const mapDispatchToProps = (dispatch) => ({
    ownerSections: () => dispatch(ownerMenuActions.ownerSections()),
    ownerAddSection: data => dispatch(ownerMenuActions.ownerAddSection(data)),
    ownerUpdateSection: data => dispatch(ownerMenuActions.ownerUpdateSection(data)),
    ownerDeleteSection: data => dispatch(ownerMenuActions.ownerDeleteSection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sections);