import React from 'react';

export default function Grid ({ board, onClickCell }){
  return(
    <div
      style={{
        display: "flex",
        width: 700,
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        margin: "auto",
        paddingTop:"15px"
      }}
    >{
    board.map((color, i) => (
      <div
        key = {i}
        style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          boxSizing: "border-box",
          backgroundColor: color,
          transition: "background-color 0.5s, color 0.5s",
        }}
        onClick={() =>  onClickCell(i)}
      >
      </div>
    ))
    }</div>
  )
}
