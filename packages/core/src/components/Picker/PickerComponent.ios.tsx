import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Picker as NativePicker } from "@react-native-community/picker";

import { withTheme } from "../../theming";

import Portal from "../Portal/Portal";
import Button from "../DeprecatedButton";
import TextField from "../TextField";
import Touchable from "../Touchable";
import { PickerComponentProps } from "./PickerTypes";
import { extractStyles } from "../../utilities";
import type { IconSlot } from "../../interfaces/Icon";

const Picker: React.FC<PickerComponentProps & IconSlot> = ({
  Icon,
  style,
  options,
  placeholder,
  selectedValue,
  disabled = false,
  onValueChange = () => {},
  theme: { colors },
  ...props
}) => {
  const {
    viewStyles: {
      borderRadius, // eslint-disable-line @typescript-eslint/no-unused-vars
      borderWidth, // eslint-disable-line @typescript-eslint/no-unused-vars
      borderColor, // eslint-disable-line @typescript-eslint/no-unused-vars
      backgroundColor, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...viewStyles
    },
  } = extractStyles(style);

  const textField = React.useRef<typeof TextField | undefined>(undefined);
  const [pickerVisible, setIsPickerVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsPickerVisible(!pickerVisible);
    // @ts-ignore
    textField.current.toggleFocus(); // cannot determine if method exists due to component being wrapped in a withTheme()
  };

  return (
    <View style={[styles.container, viewStyles]}>
      <Touchable disabled={disabled} onPress={toggleVisibility}>
        <TextField
          {...props}
          value={selectedValue}
          placeholder={placeholder}
          // @ts-ignore
          ref={textField} // cannot determine if ref is of correct type due to component being wrapped in a withTheme()
          disabled={disabled}
          pointerEvents="none"
          style={style}
        />
      </Touchable>
      {pickerVisible && (
        <Portal>
          <View style={[styles.picker, { backgroundColor: colors.divider }]}>
            <SafeAreaView style={styles.pickerContainer}>
              <Button
                Icon={Icon}
                type="text"
                onPress={toggleVisibility}
                style={styles.closeButton}
              >
                Close
              </Button>
              <NativePicker
                selectedValue={selectedValue}
                onValueChange={(value, index) =>
                  onValueChange(value.toString(), index)
                }
              >
                {options.map((o: any) => (
                  <NativePicker.Item
                    label={o.label}
                    value={o.value}
                    key={o.value}
                  />
                ))}
              </NativePicker>
            </SafeAreaView>
          </View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  picker: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  pickerContainer: { flexDirection: "column", width: "100%" },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default withTheme(Picker);
