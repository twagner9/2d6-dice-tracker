import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label: string;
  slopValue?: number;
  onPress?: () => void;
  enabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

// For now this is pulled from the demo project; really this component will probably have its scope limited to the
export default function Button({
  label,
  slopValue,
  onPress,
  enabled = true,
  containerStyle,
  buttonStyle,
  labelStyle,
}: Props) {
  // Theme for the primary button; by passing the theme as a prop, it will automatically
  // style the button based on the selected theme, passed from the actual location that
  // the button will be used. Good for making buttons with a variety of themes (will need
  // for the catan app).

  // Default theme
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable
        style={[styles.button, !enabled && styles.disabledButton, buttonStyle]}
        onPress={onPress}
        hitSlop={slopValue}
        pressRetentionOffset={{ top: 10, left: 10, right: 10, bottom: 10 }} // Allows the user's finger to move a bit without deregistering the click
      >
        <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#ffd33d",
    backgroundColor: "#7590b32e",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  disabledButton: {
    opacity: 0.3,
  },
});
