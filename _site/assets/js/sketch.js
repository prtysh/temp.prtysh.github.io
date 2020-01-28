let system;
var canvas;

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-10');
    system = new ParticleSystem();

}

function draw() {
    // background(255,250,250);
    background(0);
    system.addParticle();
    system.run();
}

function mouseClicked(){
    for(i = 0; i < 5; i ++){
        system.addMouseParticle(mouseX, mouseY);
    }
}

let Particle = function(pos, r) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = pos.copy();
    this.radius = r;
    this.lifespan = 100;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.radius= this.radius - this.lifespan/100;
    this.lifespan -= 1;
};

Particle.prototype.display = function() {
    stroke(102,102,102, this.lifespan);
    strokeWeight(2);
    fill(102,102,102, this.lifespan);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
};

Particle.prototype.isDead = function(){
    return this.lifespan < 0;
};

let ParticleSystem = function() {
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(createVector(random(width), random(height)),random(10,16)));
};

ParticleSystem.prototype.addMouseParticle = function(x,y) {
    this.particles.push(new Particle(createVector(x,y), random(16,24)));
};

ParticleSystem.prototype.run = function() {
    for (let i = this.particles.length-1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};
