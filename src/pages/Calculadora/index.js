import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'center' },
  viewLegenda: { paddingTop: 20 },
  legenda: { textAlign: 'center', fontWeight: 'bold', fontSize: 22 }, // imc
  viewResultado: {
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    padding: 8,
  },
  resultado: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  diagnostico: {
    fontSize: 22,
  },
  viewInputs: { alignItems: 'center' },
  peso: {
    width: 140,
    marginVertical: 10,
    fontSize: 22,
  },
  altura: {
    width: 140,
    marginVertical: 10,
    fontSize: 22,
  },
  calcular: {
    width: '100%',
    marginVertical: 30,
    fontSize: 100,
  },
});

export default function Calculadora() {
  const [peso, setPeso] = useState('');
  const [legenda, setLegenda] = useState('Indeterminado');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('0');
  const [color, setColor] = useState('#bdc3c7');
  function calcularImc() {
    const resu = (peso / (altura * altura)).toFixed(1);
    setResultado(resu);
    if (resu < 18.5) {
      setLegenda('Magreza');
      setColor('#e74c3c');
    } else if (resu >= 18.5 && resu < 25) {
      setLegenda('Normal');
      setColor('#2ecc71');
    } else if (resu >= 25 && resu < 30) {
      setLegenda('Sobrepeso');
      setColor('#f1c40f');
    } else if (resu >= 30 && resu < 40) {
      setLegenda('Obesidade');
      setColor('#e67e22');
    } else if (resu >= 40) {
      setLegenda('Obesidade Morbida');
      setColor('#e74c3c');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewLegenda}>
        <Text style={styles.legenda}>Seu IMC</Text>
      </View>
      <View style={[styles.viewResultado, { backgroundColor: color }]}>
        <Text style={styles.resultado}>{resultado}</Text>
        <Text style={styles.diagnostico}>{legenda}</Text>
      </View>

      <View style={styles.viewInputs}>
        <TextInput
          label="Peso"
          style={styles.peso}
          value={peso.replace(',', '.')}
          onChangeText={setPeso}
        />
        <TextInput
          label="Altura"
          style={styles.altura}
          value={altura.replace(',', '.')}
          onChangeText={setAltura}
        />

        <Button mode="contained" style={styles.calcular} onPress={calcularImc}>
          Calcular
        </Button>
      </View>
    </View>
  );
}
