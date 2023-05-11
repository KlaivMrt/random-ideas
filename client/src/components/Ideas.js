import "../scss/idea.scss";
import IdeasApi from "../services/ideasApi";

class Ideas {
    #data;

    constructor() {
        this.#data;
        this.#render();
        this.#loadEventListeners();
    }

    #getIdeas = async () => {
        this.#data = await IdeasApi.getIdeas();

        if(this.#data.error) {
            console.error(this.#data.error);
            return;
        }

        this.#displayIdeas();
    }

    #deleteIdea = async (event) => {
        if(event.target.classList.contains("delete-select")) {
            const response = await IdeasApi.deleteIdea(event.target.parentElement.id);
            event.target.parentElement.remove();
        }
    }

    #displayIdeas() {
        const ideasEl = document.querySelector("#ideas .container");

        this.#data.data.forEach((idea) => ideasEl.innerHTML +=  `
            <div class="idea" id="${idea._id}">
                <div class="delete-vertical"></div>
                <div class="delete-horizontal"></div>
                <div class="delete-select"></div>
                <p class="text">${idea.text}</p>
                <p class="tag">${idea.tag}</p>
                <p class="date"><span>Posted on:</span> ${idea.date.slice(0, 10)}</p>
            </div>
        `);
    }

    static displayNewIdea(idea) {
        const ideasEl = document.querySelector("#ideas .container");
        
        ideasEl.innerHTML +=  `
            <div class="idea" id="${idea._id}">
                <div class="delete-vertical"></div>
                <div class="delete-horizontal"></div>
                <div class="delete-select"></div>
                <p class="text">${idea.text}</p>
                <p class="tag">${idea.tag}</p>
                <p class="date"><span>Posted on:</span> ${idea.date.slice(0, 10)}</p>
            </div>
        `;
    }

    #render = () => {
        document.body.innerHTML += `
            <div id="ideas">
                <div class="container"></div>
            </div>
        `;

        this.#getIdeas();
    }
    
    #loadEventListeners() {
        window.addEventListener("click", this.#deleteIdea);
    }
}

export default Ideas;
