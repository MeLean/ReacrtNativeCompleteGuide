import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);

  function saveGoalState(state) {
    setEnteredGoal(state);
  }

  function saveGoalToList() {
    setGoals(goals => [
      ...goals,
      { id: new Date().getTime().toString(), value: enteredGoal }
    ]);
    setEnteredGoal("");
  }

  function updateGoals(newGoals) {
    setGoals(newGoals);
  }

  function deleteGoal(goal) {
    console.log("goals: " + goals);
    console.log("goal: " + goal.value);
    var arr = goals;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === goal) {
        console.log("goal found: " + goal.value);
        arr.splice(i, 1);
      }
    }

    updateGoals(arr);
  }

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Goal"
          value={enteredGoal}
          style={styles.inputField}
          onChangeText={saveGoalState}
        />
        <Button title="ADD" color="#6a6d6e" onPress={saveGoalToList} />
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id} // uses only if no property key is presented
        data={goals}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Text onPress={() => deleteGoal(itemData.item)}>
              {itemData.item.value}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 18
  },
  inputContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputField: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 5,
    marginBottom: 10
  },
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10
  }
});
