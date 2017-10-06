class Timer extends React.Component {
      constructor(props) {

            super(props);
            this.state = {
                  button: false,
                  numero: 0
            }
      }
      render() {
            return (
                  <div className="stopwatch">
                <h2>Stopwatch</h2>
                <div className="stopwatch-time">{this.state.numero}</div>
                {this.state.button ?
                        <button onClick={e => this.pararTiempo(e)}>Stop</button>
                        :
                        <button onClick={e => this.iniciarTiempo(e)}>Start</button>
                  }
                  <button onClick={e => this.resetearTiempo(e)}>reset</button>
            </div>
            );
      }
            
      // componentDidMount
      iniciarTiempo() {
            this.setState({
                  button: true,
            });
            this.timer = setInterval(() => {
                  this.setState({
                        numero: this.state.numero + 1
                  });
            }, 1000);
      }
      //componentWillUnmount
      pararTiempo() {
            this.setState({
                  button: false,
            });
            clearInterval(this.timer);
      }
      resetearTiempo() {
            this.setState({
                  numero: 0,
            });
            this.pararTiempo();
      }
}

class Model {
      constructor(players) {
            this.index = 0;
            this.players = players;
            this.input = null;
            this.callback = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }
      totalPuntos() {
            let total = 0;
            for (let i = 0; i < this.players.length; i++) {
                  total = total + this.players[i].score;
            }
            return total;
      }
      totalJugadores() {
            return this.players.length;
      }
      agregarJugador(nombre) {
            if(nombre.value != ""){
            this.players.push({
                  name: nombre.value,
                  score: 0,
                  id: Utils.uuid()
            });
            this.input.value = "";
            this.notify();}
      }
      modificarScore(e, score, index, x) {
            this.players[index].score = score + x;
            this.notify();
      }
}

const Application = ({ title, model }) => {
      console.log(model.players)
      let header = (
            <div className="header">
            <div className="stats">
                    <div className="col">
                        <label>Players:</label>
                        <label>{model.totalJugadores()}</label>
                    </div>
                    <div className="col">
                        <label>Total Points:</label>
                        <label>{model.totalPuntos()}</label>
                    </div>
            </div>
            <h1>Scoreboard</h1>
            <Timer />
        </div> );
      let playerList = model.players.map((elemento, index) => {
            return (
            <div className="player" key={index}>
                <div className="player-name">{elemento.name}</div>
                <div className="player-score">
                    <div className="counter">
                        <button className="counter-action decrement" onClick={e => { model.modificarScore(e, elemento.score, index, -1) }}>-</button>
                        <div className="counter-score">{elemento.score}</div>
                        <button className="counter-action increment" onClick={e => { model.modificarScore(e, elemento.score, index, -1) }}>+</button>
                    </div>
                </div>
            </div>);
      });
      let playerForm = (<form onSubmit={e => {
            e.preventDefault();
            model.agregarJugador(model.input);
      }}>
                  <input type="text" onChange={e => (model.input = e.target)} className="form-control" placeholder="enter a name" />
                  <button type="submit">Add Player</button>
            </form>);
      return (<div className="scoreboard">
            {header}
            <div className="players">{playerList} </div>
            <div className="add-player-form">{playerForm}</div>
      </div>
      );
}
const PLAYERS = [
      {
            name: "Jim Hoskins",
            score: 31,
            id: 1,
      },
      {
            name: "Andree Hoskins",
            score: 35,
            id: 2,
      },
      {
            name: "Alena Hoskins",
            score: 42,
            id: 3,
      },
];

let model = new Model(PLAYERS);
let counter = 1;

let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <Application title="Player" model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);

render(); 