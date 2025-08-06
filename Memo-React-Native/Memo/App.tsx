import { useMemo, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

const ExpensiveComponent = () => {
  const sum = () => {
    console.log('Calculating Sum');
    let i = 0;
    for (i = 0; i <= 1000000000; i++) {
      i += 1;
    }

    return i;
  };


  const total = useMemo(() => {
    return sum();
  }, [])

  // const total = sum();

  return <View style = {styles.container}> 
        <Text style = {{color: 'white', fontSize: 18}}>
          sum : {total}
        </Text>
   </View>;
};

function App() {

  const[count, setCount] = useState(0)


  return <View style={styles.container}>

    <ExpensiveComponent/>
    <Button title="Increment" onPress={() => setCount(count + 1)} />
     <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
      Count: {count}
      </Text> 

  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default App;
