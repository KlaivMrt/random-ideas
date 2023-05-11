
class UsersApi {
    #apiUrl;

    constructor() {
        this.#apiUrl = "/api/users";
    }

    async createUser(body) {
        try {
            const url = this.#apiUrl + "/signup";

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await response.json();

            window.sessionStorage.setItem("token", data.token);
            window.sessionStorage.setItem("username", data.data.username);
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(body) {
        try {
            const url = this.#apiUrl + "/login";
               
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if(!data.success) {
                console.error(data.error);
                return;
            }

            window.sessionStorage.setItem("token", data.token);
            window.sessionStorage.setItem("username", data.data.username);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UsersApi();
