import styled from "styled-components"

let Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    button {
        width: 400px;
        height: 120px;
    }
    @media (max-width: 860px) {
        flex-direction: column
        justify-content: center;

        button {
            margin-bottom:100px;
        }
        button:last-child {
            margin:0;
        }
    }
    @media (max-width: 480px) {
        button {
            font-size: 28px;
            width: 300px;
            height: 90px;
        }
    }
    @media (max-width: 400px) {
        button {
            font-size: 22px;
            width: 250px;
            height: 82px;
        }
    }
`

export default Wrapper