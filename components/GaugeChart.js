import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const indicatorWidth = 2; // indicators's width in degrees;
const totalArchWidth = 220; // this represents the total arch width,
const valueColor = '#55a4b1';
const emptyColor = '#e5e5e5';
const indicatorColor = '#000'; 

const setDegrees = (percentage) => {
  return percentage * totalArchWidth / 100;
}


const GaugeChart = ({data}) => {
  const { current_value, target_value, final_value } = data;
  
  // Transforming values as percentages
  const currentValuePercentage = current_value * 100 / final_value;
  const targetValuePercentage = target_value * 100 / final_value;

  let current, toTarget, excess, remaining;
  const diffToTarget = currentValuePercentage - targetValuePercentage;

  // Now we transform percentages to degrees
  if (diffToTarget < 0 ){ // we don't reach to target value
    current = setDegrees(currentValuePercentage);
    toTarget = setDegrees(Math.abs(diffToTarget));
    excess = 0;
    remaining = totalArchWidth - indicatorWidth - current - toTarget;
  }else if (diffToTarget > 0){ // we are exceeded from indificated target
    current = setDegrees(targetValuePercentage);
    toTarget = 0;
    excess = setDegrees(Math.abs(diffToTarget));
    remaining = totalArchWidth - excess - indicatorWidth - current;
  }else {  // we reached the target value!
    toTarget = 0;
    excess = 0;
    current = setDegrees(targetValuePercentage);
    remaining = totalArchWidth - indicatorWidth - current;
  }
  return(
    final_value >= current_value ? 
    <VictoryPie
      labels={({datum}) => datum.label}
      startAngle={- ( totalArchWidth / 2)}
      endAngle={totalArchWidth / 2}
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
        { x: 'Value to target', y: toTarget, label: null},
        { x: "Indicator", y: indicatorWidth, label: null},
        { x: "Excess value", y: excess, label: null}, 
        { x: "Remaining value", y: remaining, label: null },
      ]}
      colorScale={[valueColor, emptyColor, indicatorColor, valueColor, emptyColor]}
    /> : 
    <View>
      <Text>Review the props!</Text>
    </View>
  )
}

export default GaugeChart;