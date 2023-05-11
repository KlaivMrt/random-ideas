class IdeasApi {
    #apiUrl;
    
    constructor() {
        this.#apiUrl = "/api/ideas";
    }

    async getIdeas() {
        try {
            const response = await fetch(this.#apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": window.sessionStorage.getItem("token")
                }
            })
    
            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async postIdea(idea) {
        try {
            const response = await fetch(this.#apiUrl, {
                method: "POST",
                body: JSON.stringify(idea),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": window.sessionStorage.getItem("token")
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteIdea(id) {
        try {
            const url = this.#apiUrl + `/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": window.sessionStorage.getItem("token")
                }
            })

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new IdeasApi();