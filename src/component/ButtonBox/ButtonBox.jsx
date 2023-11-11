import styled from "styled-components"

const ButtonDiv = styled.div`
      width: 100%;
  height: calc(100% - 110px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
`

const ButtonBox = ({ children }) => {
    return (
        <ButtonDiv>
            {children}
        </ButtonDiv>
    )
}

export default ButtonBox