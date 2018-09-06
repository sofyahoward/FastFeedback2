import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import classes from './Header.css';

class Header extends Component {
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <li><a href = "/auth/google">Login With Google</a></li>;
            default:
                //an array that has a logout button and a pay with stripe button
                return [
                    <div className={classes.Header}>
                        <li key ="1"><Payments/></li>,
                        <li key ="3" style={{margin: '0 10px', color: '#e2ffe5'}} >
                            Credits: {this.props.auth.credits}
                        </li>,
                        <li style={{ color: '#e2ffe5'}} key ="2"><a href='/api/logout'>Logout</a></li>
                    </div>
                ];
        }
    }
    
    render() {
        return (
            <nav className={classes.NavBar}>
                <div className= {classes.Navigation}>
                    <Link
                        //this ternary operators allows us to dynamically render where we get redirected to upon the click of the logo.
                        to = {this.props.auth ? '/surveys' : '/'}
                        className={classes.LeftLogo}
                    >
                        FastFeedback
                    </Link>
                    <ul className={classes.RightLogo}>
                        {/* referencing js in jsx, so we need curly brackets */}
                        {this.renderContent()}
                    </ul>
            </div>
          </nav>
        );
    }
}

function mapStateToProps({auth}) {
    return {auth}
}
export default connect(mapStateToProps)(Header);
