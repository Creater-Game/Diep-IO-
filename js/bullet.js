export class Bullet {
  constructor(player, angle) {
    this.x = player.x;
    this.y = player.y;
    this.vx = Math.cos(angle) * 800;
    this.vy = Math.sin(angle) * 800;
    this.r = 5;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
