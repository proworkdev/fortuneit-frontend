// import React, { Component, Fragment } from 'react'
// import ReactDOM from 'react-dom';
// import posed from 'react-pose';
// import SplitText from 'react-pose-text'
// import { tween } from 'popmotion';
// import { interpolate } from 'flubber';
// import './styles.css';

// // Clickable Box
// // const Box = posed.div({
// //     pressable: true,
// //     init: { scale: 1 },
// //     press: { scale: 0.8 }
// // });

// // On Hover Box
// // const Box = posed.div({
// //   hoverable: true,
// //   pressable: true,
// //   init: {
// //     scale: 1,
// //     boxShadow: '0px 0px 0px rgba(0,0,0,0)'
// //   },
// //   hover: {
// //     scale: 1.2,
// //     boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
// //   },
// //   press: {
// //     scale: 1.1,
// //     boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
// //   }
// // });

// // Input On Focus
// // const Input = posed.input({
// //   focusable: true,
// //   init: {
// //     color: '#aaa',
// //     outlineWidth: '0px',
// //     outlineOffset: '0px',
// //     scale: 1
// //   },
// //   focus: {
// //     color: '#000',
// //     outlineWidth: '12px',
// //     outlineOffset: '5px',
// //     outlineColor: '#AB36FF',
// //     scale: 1.2
// //   }
// // });

// // Draggable Box
// // const Box = posed.div({
// //   draggable: true
// // });

// // Image Filter
// // const Img = posed.img({
// //     hoverable: true,
// //     init: { filter: 'grayscale(80%) blur(1px)' },
// //     hover: { filter: 'grayscale(0%) blur(0px)' }
// // });

// // Split Text
// // const Sidebar = posed.div({
// //     exit: {
// //         x: '-100%'
// //     },
// //     enter: {
// //         x: '0%',
// //         beforeChildren: true,
// //         staggerChildren: 50
// //     }
// // });

// // const charPoses = {
// //     exit: { opacity: 0 },
// //     enter: { opacity: 1 }
// // };

// // Another Saplit
// // const charPoses = {
// //     exit: { y: 20, opacity: 0 },
// //     enter: {
// //         y: 0,
// //         opacity: 1,
// //         transition: ({ charInWordIndex }) => ({
// //             type: 'spring',
// //             delay: charInWordIndex * 30,
// //             stiffness: 500 + charInWordIndex * 150,
// //             damping: 10 - charInWordIndex * 1
// //         })
// //     }
// // };

// // Draggable & Split Text
// // const wordPoses = {
// //   draggable: true
// // };

// // const charPoses = {
// //   drag: {
// //     y: 0,
// //     transition: ({ charInWordIndex }) => ({
// //       type: 'spring',
// //       velocity: 100 * Math.sin(1 + charInWordIndex),
// //       damping: 0
// //     })
// //   },
// //   dragEnd: {
// //     y: 0,
// //     transition: {
// //       type: 'spring',
// //       damping: 10,
// //       stiffness: 1000
// //     }
// //   }
// // };

// // Another Split Text
// // const charPoses = {
// //   exit: { opacity: 0, y: 20 },
// //   enter: {
// //     opacity: 1,
// //     y: 0,
// //     delay: ({ charIndex }) => charIndex * 30
// //   }
// // };

// // SVG Morphing
// const paths = {
//     plane:
//         'M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25 l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z',
//     circle:
//         'M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z',
//     heart:
//         'M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z',
//     bookmark:
//         'M357,0H102C73.95,0,51,22.95,51,51v408l178.5-76.5L408,459V51C408,22.95,385.05,0,357,0z'
// };

// const pathIds = Object.keys(paths);

// const morphTransition = ({ from, to }) =>
//     tween({
//         from: 0,
//         to: 1
//     }).pipe(interpolate(from, to));

// const Icon = posed.path(
//     pathIds.reduce((config, id) => {
//         config[id] = {
//             d: paths[id],
//             transition: morphTransition
//         };

//         return config;
//     }, {})
// );

// const NextButton = posed.button({
//     hoverable: true,
//     pressable: true,
//     init: { scale: 1 },
//     hover: { scale: 1.1 },
//     press: { scale: 0.8 }
// });

// export default class testAnimations extends Component {

//     state = { pathIndex: 0 };

//     gotoNext = () => {
//         const { pathIndex } = this.state;
//         const nextIndex = pathIndex + 1;
//         this.setState({
//             pathIndex: nextIndex > pathIds.length - 1 ? 0 : nextIndex
//         });
//     };

//     render() {
//         return (
//             <div>
//                 <Fragment>
//                     <svg width="400" height="400" viewBox="0 0 520 500">
//                         <Icon pose={pathIds[this.state.pathIndex]} />
//                     </svg>
//                     <NextButton onClick={this.gotoNext}>Next icon!</NextButton>
//                 </Fragment>
//                 {/* <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
//         React Pose Text
//       </SplitText> */}
//                 {/* <SplitText wordPoses={wordPoses} charPoses={charPoses}>
//         React Pose Text
//       </SplitText> */}
//                 {/* <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
//                     React Pose Text
//       </SplitText> */}
//                 {/* <Sidebar class="sidebar" initialPose="exit" pose="enter">
//                     <h1>
//                         <SplitText charPoses={charPoses}>Contents</SplitText>
//                     </h1>
//                 </Sidebar> */}
//                 {/* <Img src="https://static1.squarespace.com/static/5b475b2c50a54f54f9b4e1dc/5b4a5c2d88251b376ea105c1/5b4ae647575d1fa91f1f2def/1531635336765/DSCF2959.jpg?format=1500w" /> */}
//                 {/* <Box className="box" /> */}
//                 {/* <Input value="Gimme focus!" /> */}
//             </div>
//         )
//     }
// }


import React, { Component } from 'react';
import './styles.css';

class testAnimations extends Component {
    state = {
        focused: false
    }
    componentDidMount() {
        this.input.addEventListener('focus', this.focus);
        this.input.addEventListener('blur', this.focus);
    }
    focus = () => {
        this.setState((state) => ({ focused: !state.focused }))
    }
    render() {
        return (
            <div className="App">
                <div className="container">
                    <input
                        ref={input => this.input = input}
                        className={['input', this.state.focused && 'input-focused'].join(' ')}
                    />
                </div>
            </div>
        );
    }
}

export default testAnimations;