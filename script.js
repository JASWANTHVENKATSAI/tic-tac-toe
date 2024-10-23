const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.getElementById('restartButton');
let isCircleTurn = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');  // Clean both classes in one step
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });  // Add listener once
    });
    setStatusMessage(`X's Turn`);
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'o' : 'x';
    placeMark(cell, currentClass);

    // Check for a win or draw
    if (checkWin(currentClass)) {
        setStatusMessage(`${currentClass.toUpperCase()} Wins!`);
        endGame();
    } else if (isDraw()) {
        setStatusMessage('Draw!');
    } else {
        swapTurns();
        setStatusMessage(`${isCircleTurn ? "O's" : "X's"} Turn`);
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    // Check if current class has a winning combination
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    // Check if all cells are marked
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame() {
    // Remove click event from all cells to stop the game
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function setStatusMessage(message) {
    // Update status message element
    statusMessage.textContent = message;
}

// Restart game when button is clicked
restartButton.addEventListener('click', startGame);

// Start the game initially
startGame();
