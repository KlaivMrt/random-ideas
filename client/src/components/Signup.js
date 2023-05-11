import "../scss/signup.scss";
import UsersApi from "../services/usersApi";

class Signup {
    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #show(event) {
        if(event.target.id === "signup") {
            document.getElementById("modal").style.visibility = "visible";
            document.getElementById("signup-box").classList.add("show");
        }
    }

    #hide(event) {
        if(event.target.id === "modal") {
            document.getElementById("signup-box").classList.remove("show");

            document.querySelector("form .group #signup-username").value = "";
            document.querySelector("form .group #signup-password").value = "";
            document.querySelector("form .group #signup-email").value = "";
        }
    }

    
    async #signup(event) {
        if(event.target.id === "submit-btn") {
            event.preventDefault();
            const username = document.querySelector("form .group #signup-username").value;
            const password = document.querySelector("form .group #signup-password").value;
            const email = document.querySelector("form .group #signup-email").value;
            const valEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if(!username || !password || !email) {
                alert("Please, fill in all recomended fields");
                return;
            }
            
            if(!valEmail.test(email)) {
                alert("Type a valid email");
                return;
            }
            
           await UsersApi.createUser({username, password, email});
            window.location.href = "/";
        }
    }

    #render() {
        document.body.innerHTML += `
            <div id="signup-box">
            <form>
                <div class="group">
                    <label for="username">Username</label>
                    <input id='signup-username' type="text" name="username">
                </div>

                <div class="group">
                    <label for="email">Email</label>
                    <input id='signup-email' type="email" name="email">
                </div>

                <div class="group">
                    <label for="password">Password</label>
                    <input id='signup-password' type="password" name="password">
                </div>

                <button id='submit-btn' class="btn">Submit</button>
            </form>
            </div>
        `;
    }

    #loadEventListeners = () => {
        window.addEventListener("click", this.#show);
        window.addEventListener("click", this.#hide);
        window.addEventListener("click", this.#signup);
    }
}

export default Signup;
