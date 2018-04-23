import React, { Component } from 'react';
import AvatarPicker from './AvatarPicker';

const availableAvatars = [
  { src: 'avatar1.png', label: 'Avatar 1', id: 1 },
  { src: 'avatar2.png', label: 'Avatar 2', id: 2 },
  { src: 'avatar3.png', label: 'Avatar 3', id: 3 },
  { src: 'avatar4.png', label: 'Avatar 4', id: 4 },
  { src: 'avatar5.png', label: 'Avatar 5', id: 5 },
  { src: 'avatar6.png', label: 'Avatar 6', id: 6 },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <AvatarPicker
          availableAvatars={availableAvatars}
        />
      </div>
    );
  }
}

export default App;
