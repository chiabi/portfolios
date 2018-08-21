import './style.scss';

class CreateTypo {
  typos: Array<string>;
  wrap: HTMLElement;
  constructor(typos: Array<string>, wrap: HTMLElement) {
    this.typos = typos;
    this.wrap = wrap;
  }

  setSize() {
    const width: number = this.wrap.offsetWidth;
    const height: number = this.wrap.offsetHeight;
    const size: number = Math.min(width, height) / 6;
    this.wrap.style.fontSize = `${size}px`;
  }
  
  draw() {
    const typoWrap: HTMLElement = document.createElement('div');
    for (let typo of this.typos) {
      const typoDiv: HTMLElement = document.createElement('div');
      typoDiv.classList.add('typo');
      for (let i = 0; i < 3; i++) {
        const typoItemDiv: HTMLElement = document.createElement('div');
        typoItemDiv.classList.add('typo_item');
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
