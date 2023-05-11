import "../scss/login.scss";
import UsersApi from "../services/usersApi";

class Login {

    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #show(event) {
        if(event.target.id === "login") {
            document.getElementById("modal").style.visibility = "visible";
            document.getElementById("login-box").classList.add("show");
        }
    }

    #hide(event) {
        if(event.target.id === "modal") {
            document.getElementById("login-box").classList.remove("show");

            document.querySelector("form .group #login-email").value = "";
            document.querySelector("form .group #login-password").value = "";
        }
    }

    async #login(event) {
        if(event.target.id === "login-btn") {
            event.preventDefault();
            const email = document.querySelector("form .group #login-email").value;
            const password = document.querySelector("form .group #login-password").value;

            await UsersApi.getUser({email, password});
            window.location.href = "/";
        }
    }
    
    async #logout(event) {
        if (event.target.id === "logout") {
            window.sessionStorage.clear();
            window.location.href = "/";
        }
    }

    #render() {
        document.body.innerHTML += `
            <div id="login-box">
                <form>
                    <div class="group">
                        <label for="email">Email</label>
                        <input id='login-email' type="text" name="email">
                    </div>
        
                    <div class="group">
                        <label for="password">Password</label>
                        <input id='login-password' type="password" name="password">
                    </div>
        
                    <button id='login-btn' class="btn">Submit</button>
                </form>
            </div>
        `;
    }

    #loadEventListeners = () => {
        window.addEventListener("click", this.#show);
        window.addEventListener("click", this.#hide);
        window.addEventListener("click", this.#login);
        window.addEventListener("click", this.#logout);
    }
}

export default Login;