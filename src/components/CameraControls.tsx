import React from 'react';
import { View } from 'react-native';
import { Switch, Text, Slider } from 'react-native-paper';

interface Props {
  iso: number;
  setIso: (v: number) => void;
  isoAuto: boolean;
  setIsoAuto: (v: boolean) => void;
  shutter: number;
  setShutter: (v: number) => void;
  focus: number;
  setFocus: (v: number) => void;
}

export default function CameraControls({
  iso,
  setIso,
  isoAuto,
  setIsoAuto,
  shutter,
  setShutter,
  focus,
  setFocus,
}: Props) {
  return (
    <View>
      <Text>ISO {isoAuto ? '(Auto)' : iso}</Text>
      <Switch value={isoAuto} onValueChange={setIsoAuto} />
      {!isoAuto && <Slider value={iso} onValueChange={setIso} minimumValue={100} maximumValue={1600} />}
      <Text>Shutter {shutter.toFixed(0)} ms</Text>
      <Slider value={shutter} onValueChange={setShutter} minimumValue={1} maximumValue={1000} />
      <Text>Focus {focus.toFixed(2)}</Text>
      <Slider value={focus} onValueChange={setFocus} minimumValue={0} maximumValue={1} />
    </View>
  );
}
