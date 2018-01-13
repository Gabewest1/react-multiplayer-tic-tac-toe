import styled from "styled-components"

const xURL = `url(/assets/images/x.png)`
const oURL = `url(/assets/images/o.png)`

let Tile = styled.div`
    background-image: ${({team}) => team === "x" ? xURL : team === "o" ? oURL : ""};
    background-size: 100% 100%;
    display: inline-block;
    width: 150px;
    height: 150px;

    @media (max-width: 600px) {
        width: 100px;
        height: 100px;
    }
`

export default Tile