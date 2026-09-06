/**
 * WEST STREET YOUTH - VINAYAKA CHAVITHI CELEBRATIONS
 * Interactive Falling Marigold Petals Canvas Animation
 */

class FestivePetals {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 35; // optimal for performance across all mobile & desktop devices
    this.isRunning = true;
    this.animationFrameId = null;

    this.colors = [
      '#FF9800', // Marigold Orange
      '#FFA726', // Warm Saffron
      '#FFD54F', // Bright Marigold Yellow
      '#FFCA28', // Golden Yellow
      '#E65100', // Deep Saffron
      '#FF7043'  // Coral Saffron
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Create initial petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -20,
      size: Math.random() * 8 + 8, // 8px to 16px
      speedY: Math.random() * 1.5 + 1,
      speedX: Math.random() * 1.2 - 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      oscillationSpeed: Math.random() * 0.03 + 0.01,
      oscillationDistance: Math.random() * 35 + 15,
      angle: Math.random() * Math.PI * 2
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.globalAlpha = p.opacity;

    // Draw realistic marigold petal droplet shape
    this.ctx.beginPath();
    this.ctx.fillStyle = p.color;
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size / 1.5, -p.size * 1.8, 0, -p.size * 2);
    this.ctx.bezierCurveTo(p.size / 1.5, -p.size * 1.8, p.size / 2, -p.size, 0, 0);
    this.ctx.fill();

    // Central vein detail
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -p.size * 1.6);
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.angle += p.oscillationSpeed;
      p.x += p.speedX + Math.sin(p.angle) * 0.8;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Wrap around or recreate when out of screen
      if (p.y > this.canvas.height + 20 || p.x < -30 || p.x > this.canvas.width + 30) {
        this.petals[i] = this.createPetal(false);
      }
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.petals.length; i++) {
      this.drawPetal(this.petals[i]);
    }

    this.update();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  toggle() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.animate();
    } else {
      cancelAnimationFrame(this.animationFrameId);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return this.isRunning;
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.festivePetals = new FestivePetals('petals-canvas');
});
