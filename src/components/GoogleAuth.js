import React, { useEffect, useState } from 'react'

function GoogleAuth() {
    const [isSignedIn,setIsSignedIn] =useState(null)
    useEffect(()=>{
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'583708981065-na3r15mhh5voqfsjr2l46jqn20b7tdjf.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                const auth =window.gapi.auth2.getAuthInstance()
                  setIsSignedIn(auth.isSignedIn.get())
                  auth.isSignedIn.listen(()=>{setIsSignedIn(auth.isSignedIn.get())})
            })
        })
    })
    const onSignOut=()=>{
        const auth =window.gapi.auth2.getAuthInstance()
        auth.signOut()
    }
    const onSignIn=()=>{
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
              onClick={onSignOut}
              >
                  <i className='google icon'/>
                  Sign Out
                  </button>
          )
      }
      else{
         return (
            <button className='ui blue google button'
            onClick={onSignIn}
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

export default GoogleAuth
