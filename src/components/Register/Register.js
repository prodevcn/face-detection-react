import React,{Component} from 'react';import"./Register.css"; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={name:"",email:"",password:""};
    }
    onNameChange=(e=>{this.setState({name:e.target.value})});
    onEmailChange=(a=>{this.setState({email:a.target.value})});
    onPasswordChange=(a=>{this.setState({password:a.target.value})});
    onRegister = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:this.state.name,email:this.state.email,password:this.state.password })
        };
        fetch('https://face-recognition-app-backend.herokuapp.com/register',requestOptions)
        .then(response => response.json())
        .then(user=>{
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('signin')
            }
        })
    }
    render() {
    return (
        <div className="w-30 mw5 mw7-ns center"> <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-2 center"> <main className="pa4 black-80"> <div> <fieldset id="sign_up" className="ba b--transparent ph0 mh0"> <legend className="f2 fw6 ph0 mh0 center">Register</legend> <div className="mt3"> <label className="db fw6 lh-copy f6" htmlFor="name">Name</label> <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" onChange={this.onNameChange}/> </div><div className="mt3"> <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label> <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/> </div><div className="mv3"> <label className="db fw6 lh-copy f6" htmlFor="password">Password</label> <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange}/> </div></fieldset> <div> <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegister}/> </div></div></main> </article> </div>
    );
   }
}
  
export default Register;