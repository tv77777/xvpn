import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const servers = [
  { id: 'uk', name: 'United Kingdom', ip: '192.168.1.1' },
  { id: 'ir', name: 'Iran', ip: '192.168.1.2' },
  { id: 'us', name: 'United States', ip: '192.168.1.3' },
];

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    // Simulate saving/loading connection state
    // In a real app, you'd use AsyncStorage or similar
    const savedState = localStorage.getItem('vpnConnected');
    if (savedState === 'true') {
      setIsConnected(true);
    }
  }, []);

  const toggleConnection = () => {
    if (isConnected) {
      // Disconnect logic
      setConnecting(true);
      setTimeout(() => {
        setIsConnected(false);
        setConnecting(false);
        setSpeed(null);
        localStorage.setItem('vpnConnected', 'false');
        Alert.alert('Disconnected', 'You are now disconnected from the VPN.');
      }, 2000);
    } else {
      // Connect logic
      setConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setConnecting(false);
        // Simulate speed test
        setSpeed();
        localStorage.setItem('vpnConnected', 'true');
        Alert.alert('Connected', );
      }, 3000);
    }
  };

  const selectServer = (server) => {
    if (!isConnected) {
      setSelectedServer(server);
      Alert.alert('Server Selected', );
    } else {
      Alert.alert('Cannot Change Server', 'Please disconnect from the VPN before changing servers.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>XVPN</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
        {isConnected && speed && (
          <Text style={styles.speedText}>Speed: {speed}</Text>
        )}
        <Text style={styles.serverText}>Server: {selectedServer.name}</Text>
      </View>

      <TouchableOpacity
        style={[styles.connectButton, isConnected ? styles.disconnectButton : styles.connectButtonActive]}
        onPress={toggleConnection}
        disabled={connecting}
      >
        {connecting ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.buttonText}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.serverSelectionContainer}>
        {servers.map((server) => (
          <TouchableOpacity
            key={server.id}
            style={[
              styles.serverOption,
              selectedServer.id === server.id && styles.selectedServerOption,
            ]}
            onPress={() => selectServer(server)}
            disabled={isConnected}
          >
            <Text style={styles.serverOptionText}>{server.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  speedText: {
    fontSize: 20,
    color: '#a0a0a0',
    marginBottom: 10,
  },
  serverText: {
    fontSize: 20,
    color: '#a0a0a0',
  },
  connectButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61dafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  connectButtonActive: {
    backgroundColor: '#4CAF50', // Green for connect
  },
  disconnectButton: {
    backgroundColor: '#F44336', // Red for disconnect
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  serverSelectionContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  serverOption: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedServerOption: {
    backgroundColor: '#61dafb',
    borderColor: '#61dafb',
  },
  serverOptionText: {
    color: '#fff',
    fontSize: 16,
  },
});
