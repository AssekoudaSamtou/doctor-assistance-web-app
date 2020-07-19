import React from 'react';
import Cookies from 'universal-cookie';

import AuthService from "../../../services/auth.service";

import signup from "../../../data/icons/signup.png"
import FormBoxItem from '../../card/FormBoxItem';
import { Link } from 'react-router-dom';

const cookies = new Cookies();

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "dsd",
            password: "",
            redirect: null
        };
        this.register = this.register.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    register() {
        var data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };console.log(data);
    
        AuthService.login(data)
            .then(response => {
                this.setState({ username: "" });
                this.setState({ email: "" });
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
        window.$("body").addClass("login_page");
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
                            <div id="login" className="login loginpage col-lg-offset-2 col-md-offset-3 col-sm-offset-3 col-xs-offset-0 col-xs-12 col-sm-6 col-lg-8" style={{marginTop: '-8.5px'}}>    
                                <div className="login-form-header">
                                    <img src={signup} alt="login-icon" style={{maxWidth:'64px'}}/>
                                    <div className="login-header">
                                        <h4 className="bold color-white">Signup Now!</h4>
                                        <h4><small>Please enter your data to register.</small></h4>
                                    </div>
                                </div>
                            
                                <div className="box login">

                                    <div className="content-body" style={{paddingTop:'30px'}}>

                                        <form id="msg_validate" action="#" noValidate="novalidate" className="no-mb no-mt">
                                            <div className="row">
                                                <div className="col-xs-12">

                                                    <div class="col-lg-6 no-pl">
                                                        <FormBoxItem 
                                                            type="text"
                                                            label="Username"
                                                            onInputChange={this.handleInputChange}
                                                            name="username"
                                                            value={this.state.username}/>
                                                    </div>

                                                    <div class="col-lg-6 no-pl">
                                                        <FormBoxItem 
                                                            type="email"
                                                            label="Email"
                                                            onInputChange={this.handleInputChange}
                                                            name="email"
                                                            value={this.state.email}/>
                                                    </div>

                                                    <div class="col-lg-6 no-pl">
                                                        <FormBoxItem 
                                                            type="password"
                                                            label="Password" 
                                                            onInputChange={this.handleInputChange}
                                                            name="password"
                                                            value={this.state.password}/>
                                                    </div>

                                                    <div class="col-lg-6 no-pl">
                                                        <FormBoxItem 
                                                            type="password"
                                                            label="REPEAT Password" 
                                                            onInputChange={this.handleInputChange}
                                                            name="repeat_password"
                                                            value={this.state.password}/>
                                                    </div>

                                                    <div className="pull-left">
                                                        <a onClick={this.register} className="btn btn-primary mt-10 btn-corner right-15">Sign up</a>
                                                        <a  className="btn mt-10 btn-corner signup">Log in</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <p id="nav">
                                    <Link to="#" className="pull-left" title="Password Lost and Found" >Forgot password?</Link>
                                    <Link to="/login" className="pull-right" title="Sign In" >Login</Link>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
} 

export default Login;