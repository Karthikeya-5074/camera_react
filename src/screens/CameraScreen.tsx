import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { IconButton } from 'react-native-paper';
import CameraControls from '../components/CameraControls';
import { ensureDir, generateFilename } from '../utils/fileStorage';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function CameraScreen() {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [isRecording, setIsRecording] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isoAuto, setIsoAuto] = useState(true);
  const [iso, setIso] = useState(100);
  const [shutter, setShutter] = useState(1);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermission();
      const mic = await Camera.requestMicrophonePermission();
      await ensureDir();
    })();
  }, []);

  const takePhoto = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePhoto({ flash });
    const dest = generateFilename('jpg');
    await RNFS.moveFile(photo.path, dest);
  };

  const startRecording = async () => {
    if (!camera.current) return;
    setIsRecording(true);
    const dest = generateFilename('mp4');
    await camera.current.startRecording({
      flash,
      onRecordingFinished: async (video) => {
        await RNFS.moveFile(video.path, dest);
        setIsRecording(false);
      },
      onRecordingError: (err) => console.warn(err),
    });
  };

  const stopRecording = () => {
    camera.current?.stopRecording();
  };

  if (!device) return null;
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
        video
        flash={flash}
        iso={!isoAuto ? iso : undefined}
        exposure={!isoAuto ? undefined : shutter}
        focusDepth={focus}
      />
      <View style={styles.controls}>
        <IconButton
          icon={flash === 'off' ? 'flash-off' : flash === 'on' ? 'flash' : 'flash-auto'}
          onPress={() =>
            setFlash(flash === 'off' ? 'on' : flash === 'on' ? 'auto' : 'off')
          }
        />
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <IconButton icon={isRecording ? 'stop' : 'record-rec'} />
        </TouchableOpacity>
        <IconButton icon="camera" onPress={takePhoto} />
      </View>
      <CameraControls
        iso={iso}
        setIso={setIso}
        isoAuto={isoAuto}
        setIsoAuto={setIsoAuto}
        shutter={shutter}
        setShutter={setShutter}
        focus={focus}
        setFocus={setFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
