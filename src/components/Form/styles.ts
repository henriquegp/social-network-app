import styled from 'styled-components';

interface ContainerProps {
  readonly error: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-bottom: 2px; 

  input, textarea {
    display: block;
    width: 100%;
    font-size: 1.6rem;
    padding: 12px 16px 14px;
    border-radius: 6px;
    font-weight: 400;
    border: 1px solid ${({ error, theme }) => (error ? theme.danger : '#a09d9d')};
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.color};
    transition: border-color .2s;
    resize: vertical;

    :hover {
      border-color: #575858;
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.primary};
      box-shadow: 0px 0px 4px 0px #0eaaf152;
      outline: 0;
    }
  }

  input[type="password"] {
    font: small-caption;
    font-size: 1.6rem;
  }
`;

export const ErrorMessage = styled.div`
  padding: 3px 16px;
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.danger};
  height: 21px;
`;

export const StyledCheckBox = styled.div`
  input {
    width: 0;
    position: relative;
    display: inline-block;
    height: 15px;

    :before {
      content: '';
      width: 15px;
      height: 15px;
      border: 2px solid #03a9f4;
      display: inline-block;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color .3s;
    }

    :after {
      width: 9px;
      height: 5px;
      border: 3px solid #FFF;
      display: block;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      position: absolute;
      top: 3px;
      left: 3px
    }

    :checked {
      &:before {
        background: #03a9f4;
      }

      &:after {
        content: '';
      }
    }
  }
`;
