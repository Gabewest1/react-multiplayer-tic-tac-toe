import React from "react"

import Wrapper from "./Wrapper"
import Button from "components/Button"

export default class HomePage extends React.Component {
    render() {
        return (
            <Wrapper>
               <Button to="/rockPaperScissors">Play Local</Button>
               <Button to="/online">Play Online</Button>
            </Wrapper>
        )
    }
}