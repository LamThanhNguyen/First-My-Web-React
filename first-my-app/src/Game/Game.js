import React from 'react';
import Board from '../Board/Board';
import './Game.css';

class Game extends React.Component {
    // constructor of class Game
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(26*26).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            isPvP: true
        };
    }

    // function handleClick of class Game
    handleClick(i) {
        // slice from [0 => stepNumber + 1)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // current = last index in history
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // Had winner game or click mouse outside grid squares
        // Cannot click mouse.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // squares[i] = "X" or "O"
        squares[i] = this.state.xIsNext ? "X" : "O";

        // re-render component update history, stepNumber, xIsNext
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} className="bttn-slant bttn-lg bttn-primary">{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = <span style={{fontSize:'24px', lineHeight: '34px'}}>{"Winner: "}<span style={{color: winner==='X'?'red':'blue', fontWeight: 'bold'}}>{winner}</span></span>;
        } else {
            status = <span style={{fontSize:'24px', lineHeight: '34px'}}>{"Next player: "}<span style={{color: this.state.xIsNext? 'red':'blue', fontWeight: 'bold'}}>{this.state.xIsNext ? "X" : "O"}</span></span>;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [];

    // squares is one dimension array contains 676 squares. 
    for (let i = 0; i < squares.length/26; i++) {
        // lines.push: Từ index 0, 26, 26* đến 0+26, 26+26, 26*+26
        // Each line in lines contains 26 squares corresponding to each row.
        lines.push(squares.slice(i*26, i*26+26));
    }

    for (let i=0; i<26;i++) {
        for (let j=0; j<26; j++) {
            if (lines[i][j] != null) {
                let r = 25;
                let u = 25;
                let ru = Math.min(25-i, 25-j, 5);
                let ul = Math.min(i, 25-j, 5);
                console.log("ru: ", ru)
                console.log("ul: ", ul)
                
                let kt = 0;
                for (let k = i; k <= r; k++) {
                    if (lines[k][j] === lines[i][j]) {
                        kt++;
                    } else {
                        break;
                    }
                }
                // Vertical Line.
                if (kt === 5) {
                    return lines[i][j]
                }

                kt = 0;
                for (let k = j; k <= u; k++) {
                    if (lines[i][k] === lines[i][j]) {
                        kt++;
                    } else {
                        break;
                    }
                }
                // Horizontal Line.
                if (kt===5) {
                    return lines[i][j];
                }

                kt = 0;
                for (let k = 0; k <= ru; k++) {
                    if (lines[i+k][j+k] === lines[i][j]) {
                        kt++;
                    } else {
                        break;
                    }
                }
                // diagonal left to right.
                if (kt === 5) {
                    return lines[i][j];
                }

                kt = 0;
                for (let k = 0; k <= ul; k++) {
                    if (lines[i-k][j+k] === lines[i][j]) {
                        kt++;
                    } else {
                        break;
                    }
                }
                // diagonal right to left.
                if (kt === 5) {
                    return lines[i][j];
                }
            }
        }
    }
    return null;
}

export default Game;