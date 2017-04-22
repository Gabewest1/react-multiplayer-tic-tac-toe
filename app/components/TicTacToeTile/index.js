import styled from "styled-components"

let Tile = styled.div`
    background-color: ${(props) => props.X ? "red" : props.O ? "blue" : ""};
    display: inline-block;
    width: 150px;
    height: 150px;
`

export default Tile