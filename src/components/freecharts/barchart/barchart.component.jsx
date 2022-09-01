import { useEffect, useState, useRef, Children } from "react";
import './bar-chart.css';
import ToolTip from "../tooltip.component";

const BarChart = (props) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [bars, setBars] = useState([]);
  const [visibleTool, setVisibleTool] = useState(false);
  const [tipData , setTipData] = useState({});

  const data = props.data;
  const children = Children.toArray(props.children);
  let highValue = 0;

  const updateWidth = () => {
    setWidth(ref.current.offsetWidth);
  };

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    setBars(children.filter((child) => child.type.name === "Bar"));
    window.addEventListener("resize", updateWidth);
  }, []);

  for (var i = 0; i < data.length; i++) {
    for (var j in data[i]) {
     
      if (typeof data[i][j] === "number") {
        if (data[i][j] > highValue) highValue = data[i][j];
        
      }
    }
  }

  highValue = Math.ceil(highValue / 50) * 50;
  let heightScale = (props.height - 100) / highValue;
  let step = highValue / 5;
  let left_padding = 40;
  let chartWidth = width - 50 - left_padding;
  let blockwidth = chartWidth / data.length;
  let barwidth = blockwidth / bars.length;
  let barOffset = barwidth / 2 - (barwidth / 2) * props.barwidth;
  let gridData = [0, step, step * 2, step * 3, step * 4, step * 5];
  
  const show_tip =(e) =>{
    
    setTipData(e);
    setVisibleTool(true);
  }
  const hide_tip = () =>{
    setTipData({});
    setVisibleTool(false);
  }
  document.addEventListener('mousemove', function(e) {
    
    let tip = document.getElementById('bar_tip');
    
    tip.style.left = e.pageX - 60 + 'px';
    tip.style.top = e.pageY -55 + 'px';
  });
  return (
    <>
    <div ref={ref} className='border-solid-grey'>
      {props.title ? <h3 className='pl-2'>{props.title }</h3> : null}
      
      <svg width={width} height={props.height}>
        {data.map((item, count) => {
          return (
            <>
              <rect
                x={blockwidth * count + left_padding}
                y={25}
                width={blockwidth}
                height={props.height - 50}
                fill={count % 2 === 0 ? "#ffffff" : "#eeeeee"}
                fillOpacity={0.3}
              />
              <text
                textAnchor="middle"
                x={blockwidth * count + blockwidth / 2 + left_padding}
                y={50}
                fill="grey"
              >
                {" "}
                {item.label || ""}{" "}
              </text>
            </>
          );
        })}
        <line
          x1={left_padding}
          x2={width - 50}
          y1={props.height - 25}
          y2={props.height - 25}
          stroke="black"
          strokeWidth={0.25}
        />
        {gridData.map((n) => {
          return (
            <>
              <line
                x1={left_padding}
                x2={width - 50}
                y1={props.height - 25 - n * heightScale}
                y2={props.height - 25 - n * heightScale}
                stroke="grey"
                strokeWidth={0.25}
              />
              <text
                textAnchor="end"
                fill="grey"
                transform={`translate(${left_padding - 3},${
                  props.height - 25 + 5 - n * heightScale
                }) rotate(-30)`}
              >
                {" "}
                {n}{" "}
              </text>
            </>
          );
        })}
        {data.map((item, count) => {
          return bars.map((bar, i) => {
            if (item[bar.props.valueId])
              return (
                <>
                  <rect
                  onMouseOver={(e) => show_tip({event:e,value:item[bar.props.valueId],name:bar.props.valueId})}
                  onMouseOut = {hide_tip}
                    x={
                      blockwidth * count +
                      (i * blockwidth) / bars.length +
                      left_padding +
                      barOffset || 0
                    }
                    y={
                      props.height - item[bar.props.valueId] * heightScale - 25 || 0
                    }
                    width={barwidth * (props.barwidth || 1)}
                    height={item[bar.props.valueId] * heightScale || 0}
                    fill={bar.props.color}
                    rx={4}
                  >
                    <animate attributeName='height'  values={`0;${item[bar.props.valueId] * heightScale}`} dur={'.5s'} repeatCount='1' />
                    <animate attributeName='y'  values={`${props.height-25};${props.height - item[bar.props.valueId] * heightScale - 25}`} dur={'.5s'} repeatCount='1' />
                    
                  </rect>
                 
                </>
              );
            return null;
          });
        })}
        <svg x={(width / 2) - (bars.length * 40)} y={props.height - 15} width={width} height={30}>
        {bars.map((bar, i) => {
          return(
            <>
            <rect width={10} height={10} fill={bar.props.color} x={80 * i} y={2}/>
            <text x={(80 * i) + 14} y={12} fill='grey' fontSize='16'>{bar.props.valueId}</text>
            </>
          )
        })}
        </svg>
      </svg>
      
    </div>
    <ToolTip  visible={visibleTool} data={tipData}/>
    </>
  );
};

export default BarChart;
