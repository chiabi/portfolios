import './style.scss';

class CreateTypo {
  typos: Array<string>;
  wrap: HTMLElement;
  constructor(typos: Array<string>, wrap: HTMLElement) {
    this.typos = typos;
    this.wrap = wrap;
  }

  getSize() {
    const width: number = this.wrap.offsetWidth;
    const height: number = this.wrap.offsetHeight;
    return {width, height}
  }

  setSize() {
    const {width, height} = this.getSize();
    const size: number = Math.min(width, height) / (typos.length + 1);
    this.wrap.style.fontSize = `${size}px`;
  }

  calculateMousePosition (evt: MouseEvent) {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;
    return {mouseX, mouseY}
  }

  positionAnimation (evt: MouseEvent, befores: NodeList, afters: NodeList) {
    const {width, height} = this.getSize();
    const {mouseX, mouseY} = this.calculateMousePosition(evt);
    const moveX = width - mouseX - 70;
    const moveY = height - mouseY - 70;
    console.log(moveX, moveY)
    befores.forEach((item: HTMLElement) => {
      item.style.transform = `translate(-${moveX}px, -${moveY}px)`
    })
    afters.forEach((item: HTMLElement) => {
      item.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
    
  }
  
  draw() {
    const typoWrap: HTMLElement = document.createElement('div');
    for (let typo of this.typos) {
      const typoDiv: HTMLElement = document.createElement('div');
      typoDiv.classList.add('typo');
      for (let i = 0; i < 3; i++) {
        const typoItemDiv: HTMLElement = document.createElement('div');
        typoItemDiv.classList.add('typo_item');
        typoItemDiv.classList.add(`typo_item--${i + 1}`);
        typoItemDiv.textContent = typo;
        typoDiv.appendChild(typoItemDiv);
      }
      typoWrap.appendChild(typoDiv);
    }
    this.wrap.appendChild(typoWrap);
    this.setSize();
  }
}

const typos: Array<string> = [`HELLO,`, `I am`, `박치혜,`, `Front-end`, `Developer`];
const typoMain: HTMLElement = document.querySelector('.main');
const typoAnimation = new CreateTypo(typos, typoMain);
typoAnimation.draw();

// throttler & resize
let resizeTimeout: number | null;
function resizeThrottler() {
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      actualResizeHandler();
      }, 66);
  }
}

function actualResizeHandler() {
  typoAnimation.setSize()
}

window.addEventListener('resize', resizeThrottler, false);

const enterButton = document.querySelector('.btn_enter');
enterButton.addEventListener('mouseenter', e => {
  typoMain.classList.add('is-stop')
});
enterButton.addEventListener('mouseleave', e => {
  typoMain.classList.remove('is-stop')
});
enterButton.addEventListener('touchstart', e => {
  typoMain.classList.add('is-stop')
});
enterButton.addEventListener('touchend', e => {
  typoMain.classList.remove('is-stop')
});
// const befores: NodeList = document.querySelectorAll('.typo_item--1')
// const afters: NodeList = document.querySelectorAll('.typo_item--3')
// document.addEventListener('mouseover', e => {
//   typoAnimation.positionAnimation(e, befores, afters);
// });
