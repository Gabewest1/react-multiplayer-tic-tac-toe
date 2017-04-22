import React from "react"
import styled from "styled-components"
import board from "./board.png"

let Board = styled.div`
    background-image: url(${board});
    background-size: cover;
    display: inline-block;
`
export default (props) => {
    return (
        <Board>
            {props.children}
        </Board>
    )
}