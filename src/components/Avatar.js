import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import avatar1 from '../images/avatar1.png';
import avatar2 from '../images/avatar2.png';
import avatar3 from '../images/avatar3.png';
import avatar4 from '../images/avatar4.png';
import avatar5 from '../images/avatar5.png';
import avatar6 from '../images/avatar6.png';
import availableAvatars from '../data/availableAvatars';

const avatarImages = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
};

const spinPie = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

export const PieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4px;
  > .pie-background {
    background-color: rgb(122, 161, 178);
    position: absolute;
    width: 66px;
    height: 66px;
    border-radius: 33px;
  }
  > .pie-slice, .pie {
    background-color: rgb(44, 48, 51);
    transform:rotate(50deg);
  }
  > .hold {
    position: absolute;
    width: 66px;
    height: 66px;
    border-radius: 33px;
    clip: rect(0px, 66px, 66px, 16px);
    animation-name: ${spinPie};
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .pie {
    position: absolute;
    width: 66px;
    height: 66px;
    border-radius: 33px;
    clip: rect(0px, 33px, 33px, 0px);
  }
`;

const Image = props => <img {...props} src={props.src} alt={props.alt} />;

export const AvatarImage = styled(Image)`
  border-radius: 50%;
  height: 60px;
  z-index: 1;
`;

class Avatar extends Component {
  getAlt = (id) => {
    const avatar = availableAvatars.find(availableAvatar => availableAvatar.id === id);
    return avatar ? avatar.label : undefined;
  }

  getAvatarImageStyle = (
    activeAvatarId,
    hoveredAvatarId,
    id,
    selectedAvatarId,
  ) => {
    const isNotSelectedIsHoveredIsNotActive = {
      border: '3px solid rgb(155, 160, 163)',
    };
    const isSelected = {
      border: '3px solid rgb(122, 161, 178)',
    };
    if (selectedAvatarId !== id && hoveredAvatarId === id && activeAvatarId !== id) {
      return isNotSelectedIsHoveredIsNotActive;
    }
    if (selectedAvatarId === id) {
      return isSelected;
    }
    return null;
  };

  getInactiveAvatarWrapperClassName = (
    activeAvatarId,
    hoveredAvatarId,
    id,
    selectedAvatarId,
  ) => {
    if (hoveredAvatarId === id && selectedAvatarId !== id) {
      return 'is-hovered';
    }
    if (hoveredAvatarId !== id && selectedAvatarId !== id) {
      return 'is-not-hovered';
    }
    return null;
  }

  handleMouseEnter = (id, updateHoveredAvatarId) => {
    updateHoveredAvatarId(id);
  };

  handleMouseLeave = (updateHoveredAvatarId) => {
    updateHoveredAvatarId(null);
  };

  handleAvatarWrapperClick = (
    activeAvatarId,
    id,
    selectedAvatarId,
    updateSelectedAvatarId,
  ) => {
    if (activeAvatarId !== id) {
      updateSelectedAvatarId(id, selectedAvatarId);
    }
  };

  render() {
    const {
      activeAvatarId,
      id,
      hoveredAvatarId,
      selectedAvatarId,
      updateHoveredAvatarId,
      updateSelectedAvatarId,
    } = this.props;
    if (activeAvatarId === id) {
      return (
        <PieWrapper>
          <div className="pie-background" />
          <div className="pie-slice, hold">
            <div className="pie" />
          </div>
          <AvatarImage
            alt={this.getAlt(selectedAvatarId)}
            src={avatarImages[id]}
            style={this.getAvatarImageStyle(
              activeAvatarId,
              hoveredAvatarId,
              id,
              selectedAvatarId,
            )}
          />
        </PieWrapper>
      );
    }
    return (
      <div
        className={this.getInactiveAvatarWrapperClassName(
          activeAvatarId,
          hoveredAvatarId,
          id,
          selectedAvatarId,
        )}
        onMouseEnter={() => this.handleMouseEnter(id, updateHoveredAvatarId)}
        onMouseLeave={() => this.handleMouseLeave(updateHoveredAvatarId)}
        onClick={() => this.handleAvatarWrapperClick(
          activeAvatarId,
          id,
          selectedAvatarId,
          updateSelectedAvatarId,
        )}
      >
        <AvatarImage
          alt={this.getAlt(selectedAvatarId)}
          src={avatarImages[id]}
          style={this.getAvatarImageStyle(
            activeAvatarId,
            hoveredAvatarId,
            id,
            selectedAvatarId,
          )}
        />
      </div>
    );
  }
}

Avatar.defaultProps = {
  activeAvatarId: null,
  hoveredAvatarId: null,
};

Avatar.propTypes = {
  activeAvatarId: PropTypes.number,
  hoveredAvatarId: PropTypes.number,
  id: PropTypes.number.isRequired,
  selectedAvatarId: PropTypes.number.isRequired,
  updateHoveredAvatarId: PropTypes.func.isRequired,
  updateSelectedAvatarId: PropTypes.func.isRequired,
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
