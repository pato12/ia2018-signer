import React from 'react';

import CanvasDraw from "react-canvas-draw";

export default class Sign extends React.Component {
  state = { width: 100 };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();

    if (this.canvas && this.canvas.canvas) {
      this.canvas.canvas.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const width = Math.min(700, window.innerWidth) - 30;

    this.setState({ width });
  }

  render() {
    const { width } = this.state;
    return (
      <CanvasDraw
        className='sign'
        canvasWidth={width}
        canvasHeight={300}
        ref={(ref) => this.canvas = ref}
      />
    );
  }

  clear() {
    return this.canvas && this.canvas.clear();
  }

  getImageBase64() {
    return this.canvas && this.canvas.canvas.toDataURL();
  }

  getCanvas() {
    return this.canvas && this.canvas.canvas;
  }
}
