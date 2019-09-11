import React from 'react';
import { View, Text } from 'react-native';
import GaugeChart from './components/GaugeChart';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GaugeChart title='Title' data={{
        currentPercentage: 100,
        targetPercentage: 65
      }}/>
    </View>
  )
}

export default App;