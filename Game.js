
var player;
var projectiles = []; // Lleva la pista de los cuadrados en la pantalla

var difficulty; // Dificultad de los cuadrados

function setup() {

  createCanvas(600, 400);

	difficulty = 2;

	/* Inicializa al Juagdor */
  player = new Square(width / 2, height / 2,
		30, color("#FFFFFF"), null, difficulty * 0.8);

	textAlign(CENTER);
  textSize(40);
}

function draw() {

  background(51);

  handleProjectiles();
	handlePlayer();
	handleKeys();

	attemptNewProjectile(frameCount);

  drawScore();
}

/**
 * Intenta empujar un nuevo proyectil la array de proyectiles
 **/
function attemptNewProjectile(frame) {

	if (frame % 30 === 0) {
		// Cada 0.5 segundos

    if (random(difficulty) > 1.25) {
			// Baasdo en la dificultad

			projectiles.push(generateSquare());
		}

		// Incerta más dificultad
    difficulty += 0.05;
  }
}

/**
 * Maneja los metoddos dentrada del jugador
 **/
function handleKeys() {

	// El jugador es 80% mas lento que los cuadrados
	var speed = difficulty * 0.8;

  if (keyIsDown(UP_ARROW))
    player.move(0, -speed);

	if (keyIsDown(DOWN_ARROW))
    player.move(0, speed);

  if (keyIsDown(LEFT_ARROW))
    player.move(-speed, 0);

  if (keyIsDown(RIGHT_ARROW))
    player.move(speed, 0);

}

/**
 * Dibuja el puntaje del jugador
 **/
function drawScore() {

	noStroke();
  text(frameCount, width / 2, 60);
}

/**
 * Actualiza, Dibuja, comprueba la colicion con los cuadrados
 * Maneja el array de proyectiles
 **/
function handleProjectiles() {

	for (var i = projectiles.length - 1; i >= 0; i--) {

		/* Actualiza y Dibuja */
    projectiles[i].update(false); // false = not-the-player
    projectiles[i].draw();

    if (projectiles[i].collidesWith(player))
			// Comprueba el fin del juego
      endGame();

    if (projectiles[i].isOffscreen())
			// Elimina el arreglo
      projectiles.splice(i, 1);

  }
}

/**
 * Actualiza, dibuja y construye al jugador
 **/
function handlePlayer() {

	/* Actualiza y Dibuja */
	player.update(true);
  player.draw();

	/* Construye al jugador */
  if (player.isOffscreen()) {
    endGame();
  }
}

/**
 * Detiene el ciclo y dibuja el mensaje de fin del juego
 */
function endGame() {

  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

/**
 * Retorna la generacion aleatoria de cuadrados
 **/
function generateSquare() {

  /* Crear el Cuadrado */
  var plane = (random() > 0.5);
	// true = randomize x-axis & keep y-axis constant
	// false = randomize y-axis & keep x-axis constant

	/* solo permite que los cuadrados se reproduzcan en los bordes */
  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

  return new Square(x, y, random(35), randomColor(), player.position, difficulty);
}

/**
 * Genera un color aleatorio
 **/
function randomColor() {
  return color(random(255), random(255), random(255));
}
