import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <li><a href = "/auth/google">Login With Google</a></li>;
            default:
                return <li><a href = "/api/logout">Logout</a></li>
        }
    }
    
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        //this ternary operators allows us to dynamically render where we get redirected to upon the click of the logo.
                        to = {this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        FastFeedback
                    </Link>
                    <ul className="right">
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
