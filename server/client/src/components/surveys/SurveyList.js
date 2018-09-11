import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import classes from './SurveyList.css';

class SurveyList extends Component {
    //this life cycle method ensures that every time this component is rendered to the screen, we fetch the surveys through the action creator
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        if(this.props.surveys.length === 0) {
            return (
            <div>
                <div className={classes.NoSurvey}>
                    <div className={classes.Overlay}>
                     <div className={classes.text}>Looks like you dont have any surveys created just yet. Create One now.</div>
                    </div>
                </div>

                <div className="fixed-action-btn">
                    <Link to="/surveys/new" className={classes.addBtn}>
                        <i className="material-icons" style={{color: 'white', position: 'absolute', top: '25%', left: '25%'}}>add</i>
                    </Link>
                </div>
            </div>
            )

        }  
            return this.props.surveys.reverse().map(survey => { 
                return (
                    <div className={classes.Card} key={survey._id}>
                        <div className="card-content">
                            <span className="card-title">{survey.title}</span>
                            <p>
                                {survey.body}
                            </p>
                            <p className="right">
                                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div >
                            <a className={classes.Left}>Yes: {survey.yes}</a>
                            <a className={classes.Right}>No: {survey.no}</a>
                        </div>
                        <div className="fixed-action-btn">
                            <Link to="/surveys/new" className={classes.addBtnRight}>
                                <i className="material-icons" style={{color: 'white', position: 'absolute', top: '25%', left: '25%'}}>add</i>
                            </Link>
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