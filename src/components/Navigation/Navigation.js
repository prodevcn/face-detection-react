import React, { Suspense } from 'react';
const ProfileIcon = React.lazy(() => import('../Profile/ProfileIcon'));


function Navigation({onRouteChange, isSignedIn, toggleModal}) {
      if(isSignedIn === true){
      return (
        <nav className="flex justify-end dt border-box "><Suspense fallback={<div>Chargement...</div>}><ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} /></Suspense></nav>
      )
      } else {
      return (
        <nav className="dt w-100 border-box pa3 ph5-ns"> <p className="pointer underline f4 lh-copy black fr link pa2" onClick={()=>onRouteChange('signin')}>Sign In</p><p className="pointer underline f4 lh-copy black fr link pa2" onClick={()=>onRouteChange('register')}>Register</p></nav>
      )
      }
}

export default Navigation;