import "../scss/home.scss";
import Modal from "./Modal";
import Ideas from "./Ideas";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";


class Home {

    constructor() {
        this.navHandler = new Navbar();
        this.#render();
        this.modalHandler = new Modal();
        this.ideasHandler = new Ideas();
        this.loginHandler = new Login();
        this.signupHendler = new Signup();
    }

    #render() {
        document.body.innerHTML += "<h1>Random Ideas</h1>";
    }
}

const home = new Home();
