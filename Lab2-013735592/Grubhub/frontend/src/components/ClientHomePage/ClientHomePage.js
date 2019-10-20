import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ClientHomePage.css';
import { homePageActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class ClientHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            cuisines: [],
            filterCuisine: "",
            searchItem: "",
            authFlag: false
        }

        this.searchBoxChangeHandler = this.searchBoxChangeHandler.bind(this);
        this.cuisineFilterChangeHandler = this.cuisineFilterChangeHandler.bind(this);
        this.submitSearch = this.submitSearch.bind(this);

    }

    componentDidMount() {

        this.props.restaurantList();

        this.props.nextOrderId();

        this.props.distinctCuisines();

    }

    submitSearch = (e) => {

        const data = {
            searchItem: this.state.searchItem,
            filterCuisine: this.state.filterCuisine
        }
        this.props.searchItem(data);
    };

    cuisineFilterChangeHandler = (e) => {
        this.setState({
            filterCuisine: e.target.value
        },
            this.submitSearch
        );
    }

    searchBoxChangeHandler = (e) => {
        this.setState({
            searchItem: e.target.value
        })
    }

    render() {

        //if not logged in go to login page
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }

        var options = [<option value="---" key="None">---</option>];
        var moreOptions = this.props.cuisines.map(cuisine => {
            return (
                <option value={cuisine.cuisine} key={cuisine.cuisine}>{cuisine.cuisine}</option>
            )
        })

        options = options.concat(moreOptions);

        const restaurantsList = this.props.restaurants.map((restaurant) =>
            <Link to={`/home/${restaurant.r_id}`} key={restaurant.r_id} className="nav-link">
                <div className="card mb-3" >
                    <img className="restImage" src={restaurant.rest_image} alt={restaurant.rest_image}/>
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.rest_name}</h5>
                        <p className="card-text">{restaurant.cuisine}</p>
                        <p className="card-text"><small className="text-muted">{restaurant.rest_zip_code}</small></p>
                    </div>
                </div>
            </Link>
        );

        return (
            <div className="container">
                {redirectVar}
                <div className="searchLayout">
                    <input type="text" className="form-control" name="searchBox" onChange={this.searchBoxChangeHandler} placeholder="Item name (E.g. Pizza)" />
                    <button onClick={this.submitSearch} className="searchbar">
                        <img src="search.png" className="searchBtn" alt="Search"/>
                    </button>
                    <select
                        id="cuisine"
                        name="selectCuisine"
                        className="form-control"
                        onChange={this.cuisineFilterChangeHandler}
                    >
                        {options}
                    </select>
                </div>
                {restaurantsList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        restaurants: state.homePage.restaurants,
        cuisines: state.homePage.cuisines
    };
};

const mapDispatchToProps = (dispatch) => ({
    restaurantList: () => dispatch(homePageActions.restaurantList()),
    nextOrderId: () => dispatch(homePageActions.nextOrderId()),
    distinctCuisines: () => dispatch(homePageActions.distinctCuisines()),
    searchItem: payload => dispatch(homePageActions.searchItem(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);

