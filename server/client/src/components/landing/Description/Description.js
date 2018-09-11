import React, {Component} from 'react';
// import { Col, Container, Row, Footer } from 'mdbreact';
import classes from './Description.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Description extends Component {
    render(){
        return(
            <div className={`${classes.nav} ${classes.mobilenav} ${classes.footer}`}>
                 <h4 style={{position: 'absolute', top: '30px', marginBottom: '30px', left: '30%'}}>Fast Feedback Is Here For You</h4>
                <div className={classes.left} style={{textAlign: 'center'}}>
                    <MaterialIcon icon="accessibility_new" color={colorPalette.blue._300} size={125}/>
                    <ul style={{color: '#20232f', textAlign: 'center'}}>
                        <li>Do you want to </li>
                        <li>get feedback from customers </li> 
                        <li>but it takes too long</li>
                        <li>to send emails</li>
                        <li>and compile responses?</li>
                    </ul>
                </div>
                
                <div className={classes.headerTitle} >
                    <div style={{color: '#ffff00'}}>
                    <MaterialIcon icon="assignment_turned_in" color={colorPalette.blue._300}size={125}/>
                    </div>
                    <ul style={{color: '#20232f', textAlign: 'center'}}>
                        <li style={{fontWeight:'bold'}}>With Fast Feedback it is easy:</li>
                        <li>1. Create a survey campaign </li>
                        <li>2. Send it to all clients </li> 
                        <li>3. We will compile the data</li>
                        <li>In your personal dashboard</li>
                    </ul>
                </div>
                <div className={classes.logout}>
                <div style={{color: '#ffff00', textAlign: 'center'}}>
                <MaterialIcon icon="email" color={colorPalette.blue._300} size={125}/>
                </div>
                <ul style={{color: '#20232f', textAlign: 'center'}}>
                        <li>Use the data to improve</li>
                        <li>Your business</li>
                        <li>Client engagement</li> 
                        <li>Your revenue and bottom line</li>
                        <li>Your business deserves it</li>
                    </ul>
                </div>
             </div>
        );
    }
}

export default Description;