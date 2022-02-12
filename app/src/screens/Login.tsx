import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { TextInput, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import { useHistory } from "react-router-native";
import * as yup from "yup";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { API_URI } from "../tools/constants";
import { save } from "../tools/store";

export const Login = () => {
  const router = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userContext = useContext(UserContext);

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const login = async (v: { email: string; password: string }) => {
    try {
      setLoading(true);
      const data = await (await axios.post(`${API_URI}/login`, { email: v.email, password: v.password })).data;
      userContext.setUser(data.user);
      await save("token", data.access_token);
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
      if (!error) router.push("/");
    }
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <Text size={22} style={styles.textBold}>
          {" "}
          Welcome !
        </Text>
        <Text size={16} color="rgba(255, 255, 255, 0.4)" style={styles.text}>
          Please sign in your account{" "}
        </Text>
      </View>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: (router.location.state as any)?.email || "", password: "" }}
        onSubmit={login}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />

            {errors.email && touched.email && (
              <Text size={14} color="#FA58B6">
                {errors.email}
              </Text>
            )}

            <TextInput
              placeholder="Password"
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />

            {errors.password && touched.password && (
              <Text size={14} color="#FA58B6">
                {errors.password}
              </Text>
            )}

            {error && (
              <Text size={14} color="#FA58B6">
                Your credentials are incorrect
              </Text>
            )}

            {!loading ? (
              <Button containerStyle={styles.button} onPress={handleSubmit as any} title="Sign in" />
            ) : (
              <Button containerStyle={styles.button} onPress={handleSubmit as any} title="">
                <ActivityIndicator animating size={22} color="#FA58B6" style={{ position: "absolute" }}></ActivityIndicator>
              </Button>
            )}

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text size={16}>Don't have an account yet? </Text>
              <TouchableOpacity onPress={(e) => router.push("/register")}>
                <Text size={16} color="#FA58B6" style={styles.signUp}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  textContainer: {
    marginVertical: Dimensions.get("window").height / 8,
  },

  text: {
    textAlign: "center",
    marginVertical: 6,
  },

  textBold: {
    textAlign: "center",
    marginVertical: 6,
    fontWeight: "bold",
  },

  signUp: {
    fontWeight: "bold",
    marginLeft: 6,
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#11112A",
    width: "75%",
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 16,
    color: "whitesmoke",
  },

  button: {
    width: "75%",
    borderRadius: 16,
    marginTop: Dimensions.get("window").height / 8,
    marginBottom: 25,
  },
});

export default Login;
