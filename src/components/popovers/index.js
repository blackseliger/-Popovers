export default class Popover {
    static instance;
    static activePopover;
    static activeTarget;
    element;

    onClick = event => {
        const element = event.target.closest('[data-popover]');

        console.log(element);

        if ((Popover.activePopover && Popover.activeTarget.isEqualNode(element)) || (Popover.activePopover && !element)) {
            Popover.activePopover.remove()
            Popover.activePopover = null;
            return;
        }


        if (element) {
            this.render(element.dataset.popover);
            this.positionPopover(element);

            Popover.activeTarget = element;
            // document.addEventListener('pointermove', this.onPointerMove);
        }
    };

    onPointerMove = event => {
        this.moveTooltip(event);
    };

    onPointerOut = () => {
        this.remove();
        document.removeEventListener('pointermove', this.onPointerMove);
    };

    constructor() {
        if (Popover.instance) {
            return Popover.instance;
        }

        Popover.instance = this;
    }

    initialize() {
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('click', this.onClick);
    }

    render(html) {
        const dataArr = html.split(';')

        this.element = document.createElement('div');
        this.element.className = 'popover';
        this.element.innerHTML = `<div class="tooltip__title">${dataArr[0]}</div>
        <div class="tooltip__content">${dataArr[1]}</div>`;
        document.body.append(this.element);

        Popover.activePopover = this;
    }

    positionPopover(target) {
        const coords = target.getBoundingClientRect();
        const left = coords.left + window.scrollX + coords.width / 2;
        const top = coords.top - this.element.offsetHeight - 7;

        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        document.removeEventListener('click', this.onClick);
        this.remove();
        this.element = null;
    }
}



