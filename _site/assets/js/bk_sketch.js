let system;
var canvas;

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-10');
    // system = new ParticleSystem(createVector(mouseX,mouseY));
    system = new ParticleSystem(createVector(random(width), random(height)));
}

function draw() {
    background(255,250,250);
    system.addParticle();
    system.run();
}

function mouseClicked() {
    for(i =0; i < 10; i ++){
        system.particles.push(new Particle(mouseX, mouseY));
    }
}

// A simple Particle class
let Particle = function(position) {
    this.acceleration = createVector(random(-0.03,0.03),random(-0.03,0.03) );
    this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    // this.position = createVector(mouseX, mouseY );
    // this.position = createVector(random(width), random(height));
    this.position = position.copy();
    this.lifespan = 100;
    this.radius = random(10,20);
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 3;
};

// Method to display
Particle.prototype.display = function() {
    stroke(102,102,102, this.lifespan);
    strokeWeight(2);
    fill(102,102,102, this.lifespan);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
    return this.lifespan < 0;
};

let ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
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

