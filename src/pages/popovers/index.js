import Popover from "../../components/popovers";

export default class Page {
    subElements = {};
    components = {};


    constructor() {
    }


    render() {

        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements();
        this.initComponents();

        return this.element;
    }


    initComponents() {
        const popover = new Popover()
        popover.initialize();
    }


    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]')
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        return this.subElements;
    }


    remove() {
        if (this.element) {
            this.element.remove()
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;


        for (const component of Object.values(this.components)) {
            component.destroy();
        }
    }


    getTemplate() {
        return `
        <div data-element="content">
        <button class="button button_primary popover__button" 
        data-popover="Popover title; And heres some amaizing content. Its very engaging. Right?">
        Click to toggle popover
     </button>
    </div>
        `
    }
}