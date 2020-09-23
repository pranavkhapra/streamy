import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions/index'
function GoogleAuth() {
    const [isSignedIn,setIsSignedIn] =useState(null)
    useEffect(()=>{
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'583708981065-na3r15mhh5voqfsjr2l46jqn20b7tdjf.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                const auth =window.gapi.auth2.getAuthInstance()
                //   onAuthChange(auth.isSignedIn.get())
                  setIsSignedIn(auth.isSignedIn.get())
                  auth.isSignedIn.listen(onAuthChange)
            })
        })
    })
    const onAuthChange=()=>{
        const auth =window.gapi.auth2.getAuthInstance()
        setIsSignedIn(auth.isSignedIn.get())
    // if(isSignedIn){
    //     signIn()
    // }
    // else{
    //     signOut()
    // }
    }
    const onSignOutClick=()=>{
        const auth =window.gapi.auth2.getAuthInstance()
        auth.signOut()
    }
    const onSignInClick=()=>{
        const auth =window.gapi.auth2.getAuthInstance()
         auth.signIn()
    }
    const renderAuthButton =()=>{
      if(isSignedIn===null){
          return null
      }
      else if(isSignedIn){
          return (
              <button className='ui red google button'
              onClick={onSignOutClick}
              >
                  <i className='google icon'/>
                  Sign Out
                  </button>
          )
      }
      else{
         return (
            <button className='ui blue google button'
            onClick={onSignInClick}
           >
            <i className='google icon'/>
            Sign In with Google
            </button>
         )
      }
    }
    return (
        <div>
            {renderAuthButton()}
        </div>
    )
}
const mapStateToProps =(state)=>{
  return {isSignedIn:state.auth.isSignedIn}
}
export default connect(
    mapStateToProps,
    {signIn,signOut}
)(GoogleAuth)
