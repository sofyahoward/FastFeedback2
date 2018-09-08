import React, {Component} from 'react';
// import { Col, Container, Row, Footer } from 'mdbreact';
import classes from './Footer.css';


class FooterPg extends Component {
    render(){
        return(
            <div className={`${classes.nav} ${classes.mobilenav} ${classes.footer}`}>
                <div className={classes.left}>
                    <div style={{color: '#ffff00'}}>Address</div>
                    <ul style={{color: '#20232f', textAlign: 'left'}}>
                        <li>110 Sample Street</li>
                        <li>New York, NY</li>
                        <li>11101</li>
                    </ul>
                </div>
                
                <div className={classes.headerTitle}>
                    <div style={{color: '#ffff00'}}>Developer GitHubs</div>
                    <ul style={{color: '#20232f'}}>
                        <li><a href="https://github.com/ahowardc" target="_blank" style={{color: '#20232f'}}>Akil Howard</a></li>
                        <li><a href="https://github.com/sofyahoward" target="_blank" style={{color: '#20232f'}}>Sofya Howard</a></li>
                        <li></li>
                    </ul>
                </div>
                <div className={classes.logout}>
                <div style={{color: '#ffff00'}}>Get In Touch</div>
                    <ul style={{color: '#20232f', textAlign:'right', overflow: 'scroll'}}>
                        <li >Reach out via GitHub</li>
                        <li >If you want us to create</li>
                        <li >A website or application </li>
                    </ul>
                </div>
             </div>
        );
    }
}

export default FooterPg;