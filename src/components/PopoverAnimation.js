import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const createBox = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.85);
  }
`;

const ShowPopoverAnimation = styled.div`
  text-align: center;
  width: 500px; height: 350px;
  background-color: rgb(44, 48, 51);
  animation: ${createBox} 0.5s;
  transform: scale(0.85);
  &:before {
    content: '\\25B2';
    display: flex;
    justify-content: center;
    margin-top: -1em;
    transform: scale(3, 2);
    color: rgb(44, 48, 51);
  }
`;

const destroyBox = keyframes`
  from {
    transform: scale(0.85);
  }
  to {
    transform: scale(0);
  }
`;

const HidePopoverAnimation = styled.div`
  text-align: center;
  width: 500px; height: 350px;
  background-color: rgb(44, 48, 51);
  animation: ${destroyBox} 0.5s;
  transform: scale(0);
  &:before {
    content: '\\25B2';
    display: flex;
    justify-content: center;
    margin-top: -1em;
    transform: scale(3, 2);
    color: rgb(44, 48, 51);
  }
`;

class PopoverAnimation extends Component {
  render() {
    const { show, hide } = this.props;
    if (show) {
      return (
        <ShowPopoverAnimation
          className="popover-animation"
        >
        </ShowPopoverAnimation>
      );
    } else if (hide) {
      return (
        <HidePopoverAnimation
          className="popover-animation"
        >
        </HidePopoverAnimation>
      );
    }
    return null;
  }
}

PopoverAnimation.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default PopoverAnimation;
