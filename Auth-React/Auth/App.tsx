import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
} from 'react-native-vision-camera';
import { useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';

function App() {
  const device = useCameraDevice('back');

  const [permissionStatus, setPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const [fps, setFps] = useState(0);
  const lastFrameTimeRef = useRef(Date.now());

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const now = Date.now();
    const delta = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    const calculatedFps = 1000 / delta;
    runOnJS(setFps)(Math.round(calculatedFps));
  }, []);

  useEffect(() => {
    async function getPermission() {
      const status = await Camera.getCameraPermissionStatus();
      if (
        status === 'not-determined' ||
        status === 'denied' ||
        status === 'restricted'
      ) {
        const newStatus = await Camera.requestCameraPermission();
        setPermissionStatus(newStatus);
      } else {
        setPermissionStatus(status);
      }
    }
    getPermission();
  }, []);

  if (permissionStatus === 'denied') {
    return (
      <View style={styles.center}>
        <Text>Camera permission denied. Please enable it from settings.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>No camera device found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
      <View style={styles.fpsContainer}>
        <Text style={styles.fpsText}>FPS: {fps}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fpsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 5,
  },
  fpsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
