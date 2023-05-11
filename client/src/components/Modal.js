import Ideas from "./Ideas";
import IdeasApi from "../services/ideasApi";
import "../scss/modal.scss";

class Modal {

    constructor() {
        this.#render();
        this.#loadEventListeners();
    }

    #show(event) {
        if(event.target.id === "add-select") {
            document.getElementById("modal").style.visibility = "visible";
            document.getElementById("modal-box").classList.add("show");
        }
    }

    #hide(event) {
        if (event.target.id === "modal" || event.type === "closemodal") {
            document.getElementById("modal").style.visibility = "hidden";
            document.getElementById("modal-box").classList.remove("show");
        }
    }

    #alert() {
        document.querySelector("#modal-box label[for=text]").classList.add("alert");
        document.querySelector("#modal-box label[for=tag]").classList.add("alert");
    }

    #removeAlert() {
        document.querySelector("#modal-box label[for=text]").classList.remove("alert");
        document.querySelector("#modal-box label[for=tag]").classList.remove("alert");
    }

    #alertHandler = () => {
        this.#alert()
        setTimeout(this.#removeAlert, 3000);
    }

    #postHandler = async (event) => {
        const btn = document.querySelector("#modal-box button");

        if(event.target === btn) {
            event.preventDefault();
    
            const textEl = document.querySelector("#modal-box textarea");
            const tagEl = document.querySelector("#modal-box input");

            if(!textEl.value || !tagEl.value) {
                this.#alertHandler();
                return;
            }
    
            const newIdea = await IdeasApi.postIdea({
                text: textEl.value,
                tag: tagEl.value,
            });
    
            textEl.value = "";
            tagEl.value = "";

            if(newIdea.error) {
                console.error(newIdea.error);
                return;
            }
            
            document.dispatchEvent(new Event("closemodal"));
            Ideas.displayNewIdea(newIdea.data);
        }
    }

    #loadEventListeners = () => {        
        window.addEventListener("click", this.#hide);
        window.addEventListener("click", this.#show);
        window.addEventListener("click", this.#postHandler);
        document.addEventListener("closemodal", this.#hide);
    }

    #render() {
        const add = window.sessionStorage.getItem("token")
        ? `        
            <div id="add-horizontal"></div>
            <div id="add-vertical"></div>
            <div id="add-select"></div>
        `
        : "";
        
        document.body.innerHTML += `
            <div id="modal"></div>
            <div id="modal-box">
                <!-- <div class="group">
                    <label for="title">Title</label>
                    <input class="input" type="text" name="title">
                </div> -->
                <div class="group">
                    <label for="text">Description</label>
                    <textarea class="input" name="text" cols="30" rows="10"></textarea>
                </div>
                <div class="group">
                    <label for="tag">Tag</label>
                    <input class="input" type="text" name="tag">
                </div>
                <button>Submit</button>
            </div>

            ${add}
        `;
    }
}

export default Modal;
