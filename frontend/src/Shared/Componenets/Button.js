import styled from "styled-components";

export const FormButton = styled.button`
  width: 8rem;
  border-radius: 0.25rem;
  background-color: #6452ff;
  padding: 0.25rem;
  display: block;
  margin: 0 auto;
  text-align: center;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const UpdateButton = styled(FormButton)`
  margin: 2rem 0;
  background-color: teal;
  color: white;
  text-decoration: none;
`;

export const DeleteButton = styled(FormButton)`
  margin: 2rem 1rem;
  background-color: red;
  color: white;
`;
