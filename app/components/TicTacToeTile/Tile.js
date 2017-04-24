import styled from "styled-components"

let Tile = styled.div`
    background-color: ${({team}) => team === "x" ? "red" : team === "o" ? "blue" : ""};
    display: inline-block;
    width: 150px;
    height: 150px;

    @media (max-width: 600px) {
        width: 100px;
        height: 100px;
    }
`

export default Tile