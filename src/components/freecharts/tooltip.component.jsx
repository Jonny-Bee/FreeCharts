
import './tooltip.css'
const ToolTip = (props) => {

    return(
        <>
        <div id='bar_tip' className={` position-abs block ${props.visible ? '' : 'hidden'}`}>
        {props.data.name} : {props.data.value}
        </div>
        </>
    )
}

export default ToolTip;