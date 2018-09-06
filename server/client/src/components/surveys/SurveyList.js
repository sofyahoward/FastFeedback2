import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    //this life cycle method ensures that every time this component is rendered to the screen, we fetch the surveys through the action creator
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys }
}
// use react-redux connect helper to manage state
//use mapState to Props as the first argument to get global state and surveys. We got "surveys" from the index.js reducer file where it is imported from the surveysReducer. Surveys reducer takes in a type of FETCH_SURVEYS
// second argument is the action creator
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);