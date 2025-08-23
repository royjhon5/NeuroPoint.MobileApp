import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import useStudentChangePassword from "../../../../libs/hooks/useStudentChangePassword";

const ChangePassword = () => {
  const theme = useTheme();
  const { isPending, isSuccess, onSubmit, handleSubmit, errors, control } =
    useStudentChangePassword();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <View
      style={{
        padding: 16,
        maxWidth: 400,
        width: "100%",
        alignSelf: "center",
        gap: 16,
      }}
    >
      {isSuccess && (
        <Text
          style={{
            color: theme.colors.primary,
            backgroundColor: "#d4edda",
            padding: 10,
            borderRadius: 4,
          }}
        >
          Password changed successfully. You can now use your new password to
          log in.
        </Text>
      )}

      {/* New Password Field */}
      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="New Password"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            }
            error={!!errors.newPassword}
          />
        )}
      />
      {errors.newPassword && (
        <HelperText type="error">{errors.newPassword.message}</HelperText>
      )}

      {/* Confirm Password Field */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm Password"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            }
            error={!!errors.confirmPassword}
          />
        )}
      />
      {errors.confirmPassword && (
        <HelperText type="error">{errors.confirmPassword.message}</HelperText>
      )}

      <Button
        mode="contained"
        loading={isPending}
        disabled={isPending}
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 8, backgroundColor: "blue" }}
      >
        Submit
      </Button>
    </View>
  );
};

export default ChangePassword;
