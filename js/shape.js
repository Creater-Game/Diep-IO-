export class Shape {
  constructor(game) {
    this.game = game;

    const types = ["square", "triangle", "pentagon"];
    this.type = types[Math.floor(Math.random() * types.length)];

    const cfg = game.shapeData[this.type];
    this.r = cfg.radius;
    this.xp = cfg.xp;
    this.color = cfg.color;

    this.x = Math.random() * game.worldSize - game.worldSize / 2;
    this.y = Math.random() * game.worldSize - game.worldSize / 2;
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    if (this.type === "square") {
      ctx.rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    } else {
      const sides = this.type === "triangle" ? 3 : 5;
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        ctx.lineTo(this.x + Math.cos(a) * this.r, this.y + Math.sin(a) * this.r);
      }
      ctx.closePath();
    }

    ctx.fill();
  }
}
