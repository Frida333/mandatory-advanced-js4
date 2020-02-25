import React, {useReducer} from 'react';
import './App.css';
import Grid from './Grid';

function initState() {
  const board = new Array(7*6).fill('#E4D9CE');
  return {color: '#AB604C', board, winner: null, tie: false};
}

function reducer(state, action){
  switch (action.type){
    case 'takeTurn':
      if(state.winner){
        return state;
      }
      let  _board = [...state.board];
      if(_board[action.index] !== "#E4D9CE"){
        return state;
      }
      const index = column(action.index, _board);
      _board[index] = state.color;
      return {
        ...state,
        board: _board,
        color: state.color === '#AB604C' ? '#EAB939' : '#AB604C',
        winner: checkWinner(_board, state.color),
        tie: checkTie(_board),
      };
    case "clearPlay":
      return initState();
    default:
      return state;
    }
  }

function column(i, _board){
  const column = i % 7;
  let index = 5 * 7 + column;
  while (index >= 0) {
    if (_board[index] === "#E4D9CE") {
      break;
    }
    index -= 7;
  }
  return index;
}

function checkVertical( _board, color){
  for (let i = 0; i <= 20; i++){
    if (_board[i] === color && _board[i + 7] === color && _board[i + 14] === color && _board[i + 21] === color){
      return color;
    }
  }
  return null;
}

function checkHorizontal(_board, color){
  for (let j = 0; j <= _board.length; j+=7){
    for(let i = j; i <= j +3; i++){
      if (_board[i] === color && _board[i +1] === color && _board[i +2] === color && _board[i +3] === color){
        return color;
      }
    }
  }
  return null;
}

function checkDiagonalLeft(_board, color){
  for (let j = 0; j <=18; j+=7){
    for(let i =j; i<=j+3; i++){
      if(_board[i] === color && _board[i+8] === color && _board[i+16] === color && _board[i+24] === color){
        return color;
      }
    }
  }
  return null;
}

function checkDiagonalRight(_board,color){
  for (let j = 3; j <=21; j+=7){
    for (let i =j; i<=j+3; i++){
      if(_board[i] === color && _board[i+6] === color && _board[i+12] === color && _board[i+18] === color){
        return color;
      }
    }
  }
  return null;
}

function checkWinner(_board, color){
  if(checkVertical(_board, color)|| checkHorizontal(_board, color) || checkDiagonalLeft(_board,color) || checkDiagonalRight(_board,color)){
    return color;
  }
  return null;
}

function checkTie(_board){
  let white = "#E4D9CE";
    return !_board.includes(white);
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, initState);
  let p;
    if (state.winner){
      if(state.winner === "#AB604C"){
        p = <p>The winner is Red</p>
      }
      else if(state.winner === "#EAB939"){
        p = <p>The winner is Yellow</p>
      }
    }
    let p2;
    if(state.tie){
      p2 = <p>It is a draw</p>
    }

  return (
    <div>
      <div className="message">
        {p}
        {p2}
      </div>
      <h1>Connect 4</h1>
      <Grid board = {state.board} onClickCell={ i=> dispatch ({type: 'takeTurn', index: i})} />
      <button style={{
        border:"none",
        backgroundColor: "#0C3535",
        color: "#E4D9CE",
        outline: "none",
        cursor:"pointer",
        width: "400px",
        height: "50px",
        borderRadius: "20px",
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        marginLeft: "570px",
        fontSize:"20px",
      }} onClick={() => dispatch({type: "clearPlay" })}>Play again</button>
    </div>
  );
}
