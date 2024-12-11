import styled from 'styled-components';

export const ContentButton = styled.div`
    display: flex;
    gap: 15px; 
    justifyContent: center; 
    alignItems: center;
`;

export const Button = styled.button`
    width: 12%;
    padding: 12px;
    margin-left: 150px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    &:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
    }
`;

export const ButtonClose = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    &:hover{
        background-color: #2980b9;
        transform: translateY(-2px);
    }
`;

export const ButtonAdd = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #37db34;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    &:hover {
        background-color: #43b929;
        transform: translateY(-2px);
    }
`;

export const ButtonDelete = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #db3434;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    &:hover {
        background-color: #b92929;
        transform: translateY(-2px);
    }
`;

export const ButtonG = styled.button`
    background-color:transparent;
    border: none;
    color: #4CAF50;

    &:hover{
        transform: scale(1.35);
        color: green;
    }
`;

export const ButtonE = styled.button`
    background-color:transparent;
    border: none;
    color: #008ef2;

    &:hover{
        transform: scale(1.35);
        color: #0067bd;
    }
`;

export const ButtonD = styled.button`
    background-color:transparent;
    border: none;
    color: red;

    &:hover{
        transform: scale(1.35);
        color: brown;
    }
`;