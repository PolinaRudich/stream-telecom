import styled from "styled-components";

export const DragdropItemStyled = styled.div`
margin-bottom: 10px;
padding: 10px 20px;
border: 1px solid #d9d9d9;
border-radius: 16px;
display: grid;
grid-template-columns: 13px 1fr 1fr 20px;
gap: 8px;
align-items: center;
background-color: grey;
`;

export const Input = styled.input`
font-weight: 500;
font-size: 18px;
line-height: 22px;
padding: 8px;
border-radius: 16px;
`;

export const DragdropContainer = styled.div`
max-width: 60%;
margin: 30px auto;
`;

export const RemovedItemButton  = styled.button`
height: 100%;
width: 100%;
`;

export const ActionButton = styled.div`
padding: 10px 20px;
text-align: center;
border: 1px solid white;
display: flex;
align-items: center;
border-radius: 16px;
cursor: pointer;
max-height: 60px;
`;

export const TextareaStyled = styled.textarea`
min-width: 400px;
font-weight: 500;
font-size: 18px;
line-height: 22px;
height: min-content;
padding: 8px;
border-radius: 16px;
resize: none; 
background-color: white;
`;

export const ActionsContainerStyled = styled.div`
gap:20px;
margin-bottom: 30px;
`;