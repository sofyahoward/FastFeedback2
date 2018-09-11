import React, { Component} from 'react';
import Parallax from '../../components/landing/Parallax/Parallax';
import Description from '../landing/Description/Description';




class Landing extends Component{
    render() {
        return (
            <div>
                <Parallax/>
                <Description/>
            </div>
        );
    } 
};
export default Landing;