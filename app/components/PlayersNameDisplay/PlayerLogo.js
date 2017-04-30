import styled from "styled-components"
import x from "assets/images/x.png"
import o from "assets/images/o.png"

const xURL = `url(assets/images/x.png)`
const oURL = `url(assets/images/o.png)`

let PlayerLogo = styled.div`
    width: 60px;
    height: 60px;
    background-image: ${({team}) => team === "x" ? xURL : team === "o" ? oURL : ""};
    background-size: 100% 100%;
`

export default PlayerLogo