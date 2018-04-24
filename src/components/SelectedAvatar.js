import React, { Component } from 'react';
import styled from 'styled-components';
import PopoverAnimation from './PopoverAnimation';
import avatar1 from '../images/avatar1.png';
import avatar2 from '../images/avatar2.png';
import avatar3 from '../images/avatar3.png';
import avatar4 from '../images/avatar4.png';
import avatar5 from '../images/avatar5.png';
import avatar6 from '../images/avatar6.png';
import availableAvatars from '../data/availableAvatars.js';

const avatarImages = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
};

const OuterWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 10px;
`;

const PopoverWrapper = styled.div`
  width: 280px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 85px;
`;

const Image = props => <img {...props} src={props.src} />;

const AvatarImage = styled(Image)`
  border-radius: 50%;
  height: 60px;
`;

class SelectedAvatar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedAvatarId: 1,
      isHovered: false,
      isActive: false,
      showPopoverAnimation: false,
      hidePopoverAnimation: false,
    };
  }

  getAvatarStyle = (isHovered, isActive) => {
    const avatarHoveredOrActiveStyle = { border: '1px solid rgb(155, 160, 163)' };
    const avatarNotHoveredOrActiveStyle = { border: '1px solid rgb(255, 255, 255)' };
    if (isHovered || isActive) {
      return avatarHoveredOrActiveStyle;
    }
    return avatarNotHoveredOrActiveStyle;
  };

  handleMouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  handleOuterWrapperClick = e => {
    console.log('clickable area');
  };

  handleInnerWrapperClick = e => {
    e.stopPropagation();
  }

  handleAvatarImageClick = (e, isActive) => {
    if (isActive) {
      this.setState({
        isActive: false,
        showPopoverAnimation: false,
        hidePopoverAnimation: true,
      });
    } else {
      this.setState({
        isActive: true,
        showPopoverAnimation: true,
        hidePopoverAnimation: false,
      });
    }
  };

  render() {
    const {
      selectedAvatarId,
      isHovered,
      isActive,
      showPopoverAnimation,
      hidePopoverAnimation,
    } = this.state;
    return (
      <OuterWrapper
        onClick={(e) => this.handleOuterWrapperClick(e)}
      >
        <div onClick={(e) => this.handleInnerWrapperClick(e)}>
          <AvatarWrapper>
            <AvatarImage
              style={this.getAvatarStyle(isHovered, isActive)}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onClick={(e) => this.handleAvatarImageClick(e, isActive)}
              src={avatarImages[selectedAvatarId]}
            />
          </AvatarWrapper>
          <PopoverWrapper>
            <PopoverAnimation
              availableAvatars={availableAvatars}
              show={showPopoverAnimation}
              hide={hidePopoverAnimation}
            />
          </PopoverWrapper>
        </div>
      </OuterWrapper>
    );
  }
}

export default SelectedAvatar;
