import { all } from "redux-saga/effects"
import matchMakingSagas from "./containers/MatchMaking/sagas"

export default function* rootSaga() {
    yield all([
        matchMakingSagas()
    ])
}
