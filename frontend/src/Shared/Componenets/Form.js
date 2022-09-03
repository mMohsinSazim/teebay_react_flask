import styled from "styled-components";

const Form = styled.form`
  width: 40rem;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.5rem;
  h3 {
    text-align: center;
  }
  div {
    width: 50%;
    margin: 1rem auto;
  }
  label {
    display: block;
    text-align: left;
    margin: 0.25rem 0;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #e1e4e5;
    border: none;
  }
  input:focus {
    outline: none;
  }
  .form-error-msg {
    width: 50%;
    padding: 0.25rem;
    color: #d2464f;
    margin: 10px auto;
    background-color: #e6989d;
  }
  p {
    text-align: center;
    margin-top: 10px;
    a {
      text-decoration: none;
    }
  }
`;

export default Form;
