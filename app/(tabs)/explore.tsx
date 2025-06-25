import { Button } from "@react-navigation/elements";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const App = () => {
  const [firstElevatorPeople, setFirstElevatorPeople] = useState(1);
  const [firstElevatorCarts, setFirstElevatorCarts] = useState(0);
  const [firstDropOpened, setFirstDropOpened] = useState(false);
  const [firstDropValue, setFirstDropValue] = useState(null);
  const [firstItems, setFirstItems] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]); // prob dont need a state variable for items bc it'll never change but nbd
  const [firstStartTime, setFirstStartTime] = useState<Date | null>(null);
  const [firstEndTime, setFirstEndTime] = useState<Date | null>(null);

  //wave of constants for second constants here...
  const [secondElevatorPeople, setSecondElevatorPeople] = useState(1);
  const [secondElevatorCarts, setSecondElevatorCarts] = useState(0);
  const [secondDropOpened, setSecondDropOpened] = useState(false);
  const [secondDropValue, setSecondDropValue] = useState(null);
  const [secondItems, setSecondItems] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]); // prob dont need a state variable for items bc it'll never change but nbd
  const [secondStartTime, setSecondStartTime] = useState<Date | null>(null);
  const [secondEndTime, setSecondEndTime] = useState<Date | null>(null);

  const onChangeFirstElevatorPeople = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setFirstElevatorPeople(parsedValue);
    } else if (newValue === "") {
      setFirstElevatorPeople(0);
    } else {
      console.log("not a number");
    }
  };

  //adding this component too, no first elevator thing exists rn so its not rly relevant yet.
  const onChangeSecondElevatorPeople = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setSecondElevatorPeople(parsedValue);
    } else if (newValue === "") {
      setSecondElevatorPeople(0);
    } else {
      console.log("not a number");
    }
  };

  const onChangeFirstElevatorCarts = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setFirstElevatorCarts(parsedValue);
    } else if (newValue === "") {
      setFirstElevatorCarts(0);
    } else {
      console.log("not a number");
    }
  };

  //same thing here, second carts const, not using it yet .
  const onChangeSecondElevatorCarts = (newValue: string) => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      setSecondElevatorCarts(parsedValue);
    } else if (newValue === "") {
      setSecondElevatorCarts(0);
    } else {
      console.log("not a number");
    }
  };

  //NOTE: we prob have to label these with firsts and seconds too.
  const firstHandleStart = () => {
    setFirstStartTime(new Date());
  };

  const secondHandleStart = () => {
    setSecondStartTime(new Date());
  };

  const firstHandleEnd = async () => {
    const end = new Date();
    setFirstEndTime(end);

    const row = {
      startTime: firstStartTime?.toISOString(), // to ISOString ***
      endTime: firstEndTime?.toISOString(), // cahnged end to "endTime?". I think this is fine but noting in case of error
      people: firstElevatorPeople,
      carts: firstElevatorCarts,
      queue: firstDropValue,
    };

    const csvRow = `${row.startTime},${row.endTime},${row.people},${row.carts},${row.queue}\n`;

    try {
      const path = `${FileSystem.documentDirectory}elevator1_log.csv`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      let existingContent = "";

      if (fileInfo.exists) {
        existingContent = await FileSystem.readAsStringAsync(path);
      } else {
        existingContent = "Start Time,End Time,People,Carts,Queue\n";
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

  const secondHandleEnd = async () => {
    const end = new Date();
    setSecondEndTime(end);

    const row = {
      startTime: secondStartTime?.toISOString(), // to ISOString ***
      endTime: secondEndTime?.toISOString(), // cahnged end to "endTime?". I think this is fine but noting in case of error
      people: secondElevatorPeople,
      carts: secondElevatorCarts,
      queue: secondDropValue,
    };

    const csvRow = `${row.startTime},${row.endTime},${row.people},${row.carts},${row.queue}\n`;

    try {
      const path = `${FileSystem.documentDirectory}elevator2_log.csv`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      let existingContent = "";

      if (fileInfo.exists) {
        existingContent = await FileSystem.readAsStringAsync(path);
      } else {
        existingContent = "Start Time,End Time,People,Carts,Queue\n";
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

  const onShareFirst = async () => {
    const file = `${FileSystem.documentDirectory}elevator1_log.csv`;

    const fileInfo = await FileSystem.getInfoAsync(file);
    if (!fileInfo.exists) {
      console.warn("file doesnt exist");
      return;
    }
    try {
      await Sharing.shareAsync(file);
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  const onShareSecond = async () => {
    const file = `${FileSystem.documentDirectory}elevator2_log.csv`;

    const fileInfo = await FileSystem.getInfoAsync(file);
    if (!fileInfo.exists) {
      console.warn("file doesnt exist");
      return;
    }
    try {
      await Sharing.shareAsync(file);
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BNP Data Collection</Text>
      <Text style={styles.text}>Elevator 1: </Text>
      <Button onPress={firstHandleStart}>Start</Button>
      <Text style={styles.text}>Number of people: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeFirstElevatorPeople}
        value={String(firstElevatorPeople)}
      />
      <Text style={styles.text}>Cart Count: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeFirstElevatorCarts}
        value={String(firstElevatorCarts)}
      />
      <Text style={styles.text}>Queue?</Text>
      <DropDownPicker
        open={firstDropOpened}
        setOpen={setFirstDropOpened}
        value={firstDropValue}
        setValue={setFirstDropValue}
        items={firstItems} // change value and items to something more specific so it doesnt get confusing in the program . .
        multiple={false}
      />
      <Button onPress={firstHandleEnd}>End</Button>
      <Button onPress={onShareFirst}>Share CSV</Button>

      <Text style={styles.text}>Elevator 2: </Text>
      <Button onPress={secondHandleStart}>Start</Button>
      <Text style={styles.text}>Number of people: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeSecondElevatorPeople}
        value={String(secondElevatorPeople)}
      />
      <Text style={styles.text}>Cart Count: </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeSecondElevatorCarts}
        value={String(secondElevatorCarts)}
      />
      <Text style={styles.text}>Queue?</Text>
      <DropDownPicker
        open={secondDropOpened}
        setOpen={setSecondDropOpened}
        value={secondDropValue}
        setValue={setSecondDropValue}
        items={secondItems} // change value and items to something more specific so it doesnt get confusing in the program . .
        multiple={false}
      />
      <Button onPress={secondHandleEnd}>End</Button>
      <Button onPress={onShareSecond}>Share CSV</Button>
    </View>
  );
};

export default App;

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
