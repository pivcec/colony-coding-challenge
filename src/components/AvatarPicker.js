import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PopoverAnimation from './PopoverAnimation';
import avatar1 from '../images/avatar1.png';
import avatar2 from '../images/avatar2.png';
import avatar3 from '../images/avatar3.png';
import avatar4 from '../images/avatar4.png';
import avatar5 from '../images/avatar5.png';
import avatar6 from '../images/avatar6.png';

const avatarImages = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
};

const AvatarPickerWrapper = styled.div`
  margin: 1em;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PopoverWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: -.5em;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = props => <img {...props} src={props.src} />;

const Avatar = styled(Image)`
  border-radius: 50%;
  height: 60px;
`;

class AvatarPicker extends Component {
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

  handleClick = isActive => {
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
    const { availableAvatars } = this.props;
    return (
      <AvatarPickerWrapper>
        <AvatarWrapper>
          <Avatar
            style={this.getAvatarStyle(isHovered, isActive)}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={() => this.handleClick(isActive)}
            src={avatarImages[selectedAvatarId]}
          />
        </AvatarWrapper>
        <PopoverWrapper>
          <PopoverAnimation
            show={showPopoverAnimation}
            hide={hidePopoverAnimation}
          />
        </PopoverWrapper>
      </AvatarPickerWrapper>
    );
  }
}

AvatarPicker.propTypes = {
  availableAvatars: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default AvatarPicker;
