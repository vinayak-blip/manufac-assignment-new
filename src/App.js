import './App.css';
import WineData from './components/WineData';
import WineStatsTableWithGamma from './components/WineStatsTableWithGamma';
import { data } from './data';
function App() {
  return (
    <div className="App">
      <WineData data={data} />
      <WineStatsTableWithGamma data={data} />
    </div>
  );
}

export default App;
