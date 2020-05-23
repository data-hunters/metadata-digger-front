import { GraphState, GraphType, GRAPH_TYPES } from "./types";
import React, { FC } from 'react';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryTooltip } from 'victory';

interface GraphContainerProps {
    graphState: GraphState;
    changeType: (graphName: GraphType) => void;
}


const GraphContainer: FC<GraphContainerProps> = (props) => {
    
    let stringToGraphType = (str: String): GraphType => {
        if(str === "tag_names") return "tag_names"
        else if (str === "directory_names") return "directory_names"
        else if(str === "labels") return "labels"
        else if(str === "file_type") return "file_type"
        else if(str === "md_exif_ifd0_model") return "md_exif_ifd0_model"
        else throw new Error("String" + str + "is not a GraphType")
    }

    const dataForChart = Object.keys(props.graphState.values).map(key => {
        const value = props.graphState.values[key];
        return { y: value, label: key };
    })
    return(
        <div>
            <select value={props.graphState.graphType} onChange={ e => props.changeType(stringToGraphType(e.target.value))} >
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