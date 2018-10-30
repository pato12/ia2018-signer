import React from 'react';
import * as tf from '@tensorflow/tfjs';

import * as ia from '../ia';
import Sign from '../components/sign';
import Button from '../components/button';
import Loading from '../components/loading';

export default class Reconocer extends React.Component {
  state = {
    loading: false,
    result: null,
  };

  onReconocer = async () => {
    const canvas = this.sign.getCanvas();
    const image = tf.fromPixels(canvas);
    const xs = ia.loadAndProcessImage(image);

    this.setState({ loading: true });

    try {
      const result = await ia.getPrediction(xs);

      this.setState({ result });
    } catch (error) {
      alert('Error!');
    } finally {
      this.setState({ loading: false });
    }
  };

  onLimpiar = () => {
    this.sign.clear();
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div className='container'>

        <div className='sign margin'>
          <Sign ref={(ref) => this.sign = ref} />
          <Loading show={loading} />
        </div>

        <div className='actions'>
          <Button onClick={this.onReconocer}>Reconocer</Button>
          <Button onClick={this.onLimpiar}>Limpiar</Button>
        </div>

        {
          result !== null && (
            <div className='result'>
              <h1>Firma de la persona {result.prediction}</h1>

              <h2>Todos los resultados</h2>

              {
                result.result.map(({ person, acc }) => (
                  <div key={person} className='item'>
                    <div className='text'>Persona {person}: {(acc * 100).toFixed(3)}%</div>
                    <div className='progress-wrapper'>
                      <div className='progress' style={{ width: `${(Math.min(100, acc * 100))}%` }} />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
