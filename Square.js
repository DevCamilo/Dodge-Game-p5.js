function Square(x, y, size, color, player, speed) {

  this.position = createVector(x, y);

	this.speed = speed;

  this.velocity = this.setVelocity(this.position, player);

  this.size = size; // Tamaño
  this.color = color;
}

/**
 * Cambia la velocidad basado en la velocidad
 * Agrega friccion si el especifico es verdadero
 */
Square.prototype.update = function(specific) {

  this.position.add(this.velocity);

  if (specific) {
		// Solo el jugador tiene friccion
    this.velocity.x *= 0.5;
    this.velocity.y *= 0.5;
  }
};

/**
 * Dibuja el cuadrado en la pantalla
 **/
Square.prototype.draw = function() {

  fill(this.color);
  stroke(255);
  strokeWeight(3);

  rect(this.position.x, this.position.y, this.size, this.size);
};

/**
 * actualiza si el cuadrado está fuera de la pantalla o no
 **/
Square.prototype.isOffscreen = function() {

  return (this.position.x < 0 || this.position.x + this.size > width ||
      this.position.y < 0 || this.position.y + this.size > height);
}

/**
 * Retorna si este cuadrado colisiona con el cuadrado anterior
 */
Square.prototype.collidesWith = function(square) {

	/* Calcula la ubicacion del cuadrado */
  var cX = this.position.x + this.size / 2;
  var cY = this.position.y + this.size / 2;
	var center = createVector(cX, cY); // Centra al cuadrado

	/* Calcula la ubicacion pasada del cuadrado */
	var rX = square.position.x + square.size;
	var rY = square.position.y + square.size;
	var rightBound = createVector(rX, rY); // Limita el lado derecho del cuadrado

  return !(center.x < square.position.x || center.x > rightBound.x ||
      center.y < square.position.y || center.y > rightBound.y);
};

/**
 * Agrga la aceleracion pasada a la velocidad
 **/
Square.prototype.move = function(xAcceleration, yAcceleration) {

  this.velocity.add(createVector(xAcceleration, yAcceleration));
};

/**
 * Debuelve un vetor que apunta del vel1 al vel2
 **/
Square.prototype.setVelocity = function(vel1, vel2) {

	if (vel1 != null && vel2 != null) {
		// Ambos vectores existen

		// Punto vel1 hacia punto vel2
		var velocity = createVector(vel2.x - vel1.x, vel2.y - vel1.y);
		velocity.setMag(this.speed); // Limita la velocidad

		return velocity;
	}

	return createVector(1, 0);
}
