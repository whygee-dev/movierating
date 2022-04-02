import { Formik } from "formik";
import React from "react";
import { TextInput, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations/user/CreaterUser";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }: any) => {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_USER);

  const registerValidationSchema = yup.object().shape({
    fullname: yup
      .string()
      .min(2, ({ min }) => `Full name must be at least ${min} characters`)
      .max(20, ({ max }) => `Full name maximum ${max} characters`)
      .matches(/(^[A-Za-z]{2,16})([ ]{0,1})([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})/, "Please enter valid name")
      .required("Your fullname is required"),
    email: yup.string().email("Please enter valid email").required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .max(20, ({ max }) => `Password maximum ${max} characters`)
      .required("Password is required"),
  });

  const register = async (v: { email: string; password: string; fullname: string }) => {
    try {
      await mutateFunction({ variables: { data: { fullname: v.fullname, password: v.password, email: v.email } } });

      setTimeout(() => {
        navigation.navigate("Login", { email: v.email });
      }, 1000);
    } catch (error) {}
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <Text size={22} style={styles.textBold}>
          Create an account
        </Text>
        <Text size={16} color="rgba(255, 255, 255, 0.4)" style={styles.text}>
          Please fill in the form to continue
        </Text>
      </View>

      <Formik validationSchema={registerValidationSchema} initialValues={{ email: "", password: "", fullname: "" }} onSubmit={register}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
              style={styles.input}
              onChangeText={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
              value={values.fullname}
            />

            {errors.fullname && touched.fullname && (
              <Text size={14} color="#FA58B6">
                {errors.fullname}
              </Text>
            )}

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

            {errors.password && (
              <Text size={14} color="#FA58B6">
                {errors.password}
              </Text>
            )}

            {error && (
              <View style={{ width: "75%" }}>
                <Text size={14} color="#FA58B6" style={{ textAlign: "center" }}>
                  {error.message || "An unexpected error occured. Sorry for the inconvenience, please try again later."}
                </Text>
              </View>
            )}

            {!loading ? (
              !data ? (
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="Sign up" />
              ) : (
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="">
                  <Ionicons name="md-checkmark-circle" size={22} color="#FA58B6" style={{ position: "absolute" }} />
                </Button>
              )
            ) : (
              <Button containerStyle={styles.button} onPress={handleSubmit as any} title="">
                <ActivityIndicator animating size={22} color="#FA58B6" style={{ position: "absolute" }}></ActivityIndicator>
              </Button>
            )}

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text size={16}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text size={16} color="#FA58B6" style={styles.signIn}>
                  Sign in
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
    marginVertical: Dimensions.get("window").height / 8.5,
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

  signIn: {
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
    paddingVertical: 6,
    fontSize: 16,
    borderRadius: 16,
    color: "whitesmoke",
  },

  button: {
    width: "75%",
    borderRadius: 16,
    marginTop: Dimensions.get("window").height / 9,
    marginBottom: 25,
  },
});

export default Register;
