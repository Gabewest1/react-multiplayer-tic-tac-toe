import React from "react"
import styled from "styled-components"
import Link from "components/Link"

let Button = styled.button `
    color: white;
    width: 320px;
    height: 85px;
    background-color: transparent;
    border-radius: 10px;
    border: solid 8px white;
    margin: 50px
`

export default (props) => (
    <Button>
        <Link to={props.to}>{props.children}</Link>
    </Button>
)