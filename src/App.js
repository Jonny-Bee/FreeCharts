import './App.css';
import Bar from './components/freecharts/barchart/bar.component';
import BarChart from './components/freecharts/barchart/barchart.component';

function App() {

  let data = [
    {
      label:'Group A',
        a:65,
        b:50,
        c:20,
        d:95,
        e:65
      
    },
    {
      label:'Group B',
        a:120,
        b:50,
        c:40
      
    },
    {
      label:'Group C',
        a:100,
        b:50,
        c:75
      
    },
    {
      label:'Group D',
        a:100,
        b:50,
        c:75
      
    },
    {
      label:'Group E',
        a:100,
        b:50,
        c:75
      
    }
  ];
  return (
    <div className="App">
      <BarChart  width={300} height={400} data={data} barwidth={.9} >
        <Bar color = '#bb5500' valueId = 'a'/>
        <Bar color = '#bb88ff' valueId = 'b'/>
        <Bar color = '#bbccff' valueId = 'c'/>
        <Bar color = '#bbcc00' valueId = 'd'/>
        
       
        
        
      </BarChart>
    </div>
  );
}

export default App;
