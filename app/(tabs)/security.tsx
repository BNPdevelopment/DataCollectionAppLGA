import { Button } from "@react-navigation/elements";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Security = () => {
  /*NOTE:
    We will need 
    - Start time , stop time, people count (normally 1)

    */

  const [firstPeople, setFirstPeople] = useState(1); // note: this will normally be 1, but can change if there's escort or other reason.
  const [firstStartTime, setFirstStartTime] = useState<Date | null>(null);
  const [firstEndTime, setFirstEndTime] = useState<Date | null>(null);

  const [secondPeople, setSecondPeople] = useState(1); // note: this will normally be 1, but can change if there's escort or other reason.
  const [secondStartTime, setSecondStartTime] = useState<Date | null>(null);
  const [secondEndTime, setSecondEndTime] = useState<Date | null>(null);

  const handleFirstStart = () => {
    setFirstStartTime(new Date());
  };

  const handleSecondStart = () => {
    setSecondStartTime(new Date());
  };

  const handleFirstEnd = async () => {
    const end = new Date();
    setFirstEndTime(end);

    const row = {
      Door: 1,
      startTime: firstStartTime,
      endTime: firstEndTime,
      people: firstPeople,
    };

    const csvRow = `${row.Door},${row.startTime},${row.endTime},${row.people}\n`;

    try {
      const path = `${FileSystem.documentDirectory}security_log.csv`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      let existingContent = "";

      if (fileInfo.exists) {
        existingContent = await FileSystem.readAsStringAsync(path);
      } else {
        existingContent = "Door,Start Time,End Time,People\n";
      }
      const updatedContent = existingContent + csvRow;

      await FileSystem.writeAsStringAsync(path, updatedContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("data saved successfully");
    } catch (error) {
      console.error("Failed to save CSV", error);
    }
  };

  const handleSecondEnd = async () => {
    const end = new Date();
    setSecondEndTime(end);

    const row = {
      Door: 2,
      startTime: secondStartTime,
      endTime: secondEndTime,
      people: secondPeople,
    };

    const csvRow = `${row.Door},${row.startTime},${row.endTime},${row.people}\n`;

    try {
      const path = `${FileSystem.documentDirectory}security_log.csv`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      let existingContent = "";

      if (fileInfo.exists) {
        existingContent = await FileSystem.readAsStringAsync(path);
      } else {
        existingContent = "Door,Start Time,End Time,People\n";
      }
      const updatedContent = existingContent + csvRow;

      await FileSystem.writeAsStringAsync(path, updatedContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("data saved successfully");
    } catch (error) {
      console.error("Failed to save CSV", error);
    }
  };

  const onChangeFirstPeople = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setFirstPeople(parsedValue);
    } else if (newValue === "") {
      setFirstPeople(0);
    } else {
      console.log("not a number");
    }
  };

  const onChangeSecondPeople = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setSecondPeople(parsedValue);
    } else if (newValue === "") {
      setSecondPeople(0);
    } else {
      console.log("not a number");
    }
  };

  const onShare = async () => {
    const file = `${FileSystem.documentDirectory}security_log.csv`;

    const fileInfo = await FileSystem.getInfoAsync(file);
    if (!fileInfo.exists) {
      console.log("file doesnt exist");
      return;
    }
    try {
      await Sharing.shareAsync(file);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> </Text>
      <Text style={styles.text}> </Text>
      <Text style={styles.text}>This is the security tracking page!</Text>
      <Text style={styles.text}>First People: </Text>
      <Button onPress={handleFirstStart}>Start</Button>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeFirstPeople}
        value={String(firstPeople)}
      />
      <Button onPress={handleFirstEnd}>End</Button>
      <Text style={styles.text}>Second People: </Text>
      <Button onPress={handleSecondStart}>Start</Button>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeSecondPeople}
        value={String(secondPeople)}
      />
      <Button onPress={handleSecondEnd}>End</Button>
      <Text style={styles.text}>Share: </Text>
      <Button onPress={onShare}>Share</Button>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "gray",
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
});
