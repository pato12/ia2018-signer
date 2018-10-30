import React from 'react';

export default class Canvas extends React.Component {
  state = { x: 0, y: 0, drawing: false, lineWidth: 1 };

  componentDidMount() {
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  drawStart = (e) => {
    const point = e.touches ? e.touches[0] : e;


    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();

    this.setState({
      drawing: true,
      x: point.clientX - this.canvas.offsetLeft,
      y: point.clientY - this.canvas.offsetTop,
    }, () => {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(this.state.x, this.state.y, this.state.lineWidth, this.state.lineWidth);
      this.ctx.closePath();
    });
  };

  drawStop = (e) => {
    if (!this.state.drawing) return;

    this.setState({ drawing: false });

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();
  };

  drawMove = (e) => {
    if (!this.state.drawing) return;

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();

    const point = e.touches ? e.touches[0] : e;

    const x = point.clientX - this.canvas.offsetLeft;
    const y = point.clientY - this.canvas.offsetTop;

    this.ctx.beginPath();
    this.ctx.moveTo(this.state.x, this.state.y);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = this.state.lineWidth;
    this.ctx.stroke();
    this.ctx.closePath();

    this.setState({
      x,
      y,
    });
  };


  render() {
    return (
      <canvas
        {...this.props}
        onMouseDown={this.drawStart}
        onTouchStart={this.drawStart}

        onMouseUp={this.drawStop}
        onTouchEnd={this.drawStop}
        onMouseOut={this.drawStop}

        onMouseMove={this.drawMove}
        onTouchMove={this.drawMove}

        ref={(ref) => this.canvas = ref}
      />
    );
  }

  clear() {
    return this.ctx && this.ctx.clearRect(0, 0, this.props.width, this.props.height);
  }

  getImageBase64() {
    return this.canvas && this.canvas.toDataURL();
  }

  getCanvas() {
    return this.canvas;
  }
}
