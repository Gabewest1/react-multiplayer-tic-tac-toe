import styled from "styled-components"

let Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    @media (max-width: 480px) {
        flex-direction: column
    }
`

export default Wrapper