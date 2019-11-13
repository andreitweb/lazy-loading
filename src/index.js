import './styles.scss';

class LazyImg {
    constructor(elem){
        this.elem = elem;
        this.elemHeight = this.elem.offsetHeight;
        this.elemWidth = this.elem.offsetWidth;
        this.img = this.elem.getElementsByTagName('img')[0];
        this.src = {
            origin: this.img.getAttribute('data-src'),
            min: this.img.getAttribute('data-min')
        };
        this.canvas = this.elem.getElementsByTagName('canvas')[0];
        this.canvas.height = this.elemHeight;
        this.canvas.width = this.elemWidth;
        this.canvasCtx = this.canvas.getContext('2d');

        this.init = this.init.bind(this);
        this._preload = this._preload.bind(this);
        this._loadOrigin = this._loadOrigin.bind(this);

        this.init();
    }

    init() {
        this._preload();
        this._loadOrigin();
    }

    _preload() {
        let img = new Image();
        img.onload = () => {
            this.canvasCtx.filter = 'blur(3px)';
            this.canvasCtx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = this.src.min;
    }
    _loadOrigin() {
        let img = new Image();
        img.onload = () => {
            setTimeout(()=>{
                this.img.src = this.src.origin;
                this.canvas.style.display = 'none';
                this.img.removeAttribute('data-src');
                this.img.removeAttribute('data-min');
            }, 1500);
        };
        img.src = this.src.origin;
    }
}

Array.prototype.forEach.call(document.getElementsByClassName('lazy-img'), (elem)=>{
    new LazyImg(elem);
});
