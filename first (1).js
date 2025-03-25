let boxes = document.querySelectorAll('.box');
let msgBox = document.querySelector('.message');
let choice = false;

let winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add('winner');
    });
};

const showMessage = (message) => {
    msgBox.innerHTML = `
        <div>
            <p>${message}</p>
            <button class="restart">Restart Game</button>
        </div>
    `;
    msgBox.classList.add('active');
    document.querySelector('.restart').addEventListener('click', () => {
        resetGame();
    });
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
        box.classList.remove('winner');
    });
    choice = false;
    msgBox.classList.remove('active');
};

const isDraw = () => {
    return Array.from(boxes).every(box => box.innerText !== '');
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        if (
            boxes[pattern[0]].innerText !== "" &&
            boxes[pattern[1]].innerText !== "" &&
            boxes[pattern[2]].innerText !== ""
        ) {
            if (
                boxes[pattern[0]].innerText === 'X' &&
                boxes[pattern[1]].innerText === 'X' &&
                boxes[pattern[2]].innerText === 'X'
            ) {
                highlightWinner(pattern);
                showMessage('The winner is X!');
                boxes.forEach(box => (box.disabled = true));
                return;
            }
            if (
                boxes[pattern[0]].innerText === 'O' &&
                boxes[pattern[1]].innerText === 'O' &&
                boxes[pattern[2]].innerText === 'O'
            ) {
                highlightWinner(pattern);
                showMessage('The winner is O!');
                boxes.forEach(box => (box.disabled = true));
                return;
            }
        }
    }
    if (isDraw()) {
        showMessage("It's a draw! Restart the game?");
    }
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === '') { 
            if (choice) {
                box.innerText = 'X';
                choice = false;
            } else {
                box.innerText = 'O';
                choice = true;
            }
            box.disabled = true;
            checkwinner();
        }
    });
});
