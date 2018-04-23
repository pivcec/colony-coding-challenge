import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
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

const Avatars = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
`;

const Avatar = styled.li`
  list-style: none;
  margin: 5px;
`;

const Image = props => <img {...props} src={props.src} />;

const AvatarImage = styled(Image)`
  border-radius: 50%;
  height: 60px;
`;

class PopoverContent extends Component {

  getIndividualAvatar = id => (
    <Avatar key={id}>
      <AvatarImage
        src={avatarImages[id]}
      />
    </Avatar>
  );

  render() {
    const { availableAvatars } = this.props;
    return (
      <Avatars>
        {availableAvatars.map((availableAvatar) => this.getIndividualAvatar(availableAvatar.id))}
      </Avatars>
    );
  }
}

PopoverContent.propTypes = {
  availableAvatars: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default PopoverContent;
