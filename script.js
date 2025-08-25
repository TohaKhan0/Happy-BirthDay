let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;
  rotating = false;

  init(paper) {
    // Handle move (mouse + touch)
    const moveHandler = (x, y) => {
      if(!this.rotating) {
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentX += this.velX;
          this.currentY += this.velY;
        }
        this.prevX = x;
        this.prevY = y;

        paper.style.transform = 
          `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    // Mouse Events
    document.addEventListener('mousemove', e => moveHandler(e.clientX, e.clientY));
    paper.addEventListener('mousedown', e => {
      if(this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = this.prevX = e.clientX;
      this.startY = this.prevY = e.clientY;
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Touch Events
    paper.addEventListener('touchmove', e => {
      e.preventDefault();
      moveHandler(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    paper.addEventListener('touchstart', e => {
      if(this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = this.prevX = e.touches[0].clientX;
      this.startY = this.prevY = e.touches[0].clientY;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
