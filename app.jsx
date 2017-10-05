class Timer extends React.Component {
      constructor(props) {
            
            super(props);
            this.state = {
                  button : false,
                  date: new Date(), 
                  numero: 0
            }
      }
      render() {
            // const { title } = this.props;
            // const start = (e) => {
            //       this.startTimer();
            // }
            // const stop = (e) => {
            //       this.stopTimer();
            // }
            return (<div className="col col-xl-4 col-sm-4">
            <p>StopWath</p>
            <p>{this.state.date.toLocaleTimeString()}</p>
            {this.state.button ?
                  <button onClick={e => this.stopTimer(e)}>Stop</button>
                  :
                  <button onClick={e => this.startTimer(e)}>Start</button>
            }
            <button>reset</button>
      </div>
            );
      }
      
      // componentDidMount
      startTimer() {
            this.setState({
                  button: true,
                });
            this.timer = setInterval(() => {
                  this.setState({
                        date: new Date(),
                        numero: this.state.numero + 1
                  });
            }, 1000);
      }
      //componentWillUnmount
      stopTimer() {
            this.setState({
                  button: false,
                });
            clearInterval(this.timer);
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
            console.log(nombre);
            this.players.push({
                  name: nombre.value,
                  score: 0,
                  id: Utils.uuid()
            });
            this.notify();
      }
      modificarScore(e, score, index, x) {
            this.players[index].score = score + x;
            this.notify();
      }
}

const Application = ({ title, model }) => {
      console.log(model.players)
      let header = (<div className="row">
            <div className="col col-xl-8">
                  <div className="row">
                        <div className="col col-xl-3 col-sm-3">
                              <p>Players: </p>
                              <p>Total Points: </p>
                        </div>
                        <div className="col col-xl-3 col-sm-3">
                              <p> {model.totalPuntos()} </p>
                              <p> {model.totalJugadores()} </p>
                        </div>
                  </div>
            </div>
            < Timer />
      </div>);
      let playerList = model.players.map((elemento, index) => {
            return (<div className="row text-center" key={index}>
                  <div className="col col-xl-8 col-sm-8">{elemento.name}</div>
                  <div className="col col-xl-1 col-sm-1 "><button onClick={e => { model.modificarScore(e, elemento.score, index, -1) }}> - </button></div>
                  <div className="col col-xl-2 col-sm-2">{elemento.score}</div>
                  <div className="col col-xl-1 col-sm-1"><button onClick={e => { model.modificarScore(e, elemento.score, index, 1) }}> + </button></div>
            </div>);
      });
      let playerForm = (<form className="add-player-form" onSubmit={e => {
            e.preventDefault();
            model.agregarJugador(model.input);
      }}><div className="row">
                  <div className="col col-xl-8 col-sm-8">
                        <input type="text" onChange={e => (model.input = e.target)} className="form-control" placeholder="enter a name" /></div>
                  <div className="col col-xl-4 col-sm-4"><button type="submit">Add Player</button></div>
            </div></form>);
      return (<div className="scoreboard">
            {header}
            {playerList}
            {playerForm}
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