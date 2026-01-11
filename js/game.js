import { Player } from "./player.js";
import { Camera } from "./camera.js";
import { Shape } from "./shape.js";
import { loadJSON } from "./util.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.worldSize = 9000;
    this.player = new Player(this);
    this.camera = new Camera(this.player);

    this.shapes = [];
    this.lastTime = 0;
  }

  async start() {
    this.shapeData = await loadJSON("data/shapes.json");

    for (let i = 0; i < 200; i++) {
      this.spawnShape();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  spawnShape() {
    this.shapes.push(new Shape(this));
  }

  loop(t) {
    const dt = (t - this.lastTime) / 1000;
    this.lastTime = t;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    this.player.update(dt);
    this.shapes.forEach(s => s.update(dt));
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.camera.apply(ctx);

    this.drawGrid(ctx);

    this.shapes.forEach(s => s.draw(ctx));
    this.player.draw(ctx);

    ctx.restore();
  }

  drawGrid(ctx) {
    const size = 50;
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    for (let x = -this.worldSize; x < this.worldSize; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, -this.worldSize);
      ctx.lineTo(x, this.worldSize);
      ctx.stroke();
    }
    for (let y = -this.worldSize; y < this.worldSize; y += size) {
      ctx.beginPath();
      ctx.moveTo(-this.worldSize, y);
      ctx.lineTo(this.worldSize, y);
      ctx.stroke();
    }
  }
}
