import styled from 'styled-components'  

export const Wrapper = styled.div`
position: absolute;
bottom: 0;
top: 0;
z-index: 10000;
width: 100%;
height: 100%;
display:flex;
justify-content: center;
align-items:center;
background:${props => 'rgba(0, 0, 0, .35)'}
// margin: -75px 0 0 -75px;
// border: 16px solid #f3f3f3;
// border-radius: 50%;
// border-top: 16px solid #3498db;
// width: 120px;
// height: 120px;
// -webkit-animation: spin 2s linear infinite;
// animation: spin 2s linear infinite;
`