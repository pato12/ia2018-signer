import React from 'react';

import * as ia from '../ia';

import Button from '../components/button';
import Sign from '../components/sign';
import Loading from '../components/loading';

const personas = [
  { nombre: 'Persona 1', label: 1 },
  { nombre: 'Persona 2', label: 2 },
  { nombre: 'Persona 3', label: 3 },
  { nombre: 'Persona 4', label: 4 },
  { nombre: 'Persona 5', label: 5 },
];

export default class Registrar extends React.Component {
  state = {
    persona: 1,
    firmas: [],
    loading: false,
    loss: null,
    entrenado: false,
  };

  componentDidMount() {
    this.data = new ia.DataController(10);
  }

  onTrain = async () => {
    this.setState({ loading: true });

    try {
      await ia.trainModel(this.data, (logs) => this.setState({ loss: logs.loss }));
      this.setState({ entrenado: true });
    } catch (error) {
      alert('Error!');
    } finally {
      this.setState({ loading: false });
    }
  };

  onAgregar = async () => {
    const { persona } = this.state;
    const base64 = this.sign.getImageBase64();
    const canvas = this.sign.getCanvas();

    this.setState({ loading: true });

    try {
      await this.data.addExample(canvas, persona);

      this.setState(({ firmas }) => ({
        firmas: [
          ...firmas,
          { base64, persona },
        ],
      }));

      this.sign.clear();
    } catch (error) {
      alert('Error!');
    } finally {
      this.setState({ loading: false });
    }
  };

  onChangePersona = (e) => {
    this.setState({ persona: +e.target.value });
    this.sign.clear();
  };

  onLimpiar = () => {
    this.sign.clear();
  };

  render() {
    const { persona, firmas, loading, loss, entrenado } = this.state;

    return (
      <div className='container'>
        <div className='panel'>
          <label>Asignar firma a la </label>
          <select
            value={persona}
            disabled={loading || entrenado}
            onChange={this.onChangePersona}>
            {
              personas.map((p) => (
                <option key={p.label} value={p.label}>{p.nombre}</option>
              ))
            }
          </select>

          <p className='hint margin'>Firmas para entrenar: {firmas.length}</p>
        </div>

        <div className='sign'>
          <Sign
            ref={(ref) => this.sign = ref}
          />
          <Loading show={loading} />
        </div>

        <div className='actions'>
          <Button onClick={this.onAgregar} disabled={entrenado || loading}>Agregar</Button>
          <Button onClick={this.onLimpiar} disabled={entrenado || loading}>Limpiar</Button>
          <Button onClick={this.onTrain} disabled={firmas.length < 3 || entrenado || loading}>Entrenar</Button>

          {
            loss !== null && (
              <div className='hint'>Perdidas: {loss.toFixed(4)}</div>
            )
          }

          {
            entrenado && (
              <div className='entrenado'>Entrenado!</div>
            )
          }
        </div>

        <p className='hint margin'>Al menos 3 por persona para entrenar.</p>

      </div>
    );
  }
}