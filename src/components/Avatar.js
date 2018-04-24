import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import avatar1 from '../images/avatar1.png';
import avatar2 from '../images/avatar2.png';
import avatar3 from '../images/avatar3.png';
import avatar4 from '../images/avatar4.png';
import avatar5 from '../images/avatar5.png';
import avatar6 from '../images/avatar6.png';
import availableAvatars from '../data/availableAvatars';
import '../css/App.css';

const avatarImages = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
};

const Image = props => <img {...props} src={props.src} />;

const AvatarImage = styled(Image)`
  border-radius: 50%;
  height: 60px;
  z-index: 1;
`;

class Avatar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isHovered: false,
      isActive: false,
    };
  }

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

  getAvatarImageStyle = (isHovered, isActive) => {
    const isHoveredAndNotActiveStyle = {
      margin: '2px',
      border: '3px solid rgb(155, 160, 163)',
      opacity: '0.8',
    };
    if (isHovered && !isActive) {
      return isHoveredAndNotActiveStyle;
    }
    return null;
  };

  handleAvatarImageClick = (isActive, id, updateSelectedAvatarId) => {
    if (isActive) {
      this.setState({
        isActive: false,
      });
    } else {
      updateSelectedAvatarId(id);
      this.setState({
        isActive: true,
      });
    }
  };

  render() {
    const { isHovered, isActive } = this.state;
    const { id, updateSelectedAvatarId } = this.props;
    if (isActive) {
      return (
        <div className="pieContainer">
          <div className="pieBackground"></div>
          <div className="pieSlice1, hold">
            <div className="pie"></div>
          </div>
          <AvatarImage
            style={this.getAvatarImageStyle(isHovered, isActive)}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={() => this.handleAvatarImageClick(isActive)}
            src={avatarImages[id]} />
        </div>
      );
    }
    return (
      <AvatarImage
        style={this.getAvatarImageStyle(isHovered, isActive)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleAvatarImageClick(isActive, id, updateSelectedAvatarId)}
        src={avatarImages[id]} />
    );
  }
}

Avatar.propTypes = {
  id: PropTypes.number.isRequired,
  updateSelectedAvatarId: PropTypes.func.isRequired,
};

export default Avatar
