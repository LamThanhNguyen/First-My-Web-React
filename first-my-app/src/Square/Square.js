import "./Square.css"

function Square(props) {
    return (
        <button style={{color:props.value==='X'?'red':'blue'}} className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square;