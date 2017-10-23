const deepdive = [
    {
      answer: 'Which is the oldest airline in the world?',
      opciones: { A: 'Avianca', B: 'KLM', C: 'Qantas' },
      result: 'KLM',
      image: 'assets/image/plane.svg'
    },
    {
      answer: 'Which is the largest port in the world?',
      opciones: { A: 'Port of Shanghai', B: 'Port of Singapore', C: 'Port of Rotterdam' },
      result: 'Port of Shanghai',
      image: 'assets/image/bote.svg'
    },
    {
      answer: 'What is the longest distance cycling backwards?',
      opciones: { A: '89.30 km', B: '675.10 km', C: '337.60 km' },
      result: '337.60 km',
      image: 'assets/image/bici.svg'
    },
    {
      answer: 'What is the highest speed ever reached by a school bus?',
      opciones: { A: '590 km/h', B: '320 km/h', C: '245 km/h' },
      result: '590 km/h',
      image: 'assets/image/bus.svg'
    },
    {
      answer: 'What is the longest car trip on one tank of gas?',
      opciones: { A: '2617 km', B: '3568 km', C: '1732 km' },
      result: '2617 km',
      image: 'assets/image/car.svg'
    }
  ]
  
  class Model {
    constructor(deepdive) {
      this.deepdive = deepdive;
      this.select = true;
      this.score = 0;
      this.results = [];
      this.result = 0;
      this.total = false;
      this.checkCompare = false;
    }

    guardarresult(value) {
      if (this.select) {
        this.select = false;
        this.results[this.score] = value;
        let t = setTimeout(() => {
          this.select = true;
          this.next();
        }, 100);
      }
      this.notify();
    }
  
    next() {
      if (this.score === this.deepdive.length - 1) {
        this.total = true;
      }
      this.score++;
      this.notify();
    }
    previous() {
      if (this.score === this.deepdive.length) {
        this.total = false;
      }
      this.score--;
      this.notify();
    }
    checkResult() {
      this.checkCompare = true;
      this.result = this.results.filter((item, index) => item == this.deepdive[index].result).length;
      this.notify();
    }
    reiniciar() {
      this.score = 0;
      this.results = [];
      this.result = 0;
      this.total = false;
      this.checkCompare = false;
      this.notify();
    }
    subscribe(render) {
      this.render = render;
    }
    notify() {
      this.render();
    }
  }
  
  const redes = () => {
    return (
      <div id="redes" className="text-center">
        <a href="" className="fa-stack fa-lg" style={{ color:'rgba(37, 206, 253, 0.99)' }}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
        </a>
        <a href="" className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x" style={{ color: '#blue' }}></i>
          <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
        </a>
        <a href="" className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x" style={{ color: 'red' }}></i>
          <i className="fa fa-google-plus fa-stack-1x fa-inverse"></i>
        </a>
      </div>
    );
  }
  
  const Opciones = ({ model, opciones }) => {
    return (
      <div className="opciones row">
        {Object.keys(opciones).map((key, index) => {
          let value = opciones[key];
          return (
            <div className={model.results[model.score] == value ? 'col-md-4 seleccionado' : 'col-md-4'}>
              <button className='btn' key={index} onClick={(e) => model.guardarresult(value)}><span className='abcOptions'>{key}</span>{value}</button>
            </div>
          );
        })}
      </div>
    );
  }
  
  const Creardeepdive = ({ model }) => {
    return (
      <div>
        <h1 className="text-center"> {model.deepdive[model.score].answer} </h1>
        <Opciones model={model} opciones={model.deepdive[model.score].opciones} />
      </div>
    );
  }
  
  const Listarresults = ({ model }) => {
    let expresion = model.result ? (model.result === model.deepdive.length ? 'Wow, ' : '') : 'Ooops, ';
    return (
      <div id='results'>
        <h1 className="text-center">
          {!model.checkCompare && 'Here are you answers:'}
          {model.checkCompare && expresion + model.result + ' out of ' + model.deepdive.length + ' correct!'}
        </h1>
        {
          model.results.map((item, index) => {
            let clase = model.checkCompare ? (item == model.deepdive[index].result ? 'text-success' : 'text-danger') : '';
            let contenido = clase == 'text-danger' ? <strong><strike>{item}</strike> {model.deepdive[index].result}</strong> : <strong>{item}</strong>;
            return <p className={clase}>{index + 1}. {model.deepdive[index].answer} {contenido}</p>;
          })
        }
        <div className='text-center'>
          {model.checkCompare && <button className='btn-lg btn-dark' onClick={() => model.reiniciar()}>Start Again</button>}
          {!model.checkCompare && <button className='btn-lg btn-dark' onClick={() => model.checkResult()}>Submit</button>}
        </div>
  
      </div>
    );
  }
  
  const App = ({ model }) => {
    return (
      <div className="container">
        <header className="text-center">
          {!model.total && <img src={model.deepdive[model.score].image} />}
          {model.total && <img src="assets/image/track.svg" />}
        </header>
        <div className="content">
          {!model.checkCompare &&
            <div id="progress">
              <div className="progress-label">
                {model.results.length} of {model.deepdive.length} answered
            </div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.results.length * 20 + '%', height: '5px' }}>
                </div>
              </div>
            </div>
          }
          <div id="quiz">
            {!model.total && <Creardeepdive model={model} />}
            {model.total && <Listarresults model={model} />}
          </div>
          <redes />
        </div>
        {!model.checkCompare && model.results.length != 0 &&
          <div id="flechas" className="text-center">
            <button id="previous" className={model.results.length >= model.score && model.marcar && model.score ? 'btn' : "btn disabled"} onClick={() => model.previous()}>
              <img className="img-responsive" src="assets/image/left.svg" alt="" />
            </button>
            <button id="next" className={model.results.length > model.score & model.marcar ? 'btn' : "btn disabled"} onClick={() => model.siguiente()}>
              <img className="img-responsive" src="assets/image/right.svg" alt="" />
            </button>
          </div>
        }
      </div>);
  }
  
  let model = new Model(deepdive);
  let render = () => {
    ReactDOM.render(
      <App model={model} />,
      document.getElementById('container')
    );
  };
  
  model.subscribe(render);
  render(); 