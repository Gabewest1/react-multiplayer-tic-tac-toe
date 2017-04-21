import React from "react"
import { Route } from "react-router-dom"

import Wrapper from "./wrapper"
import Button from "./Button"

export default class HomePage extends React.Component {
    render() {
        return (
            <Wrapper>
               <Button to="/local">Play Local</Button>
               <Button to="/online">Play Online</Button>
            </Wrapper>
        )
    }
}