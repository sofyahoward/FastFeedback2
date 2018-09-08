import React from 'react';
import { Parallax } from 'react-spring';
import classes from'./Parallax.css';

const Page = ({ offset, caption, first, second, gradient, onClick }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className={classes.slopeBegin} />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`${classes.slopeEnd} ${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className={`${classes.text} ${classes.number}`} offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className={`${classes.text} ${classes.header}`} offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: 20 }}>{caption}</p>
        <div className={`${classes.stripe} ${gradient}`} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

class ParallaxComponent extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  render() {
    return (
      <Parallax className={classes.container} ref="parallax" pages={3} horizontal scrolling={false}>
        <Page offset={0} gradient={classes.pink} caption="Fast Feedback" first="Quick Survey Tool" second="For Business" onClick={() => this.scroll(1)} />
        <Page offset={1} gradient={classes.teal} caption="Helping you" first="Hear From Clients" second="Fast" onClick={() => this.scroll(2)} />
        <Page offset={2} gradient={classes.tomato} caption="Improve Your Business" first="Tabulate Results" second="Effectively" onClick={() => this.scroll(0)} />
      </Parallax>
    )
  }
}


export default ParallaxComponent;