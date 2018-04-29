import React from 'react';
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

export const ShowPopoverAnimation = styled.div`
  animation: ${createBox} 0.5s;
  transform: scale(1);
  &:before {
    content:'\\A';
    position: absolute;
    margin-top: -18px;
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

export const HidePopoverAnimation = styled.div`
  animation: ${destroyBox} 0.5s;
  transform: scale(0);
  &:before {
    content:'\\A';
    position: absolute;
    margin-top: -18px;
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
    activeAvatarId,
    hide,
    hoveredAvatarId,
    selectedAvatarId,
    show,
    updateHoveredAvatarId,
    updateSelectedAvatarId,
  } = props;

  const popOverAnimationStyle = {
    backgroundColor: 'rgb(44, 48, 51)',
    borderRadius: '2px',
    display: 'flex',
    filter: 'drop-shadow(0px 0px 10px rgb(102, 102, 102))',
    flexDirection: 'column',
    padding: '10px',
  };

  if (show) {
    return (
      <ShowPopoverAnimation
        style={popOverAnimationStyle}
      >
        <PopoverContent
          activeAvatarId={activeAvatarId}
          hoveredAvatarId={hoveredAvatarId}
          selectedAvatarId={selectedAvatarId}
          updateHoveredAvatarId={updateHoveredAvatarId}
          updateSelectedAvatarId={updateSelectedAvatarId}
        />
      </ShowPopoverAnimation>
    );
  } else if (hide) {
    return (
      <HidePopoverAnimation
        style={popOverAnimationStyle}
      >
        <PopoverContent
          activeAvatarId={activeAvatarId}
          hoveredAvatarId={hoveredAvatarId}
          selectedAvatarId={selectedAvatarId}
          updateHoveredAvatarId={updateHoveredAvatarId}
          updateSelectedAvatarId={updateSelectedAvatarId}
        />
      </HidePopoverAnimation>
    );
  }
  return null;
};

PopoverAnimation.defaultProps = {
  activeAvatarId: null,
  hoveredAvatarId: null,
};

PopoverAnimation.propTypes = {
  activeAvatarId: PropTypes.number,
  hide: PropTypes.bool.isRequired,
  hoveredAvatarId: PropTypes.number,
  selectedAvatarId: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  updateHoveredAvatarId: PropTypes.func.isRequired,
  updateSelectedAvatarId: PropTypes.func.isRequired,
};

export default PopoverAnimation;
