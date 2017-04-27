import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Button from "./Button"
import Wrapper from "./Wrapper"
import Row from "./Row"

import * as actions from "./actions"

class TicTacToe extends React.Component {
    componentWillMount() {
        
    }
    handleClick(e) {
        let { team, currentPlayersTurn } = this.props
        
        if(currentPlayersTurn === team) {
            let tile = e.target.getAttribute("data-tile")
            this.props.setTile(tile, team)
        }
    }
    createTiles() {
        let counter = 0
        return this.props.board.map((row, i) => {
            return (
                <Row key={i}>
                    {row.map(tile => {
                        return (
                            <Tile onClick={(e) => this.handleClick(e)}
                                  team={tile}
                                  data-tile={counter}
                                  key={counter++} />
                        )
                     })
                    }
                </Row>
            )
        })
    }

    render() {
        console.log(this.props)
        return (
            <Wrapper>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
                <Button onClick={this.props.resetGame.bind(this)}>Restart</Button>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.ticTacToe
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)