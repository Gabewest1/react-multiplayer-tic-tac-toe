import React from "react"
import AnimatedSpan from "./AnimatedSpan"
import Wrapper from "./Wrapper"

export default class MatchmakingSearchText extends React.Component {
    handleClick(e) {
        let elements = document.getElementsByClassName("loading")
        for(var i=0; i<elements.length; i++) {
            let elem = elements[i]
            elem.style["animation-name"] = "loading"
        }
    }
    animateText(text) {
        let keyCounter = 0
        text = text.split("").map(letter => { 
            if(letter !== ".") 
                return letter

            let $animatedSpan = (
                <AnimatedSpan key={keyCounter++}>{letter}</AnimatedSpan>
            )
            return $animatedSpan
        })
        console.log(text)
        return text
    }
    render() {
        let animatedText = this.animateText(this.props.children)
        return (
            <Wrapper>
                {animatedText}
            </Wrapper>
        )
    }
}

