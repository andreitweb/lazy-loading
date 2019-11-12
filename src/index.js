import './styles.scss';

class LazyImg {
    constructor(elem){
        this.elem = elem;
        this.img = this.elem.getElementsByTagName('img')[0];
        this.src = {
            origin: this.img.getAttribute('data-src'),
            min: this.img.getAttribute('data-min')
        };

        this.init = this.init.bind(this);

        this.init();
    }

    init() {
        console.log(this.elem);
    }
}

Array.prototype.forEach.call(document.getElementsByClassName('lazy-img'), (elem)=>{
    new LazyImg(elem);
});
