import React from "react"
import styled from "styled-components"
import Link from "components/Link"

let Button = styled.button `
    background-image: url(assets/images/button--chalk.png);
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
    width: 320px;
    height: 85px;
    
    font-size: 30px;
`

export default (props) => {
    let shouldRenderWithALink = props.to ? true : false
    let ButtonToRender

    if(shouldRenderWithALink) {
        ButtonToRender = (
            <Button {...props}>
                <Link to={props.to}>{props.children}</Link>
            </Button>
        )
    } else {
        ButtonToRender = (
            <Button {...props}>{props.children}</Button>
        )
    }
    
    return ButtonToRender
}