// import React, { useEffect, useState } from 'react'
// import {connect} from 'react-redux'
// import {signIn,signOut} from '../actions'

// const onAuthChange=(isSignedIn)=>{
//     // const auth =window.gapi.auth2.getAuthInstance()
//     // setIsSignedIn(auth.isSignedIn.get())
// if(isSignedIn){
//     signIn()
// }
// else{
//     signOut()
// }
// }
// const onSignOutClick=()=>{
//     const auth =window.gapi.auth2.getAuthInstance()
//     auth.signOut()
// }
// const onSignInClick=()=>{
//     const auth =window.gapi.auth2.getAuthInstance()
//      auth.signIn()
// }
// const renderAuthButton =()=>{
//   if(isSignedIn===null){
//       return null
//   }
//   else if(isSignedIn){
//       return (
//           <button className='ui red google button'
//           onClick={onSignOutClick}
//           >
//               <i className='google icon'/>
//               Sign Out
//               </button>
//       )
//   }
//   else{
//      return (
//         <button className='ui blue google button'
//         onClick={onSignInClick}
//        >
//         <i className='google icon'/>
//         Sign In with Google
//         </button>
//      )
//   }
// }
// function GoogleAuth({signIn,signOut}) {
//     // const [isSignedIn,setIsSignedIn] =useState(null)
//     useEffect(()=>{
//         window.gapi.load('client:auth2',()=>{
//             window.gapi.client.init({
//                 clientId:'583708981065-na3r15mhh5voqfsjr2l46jqn20b7tdjf.apps.googleusercontent.com',
//                 scope:'email'
//             }).then(()=>{
//                 const auth =window.gapi.auth2.getAuthInstance()
//                   onAuthChange(auth.isSignedIn.get(),isSignedIn)
//                 //   setIsSignedIn(auth.isSignedIn.get())
//                   auth.isSignedIn.listen(onAuthChange)
//             })
//         })
//     })
//     return (
//         <div>
//             {renderAuthButton()}
//         </div>
//     )
// }
// const mapStateToProps =(state)=>{
//   return {isSignedIn:state.auth.isSignedIn}
// }
// export default connect(
//     mapStateToProps,
//     {signIn,signOut}
// )(GoogleAuth)
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);