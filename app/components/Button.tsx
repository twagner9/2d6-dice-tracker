import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
};

// For now this is pulled from the demo project; really this component will probably have its scope limited to the
export default function Button({ label, theme, onPress }: Props) {
  // Theme for the primary button; by passing the theme as a prop, it will automatically
  // style the button based on the selected theme, passed from the actual location that
  // the button will be used. Good for making buttons with a variety of themes (will need
  // for the catan app).
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === "clear") {
    return (
      <View style={[styles.buttonContainer, { backgroundColor: "#fff" }]}>
        <Pressable style={styles.clearButton} onPress={onPress}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Default theme
  return (
    <View style={[styles.buttonContainer, { backgroundColor: "#fff" }]}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        hitSlop={12} // Allows the user to be slightly less precise when pressing
        pressRetentionOffset={{ top: 10, left: 10, right: 10, bottom: 10 }} // Allows the user's finger to move a bit without deregistering the click
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 25,
    height: 25,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  clearButton: {},
});
