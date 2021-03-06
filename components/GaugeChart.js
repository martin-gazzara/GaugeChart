import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const indicatorWidth = 2; // indicators's width in degrees;
const totalArchWidth = 270; // this represents the total arch width as degrees,
const valueColor = '#55a4b1';
const emptyColor = '#e5e5e5';
const indicatorColor = '#000'; 

const setDegrees = (percentage) => {
  return percentage * totalArchWidth / 100;
}


const GaugeChart = ({data, title}) => {
  const { currentPercentage, targetPercentage } = data;
  
  let current, toTarget, excess, remaining;
  const diffToTarget = currentPercentage - targetPercentage;

  // Now we transform percentages to degrees
  if (diffToTarget < 0 ){ // we don't reach to target value
    current = setDegrees(currentPercentage);
    toTarget = setDegrees(Math.abs(diffToTarget));
    excess = 0;
    remaining = totalArchWidth - indicatorWidth - current - toTarget;
  }else if (diffToTarget > 0){ // we are exceeded from indificated target
    current = setDegrees(targetPercentage);
    toTarget = 0;
    excess = setDegrees(Math.abs(diffToTarget));
    remaining = totalArchWidth - excess - indicatorWidth - current;
  }else {  // we reached the target value!
    toTarget = 0;
    excess = 0;
    current = setDegrees(targetPercentage);
    remaining = totalArchWidth - indicatorWidth - current;
  }
  return(
    100 >= currentPercentage ? 
    <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#000'}}>
      <Text style={{position: 'absolute', fontSize: 20}}>{currentPercentage}%</Text>
      <VictoryPie
        width={250}
        height={250}
        labels={({datum}) => datum.label}
        startAngle={- ( totalArchWidth / 2)}
        endAngle={totalArchWidth / 2}
        cornerRadius={1}
        innerRadius={({datum}) => {
          if (datum.x === 'Indicator'){
            return 85
          }else{
            return 90
          }
        }} 

        radius={({ datum }) => {
          if (datum.x === 'Indicator'){
            return 120
          }else{
            return 115
          }
        }}

        data={[
          { x: "Current Value", y: current, label: null },
          { x: "Space", y: current > 0 && (targetPercentage > currentPercentage) ? 1 : 0, label: null},  
          { x: "Value to target", y: toTarget, label: null},
          { x: "Indicator", y: indicatorWidth, label: null},
          { x: "Excess value", y: excess, label: null}, 
          { x: "Space", y: excess > 0 && (100 !== currentPercentage)? 1 : 0, label: null},
          { x: "Remaining value", y: remaining, label: null },
        ]}
        colorScale={[valueColor, 'transparent', emptyColor, indicatorColor, valueColor, 'transparent', emptyColor]}
      />
      <Text>{title}</Text>
    </View> : 
    <View>
      <Text>Review the props!</Text>
    </View>
  )
}

export default GaugeChart;