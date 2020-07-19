import React from 'react';
import Cookies from 'universal-cookie';

import AuthService from "../../../services/auth.service";

import padlock from "../../../data/icons/padlock.png"
import FormBoxItem from '../../card/FormBoxItem';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: null
        };
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    login() {
        var data = {
            username: this.state.username,
            password: this.state.password,
        };console.log(data);
    
        AuthService.login(data)
            .then(response => {
                this.setState({ username: "" });
                this.setState({ password: "" });
                cookies.set('token', response.data.token, { path: '/' });
                window.location.href =  "dashboard";
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        var body = document.getElementsByTagName("body")[0];
        body.className = body.className + "login_page";
        this.props.onLoginPageLoaded();
    }

    componentWillUnmount() {
        window.$("body").removeClass("login_page");
    }

    render() {
        return (
                <div>
                    <div className="container-fluid">
                        <div className="login-wrapper row">
                            <div id="login" className="login loginpage col-lg-offset-4 col-md-offset-3 col-sm-offset-3 col-xs-offset-0 col-xs-12 col-sm-6 col-lg-4" style={{marginTop: '-8.5px'}}>    
                                <div className="login-form-header">
                                    <img src={padlock} alt="login-icon" style={{maxWidth:'64px'}}/>
                                    <div className="login-header">
                                        <h4 className="bold color-white">Login Now!</h4>
                                        <h4><small>Please enter your credentials to login.</small></h4>
                                    </div>
                                </div>
                            
                                <div className="box login">

                                    <div className="content-body" style={{paddingTop:'30px'}}>

                                        <form id="msg_validate" action="#" noValidate="novalidate" className="no-mb no-mt">
                                            <div className="row">
                                                <div className="col-xs-12">

                                                    <FormBoxItem 
                                                        type="text"
                                                        label="Username"
                                                        onInputChange={this.handleInputChange}
                                                        name="username"
                                                        value={this.state.username}/>
                                                    
                                                    <FormBoxItem 
                                                        type="password"
                                                        label="Password" 
                                                        onInputChange={this.handleInputChange}
                                                        name="password"
                                                        value={this.state.password}/>

                                                    <div className="pull-left">
                                                        <a onClick={this.login} className="btn btn-primary mt-10 btn-corner right-15">Log in</a>
                                                        <a className="btn mt-10 btn-corner signup">Sign up</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <p id="nav">
                                    <Link to="#" className="pull-left" title="Password Lost and Found" >Forgot password?</Link>
                                    <Link to="/signup" className="pull-right" title="Sign In" >Sign Up</Link>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
} 

export default Login;