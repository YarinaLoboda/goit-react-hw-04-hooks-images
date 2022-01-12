import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadMoreBtn = styled.button`
   {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 10%;
    border: 2px solid #ccc;
    font-weight: 600;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    cursor: pointer;

    &: hover {
      background-color: #ccc;
    }
  }
`;

export default function Button(props) {
  const onBtnClick = () => {
    props.onClick();
  };

  return (
    <LoadMoreBtn type="button" onClick={onBtnClick}>
      &nbsp;Load&nbsp;more&nbsp;
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
