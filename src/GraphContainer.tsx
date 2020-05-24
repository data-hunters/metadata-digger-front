import { GraphState, GraphType, GRAPH_TYPES } from "./types";
import React, { FC } from 'react';
import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';

interface GraphContainerProps {
    graphState: GraphState;
    changeType: (graphName: GraphType) => void;
}


const GraphContainer: FC<GraphContainerProps> = (props) => {
    const dataForChart = Object.keys(props.graphState.values).map(key => {
        const value = props.graphState.values[key];
        return { y: value, label: key };
    })

    return(
        <div>
            <select value={props.graphState.graphType} onChange={ e => props.changeType(e.target.value as GraphType)} >
                {GRAPH_TYPES.map( (gt) => {
                    return <option value={gt} key={gt}>{gt}</option>
                } )}
            </select>
            <h4>{props.graphState.graphType}</h4>
            <VictoryPie
                data={dataForChart}
                labelComponent={<VictoryTooltip/>}
                innerRadius={68} labelRadius={100}
                theme={VictoryTheme.material}
            />
        </div>

    )
}

export default GraphContainer;