//tablero
const gameBoard = (function(){
    const rows= 3;
    const columns = 3;
    const board = [];

    //crear tablero vacío 3x3
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] ="-";
        }
    }

    //obtener tablero
    function getBoard(){
        return board;
    }

    //imprimir tablero (al ser navegador web y usar consolelog con getBoard,
    //se estara guardando una referencia y acabara impriminedo la version final
    //por eso hay q hacer una copia)
    function printBoard() {
        const boardCopy = gameBoard.getBoard().map(row => [...row]);
        console.log(boardCopy);
    }
    

    //colocar token en tablero
    function placeToken(row,col,token){
        if (board[row][col] === "-") {
            board[row][col] = token;
            return true;
        }
        return false;
    };

    return {getBoard, placeToken, printBoard}
})();

//jugadores, guardan token (O ó X)
function createPlayer(token){
    return{token};
}


//controlador, cambia de turno y juega las rondas segun la posicion
const gameController = (function(){
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");
    let currentPlayer = player1;

    function getPlayerInput() {
        const row = prompt(`Jugador ${currentPlayer.token}, ingresa la fila (0, 1, 2):`);
        const col = prompt(`Jugador ${currentPlayer.token}, ingresa la columna (0, 1, 2):`);
        return { row: parseInt(row), col: parseInt(col) }; // Devolver un objeto con las coordenadas
    }

    //cambio de turno, sería función privada usada solo por playRound
    function switchTurns(){
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };


    //si el turno ha sido valido se vuelve a mostrar el tablero actualizado
    function playRound(){
        const { row, col } = getPlayerInput();

        if(gameBoard.placeToken(row,col,currentPlayer.token)){
            console.log(`Jugador ${currentPlayer.token} juega en (${row}, ${col})`);
            //console.log(gameBoard.getBoard());
            gameBoard.printBoard();
            switchTurns();
        }else{
            console.log("Casilla ocupada. Intenta otra vez");
        }
        
    };

    function getCurrentPlayer(){
        return currentPlayer;
    }

    return{ playRound, getCurrentPlayer};


})();


//SI EL JUEGO NECESITASE INPUTS: (al hacerlo con UI los gestionamos diferente)
// Este es un ejemplo de cómo podrías organizar un ciclo simple para manejar los turnos.
/*function startGame() {
    let gameActive = true; // Este es un estado que puede cambiar cuando se detecte un ganador.

    while(gameActive) {
        gameController.playRound();  // Se juega un turno
        // Aquí puedes agregar condiciones para verificar si el juego ha terminado (por ejemplo, verificar si hay un ganador).
        // Si el juego ha terminado, cambia gameActive a false para finalizar el bucle.
    }
}
*/
//startGame();

