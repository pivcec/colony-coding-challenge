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

const IsHoveredIsNotSelectedWrapper = styled.div`
  display: block;
  position: relative;
  &:after {
    position: absolute;
    background: rgb(122, 161, 178);
    top: 0;
    left: 0;
    content: '';
    height: 60px;
    width: 60px;
    border-radius: 50%;
    opacity: 0.2;
    margin-top: 3px;
    margin-left: 3px;
  }
`;

// exported, empty styled component facilitates onClick tests
export const AvatarImageWrapper = styled.div`
`;

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

  getIsHovered = (hoveredAvatarId, id) => {
    if (hoveredAvatarId === id) {
      return true;
    }
    return false;
  }

  getIsSelected = (id, selectedAvatarId) => {
    if (selectedAvatarId === id) {
      return true;
    }
    return false;
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
      hoveredAvatarId,
      id,
      selectedAvatarId,
      updateHoveredAvatarId,
      updateSelectedAvatarId,
    } = this.props;
    const isHovered = this.getIsHovered(hoveredAvatarId, id);
    const isSelected = this.getIsSelected(id, selectedAvatarId);
    const isNotActiveIsHoveredIsNotSelectedStyles = {
      border: '3px solid rgb(155, 160, 163)',
    };
    const isSelectedStyles = {
      border: '3px solid rgb(122, 161, 178)',
    };
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
          />
        </PieWrapper>
      );
    }
    return (
      <AvatarImageWrapper
        onMouseEnter={() => this.handleMouseEnter(id, updateHoveredAvatarId)}
        onMouseLeave={() => this.handleMouseLeave(updateHoveredAvatarId)}
        onClick={() => this.handleAvatarWrapperClick(
          activeAvatarId,
          id,
          selectedAvatarId,
          updateSelectedAvatarId,
        )}
      >
        {isHovered &&
          <div>
            {isSelected &&
              <div>
                <AvatarImage
                  alt={this.getAlt(id)}
                  src={avatarImages[id]}
                  style={isSelectedStyles}
                />
              </div>
            }
            {!isSelected &&
              <IsHoveredIsNotSelectedWrapper>
                <AvatarImage
                  alt={this.getAlt(id)}
                  src={avatarImages[id]}
                  style={isNotActiveIsHoveredIsNotSelectedStyles}
                />
              </IsHoveredIsNotSelectedWrapper>
            }
          </div>
        }
        {!isHovered &&
          <div>
            {isSelected &&
              <div>
                <AvatarImage
                  alt={this.getAlt(id)}
                  src={avatarImages[id]}
                  style={isSelectedStyles}
                />
              </div>
            }
            {!isSelected &&
              <div>
                <AvatarImage
                  alt={this.getAlt(id)}
                  src={avatarImages[id]}
                />
              </div>
            }
          </div>
        }
      </AvatarImageWrapper>
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
