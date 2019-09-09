import React from 'react';
import { View, Text } from 'react-native';
import GaugeChart from './components/GaugeChart';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GaugeChart data={{
        current_value: 400,
        target_value: 300,
        final_value: 420
      }}/>
      <GaugeChart data={{
        current_value: 199,
        target_value: 300,
        final_value: 420
      }}/>
    </View>
  )
}

export default App;