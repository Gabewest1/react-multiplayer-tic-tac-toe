import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TicTacToeBoard from "components/TicTacToeBoard"
import Tile from "components/TicTacToeTile" 
import Wrapper from "./Wrapper"
import Row from "./Row"

import { setTile } from "./actions"

class TicTacToe extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }
    handleClick(e) {
        let { team } = this.props
        let tile = e.target.getAttribute("data-tile")
        console.log(tile)
        props.setTile(tile, team)
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
        return (
            <Wrapper>
                <TicTacToeBoard>
                    {this.createTiles()}
                </TicTacToeBoard>
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
    return bindActionCreators({
        setTile
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)