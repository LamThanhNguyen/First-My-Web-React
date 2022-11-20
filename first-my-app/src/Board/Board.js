import React from 'react';
import Square from '../Square/Square';
import './Board.css';

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let content = this.props.squares.map((value, index) => {
            return <Square
                value={value}
                onClick={() => this.props.onClick(index)}
                key={index.toString()}
            />
        })
        // 0 --> 675
        // If i = 27*n
        // content[i] = <div key=i>{content[i]}</div>
        // Else: content[i] = content[i]
        // <div>content[i]</div> = break line and new row.
        for (let i=0; i<content.length; i++) {
            if (i%27 === 0) {
                console.log("i: ", i)
                content[i] = <div key={i.toString()}>{content[i]}</div>
            }
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Board;