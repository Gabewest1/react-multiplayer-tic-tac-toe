import React from "react"

import Wrapper from "./Wrapper"
import ChalkButton from "../../components/ChalkButton"

export default class HomePage extends React.Component {
    render() {
        return (
            <Wrapper>
               <ChalkButton to="/rockPaperScissors">Play Local</ChalkButton>
               <ChalkButton to="/online">Play Online</ChalkButton>
            </Wrapper>
        )
    }
}