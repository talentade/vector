import styled from 'styled-components'


export const MainLabelContainerAlt = styled.div`
    margin-top ${props => props.marTop ? props.marTop : '0'};
`

export const Select = styled.select`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    border: 1px solid ${props => props.theme.selectBorder};
    background: transparent;
    padding: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 14px;
    appearance: none;
    background-image: url(${require('../images/arrow-dropdown.svg')});
    background-repeat: no-repeat;
    background-position: 90%;
    background-size: center;
    border-radius: 2px;
    color: ${props => props.theme.cardName};
    cursor:pointer;
    :focus{
        outline: ${props => props.theme.blue};
    }
`
Select.defaultProps = {
  width: '49px',
  height: '29px'
}
