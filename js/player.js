import { Bullet } from "./bullet.js";
import { getMouse, getKeys } from "./input.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.r = 20;

    this.speed = 300;
    this.vx = 0;
    this.vy = 0;

    this.xp = 0;
    this.level = 1;

    this.bullets = [];
    this.fireCooldown = 0;
  }

  update(dt) {
    const keys = getKeys();

    if (keys.w) this.vy -= this.speed * dt;
    if (keys.s) this.vy += this.speed * dt;
    if (keys.a) this.vx -= this.speed * dt;
    if (keys.d) this.vx += this.speed * dt;

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.vx *= 0.9;
    this.vy *= 0.9;

    this.fireCooldown -= dt;
    const mouse = getMouse();

    if (mouse.down && this.fireCooldown <= 0) {
      this.bullets.push(new Bullet(this, mouse.angle));
      this.fireCooldown = 0.15;
    }

    this.bullets.forEach(b => b.update(dt));
  }

  draw(ctx) {
    ctx.fillStyle = "#4aa3ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();

    this.bullets.forEach(b => b.draw(ctx));
  }
}
