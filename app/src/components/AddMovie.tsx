import { Formik } from "formik";
import React, { useState } from "react";
import { Dimensions, View, StyleSheet, TextInput, Image, ActivityIndicator } from "react-native";
import Text from "./Text";
import Button from "./Button";
import * as yup from "yup";
import { POSTER_BASE } from "../tools/constants";
import BackButton from "./BackButton";
import { CREATE_MOVIE } from "../graphql/mutations/movie/CreateMovie";
import { useMutation } from "@apollo/client";
import Ionicons from "react-native-vector-icons/Ionicons";

const ValidationSchema = yup.object().shape({
  review: yup.string().min(10, "Minimum 10 characters").max(250, "Maximum 250 characters").required("A review is required"),
  rating: yup.number().typeError("Must be a number").min(0, "Minimum rating is 0").max(10, "Maximum rating is 10").required("A rating is required"),
});

const AddMovie = ({ route, navigation }: any) => {
  const movie = route?.params?.movie;
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_MOVIE);

  if (!movie || !movie.id) {
    //@ts-ignore
    navigation.navigate("Home");

    return <></>;
  }

  const addMovie = async (v: { rating: string; review: string }) => {
    await mutateFunction({ variables: { data: { rating: +v.rating, review: v.review, tmdbId: movie.id } } });
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  };

  return (
    <View>
      <BackButton navigation={navigation}></BackButton>
      <Formik validationSchema={ValidationSchema} enableReinitialize initialValues={{ rating: "", review: "" }} onSubmit={addMovie}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.formContainer}>
            <Text numberOfLines={2} size={24} color="#fff" style={styles.title}>
              Add {movie.original_title} to your list
            </Text>
            <TextInput
              placeholder="Review"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              style={[styles.input, styles.multiInput]}
              onChangeText={handleChange("review")}
              onBlur={handleBlur("review")}
              value={values.review}
              multiline
              numberOfLines={6}
            />
            {errors.review && touched.review && (
              <Text size={14} color="#FA58B6">
                {errors.review}
              </Text>
            )}
            <TextInput
              placeholder="Rating (between 0 and 10)"
              placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
              style={styles.input}
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              value={values.rating}
            />
            {errors.rating && touched.rating && (
              <Text size={14} color="#FA58B6">
                {errors.rating}
              </Text>
            )}

            {!loading ? (
              !data ? (
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="Submit" />
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
          </View>
        )}
      </Formik>
      <View style={styles.imageFilter}></View>
      <Image source={{ uri: POSTER_BASE + movie.poster_path }} resizeMode="cover" style={styles.backdrop}></Image>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},

  title: {
    marginBottom: 40,
    textAlign: "center",
    marginHorizontal: 20,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
    height: window.height,
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

  multiInput: {
    textAlignVertical: "top",
  },

  button: {
    width: "75%",
    borderRadius: 16,
    marginTop: window.height / 8,
    marginBottom: 25,
  },

  imageFilter: {
    width: "100%",
    height: window.height,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  backdrop: {
    width: "100%",
    height: window.height,
    position: "absolute",
    zIndex: 0,
  },
});

export default AddMovie;
