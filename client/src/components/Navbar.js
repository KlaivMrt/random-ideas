import "../scss/navbar.scss";

class Navbar {
    constructor() {
        this.#render();
    }

    #render() {

        const nav = window.sessionStorage.getItem("token")
        ? `<div id="logout">Logout</div>`
        : `<div id="login">Login</div><div id="signup">Sign Up</div>`;

        const username = window.sessionStorage.getItem("username")
        ? window.sessionStorage.getItem("username")
        : "";
        
        document.body.innerHTML += `
            <div id="nav-container">
                <nav>
                    <ul>
                        <li>${username}</li>
                        <li id="user-credentials">
                        ${nav}
                        </li>
                    </ul>
                </nav>
            </div>
        `;
    }

    #loadEventListeners() {

    }
}

export default Navbar;
