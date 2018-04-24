import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import PopoverContent from './PopoverContent';

const createBox = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const ShowPopoverAnimation = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  drop shadow: color: rgb(102, 102, 102), size 2px, blur 10px
  padding: 14px;
  background-color: rgb(44, 48, 51);
  animation: ${createBox} 0.5s;
  transform: scale(1);
  &:before {
    content:'\\A';
    position: absolute;
    margin-top: -8px;
    align-self: center;
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-right-width: 9px;
    border-left-width: 9px;
    border-bottom: 9px solid rgb(44, 48, 51);
  }
`;

const destroyBox = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

const HidePopoverAnimation = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  drop shadow: color: rgb(102, 102, 102), size 2px, blur 10px
  padding: 14px;
  background-color: rgb(44, 48, 51);
  animation: ${destroyBox} 0.5s;
  transform: scale(0);
  &:before {
    content:'\\A';
    position: absolute;
    margin-top: -8px;
    align-self: center;
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-right-width: 9px;
    border-left-width: 9px;
    border-bottom: 9px solid rgb(44, 48, 51);
  }
`;

const PopoverAnimation = (props) => {
  const {
    show,
    hide,
    availableAvatars,
    updateSelectedAvatarId,
  } = props;
  if (show) {
    return (
      <ShowPopoverAnimation
        className="popover-animation"
      >
        <PopoverContent
          updateSelectedAvatarId={(id) => updateSelectedAvatarId(id)}
        />
      </ShowPopoverAnimation>
    );
  } else if (hide) {
    return (
      <HidePopoverAnimation
        className="popover-animation"
      >
        <PopoverContent
          updateSelectedAvatarId={(id) => updateSelectedAvatarId(id)}
        />
      </HidePopoverAnimation>
    );
  }
  return null;
}

PopoverAnimation.propTypes = {
  updateSelectedAvatarId: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default PopoverAnimation;
