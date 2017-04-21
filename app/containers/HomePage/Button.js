import React from "react"
import styled from "styled-components"
import Link from "components/Link"

let Button = styled.button `
    color: white;
    width: 150px;
    height: 75px;
    background-color: transparent;
    border-radius: 10px;
    border: solid 3px white;
`

export default (props) => (
    <Link to={props.to}>
        <Button>{props.children}</Button>
    </Link>
)