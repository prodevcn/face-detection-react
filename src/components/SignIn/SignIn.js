import React,{Component} from 'react';import"./SignIn.css"; 

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state={emailInput:"",pswInput:""};
    }
    onEmailChange=(t=>{this.setState({emailInput:t.target.value})});
    onPasswordChange=(t=>{this.setState({pswInput:t.target.value})});
    saveAuthTokenInSessions=(e=>{window.sessionStorage.setItem("token",e)});
    onSubmitSignIn = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.emailInput,password:this.state.pswInput })
        };
        fetch('https://face-recognition-app-backend.herokuapp.com/signin',requestOptions)
        .then(response =>response.json())
        .then(data => { 
            console.log(data)
            if(data.userId && data.success === "true"){
                this.saveAuthTokenInSessions(data.token)
                fetch(`https://face-recognition-app-backend.herokuapp.com/profile/${data.userId}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data.token
                    }
                })
                .then(response => response.json())
                .then(user => {
                    if (user && user.email) {
                      this.props.loadUser(user)
                      this.props.onRouteChange('home');
                    }
                })
                .catch(console.log)
            } else {
                this.props.loadUser(data)
                this.props.onRouteChange('home');
            }
        })
        .catch(console.log)
    }
    render() {
        return (
            <div className="w-30 mw5 mw7-ns center"> <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-2 center"><main className="pa4 black-80"><div> <fieldset id="sign_up" className="ba b--transparent ph0 mh0"> <legend className="f2 fw6 ph0 mh0 center">Sign In</legend> <div className="mt3"> <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label> <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/></div><div className="mv3"><label className="db fw6 lh-copy f6" htmlFor="password">Password</label><input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange}/></div></fieldset> <div> <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/></div><div className="lh-copy mt3"><p className="f6 link dim black db pointer" onClick={()=>this.props.onRouteChange('register')}>Register</p></div></div></main> </article></div>
        );
    }
}
  
export default SignIn;