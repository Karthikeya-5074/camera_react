import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import RNFS from 'react-native-fs';
import { ensureDir } from '../utils/fileStorage';

export default function GalleryScreen() {
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await ensureDir();
      const dir = `${RNFS.ExternalDirectoryPath}/AdvancedCameraApp`;
      const list = await RNFS.readDir(dir);
      setFiles(list.map(f => `file://${f.path}`));
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={files}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)}>
            <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        )}
      />
      <Modal visible={!!selected} onRequestClose={() => setSelected(null)}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelected(null)}>
          {selected && (
            <Image
              source={{ uri: selected }}
              style={{ flex: 1, resizeMode: 'contain' }}
            />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
