import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator, TextInput } from "react-native";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";
import { deleteKey } from "../tools/store";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql/mutations/user/UpdateUser";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import Text from "../components/Text";

const validationSchema = yup.object().shape({
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
    .max(20, ({ max }) => `Password maximum ${max} characters`),
});

type User = {
  email: string;
  fullname: string;
  password?: string;
};

const Account = ({ navigation }: any) => {
  const { user, setUser } = useContext(UserContext);
  const [mutateFunction, { data, loading, error, reset }] = useMutation(UPDATE_USER);

  const logout = async () => {
    await deleteKey("token");
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      reset();
    });

    return unsubscribe;
  }, [navigation]);

  const update = async (v: User) => {
    const data: User = { email: v.email, fullname: v.fullname };

    if (v.password) {
      data.password = v.password;
    }

    try {
      const user = await (await mutateFunction({ variables: { data } })).data.updateUser;

      setUser(user);

      setTimeout(() => {
        logout();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} size={24} numberOfLines={2}>
          Update your informations
        </Text>
      </View>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ fullname: user?.fullname || "", email: user?.email || "", password: "" }}
        onSubmit={update}
        enableReinitialize
      >
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
              placeholder="New Password (optional)"
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
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="Update" />
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
            <Button containerStyle={styles.logout} title="Logout" onPress={logout}></Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 30,
  },

  title: {
    textAlign: "center",
  },

  logout: {
    width: "60%",
    backgroundColor: "#F00100",
    alignSelf: "center",
    borderRadius: 12,
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: window.height / 9,
  },

  input: {
    backgroundColor: "#11112A",
    width: "60%",
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: 16,
    borderRadius: 16,
    color: "whitesmoke",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  button: {
    width: "60%",
    borderRadius: 12,
    marginTop: window.height / 10,
    marginBottom: 25,
  },
});

export default Account;
