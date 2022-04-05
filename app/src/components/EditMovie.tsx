import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Dimensions, View, StyleSheet, TextInput, Image, ActivityIndicator, Alert } from "react-native";
import Text from "./Text";
import Button from "./Button";
import * as yup from "yup";
import { POSTER_BASE } from "../tools/constants";
import BackButton from "./BackButton";
import { useMutation } from "@apollo/client";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MovieContext } from "../context/MovieContext";
import { UPDATE_MOVIE } from "../graphql/mutations/movie/UpdateMovie";
import { DELETE_MOVIE } from "../graphql/mutations/movie/DeleteMovie";
import Modal from "react-native-modal";

const ValidationSchema = yup.object().shape({
  review: yup.string().min(10, "Minimum 10 characters").max(250, "Maximum 250 characters").required("A review is required"),
  rating: yup.number().typeError("Must be a number").min(0, "Minimum rating is 0").max(10, "Maximum rating is 10").required("A rating is required"),
});

const EditMovie = ({ route, navigation }: any) => {
  const movie = route?.params?.movie;
  const [updateMutation, { data, loading: updating, error }] = useMutation(UPDATE_MOVIE);
  const [deleteMutation, { loading: deleting, data: deleteData }] = useMutation(DELETE_MOVIE);
  const { setMoviesList, moviesList } = useContext(MovieContext);
  const [modalShown, showModal] = useState(false);

  if (!movie || !movie.tmdbId) {
    //@ts-ignore
    navigation.navigate("Home");

    return <></>;
  }

  const updateMovie = async (v: { rating: string; review: string }) => {
    try {
      await updateMutation({ variables: { data: { rating: +v.rating, review: v.review, tmdbId: movie.tmdbId } } });
    } catch (error) {
      Alert.alert("An unexpected error occured while updating. Please try again later.");
    }

    setTimeout(() => {
      navigation.navigate("UserMovies");
    }, 2000);
  };

  const handleDelete = async () => {
    try {
      await deleteMutation({ variables: { data: { tmdbId: movie.tmdbId } } });
      const newMovies = moviesList.filter((m) => m !== movie.tmdbId);
      setMoviesList([...newMovies]);
    } catch (error) {
      Alert.alert("An unexpected error occured while deleting. Please try again later.");
    }

    setTimeout(() => {
      navigation.navigate("UserMovies");
    }, 2000);
  };

  const confirmDelete = () => {
    showModal(true);
  };

  const onClose = () => {
    showModal(false);
  };

  return (
    <View>
      <BackButton navigation={navigation}></BackButton>
      <Modal
        style={{ padding: 0, margin: 0 }}
        isVisible={modalShown}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="down"
      >
        <View style={styles.modalContent}>
          <Text numberOfLines={2} style={styles.modalTitle} size={50}>
            Are you sure you wish to delete {movie.title} from your list?
          </Text>

          <View style={styles.dialogButtons}>
            <Button containerStyle={[styles.button, styles.dialogButton]} onPress={onClose} title="Cancel" />
            {!deleting ? (
              !deleteData ? (
                <Button containerStyle={[styles.button, styles.delete, styles.dialogButton]} onPress={handleDelete} title="Delete" />
              ) : (
                <Button containerStyle={[styles.button, styles.delete, styles.dialogButton]} onPress={handleDelete} title="">
                  <Ionicons name="md-checkmark-circle" size={22} color="#FFF" style={{ position: "absolute" }} />
                </Button>
              )
            ) : (
              <Button containerStyle={[styles.button, styles.delete, styles.dialogButton]} onPress={confirmDelete} title="">
                <ActivityIndicator animating size={22} color="#FFF" style={{ position: "absolute" }}></ActivityIndicator>
              </Button>
            )}
          </View>
        </View>
      </Modal>
      <Formik
        validationSchema={ValidationSchema}
        enableReinitialize
        initialValues={{ rating: String(movie.rating), review: movie.review }}
        onSubmit={updateMovie}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.formContainer}>
            <Text numberOfLines={2} size={24} color="#fff" style={styles.title}>
              Update {movie.title}
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

            {!updating ? (
              !data ? (
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="Submit" />
              ) : (
                <Button containerStyle={styles.button} onPress={handleSubmit as any} title="">
                  <Ionicons name="md-checkmark-circle" size={22} color="#FA58B6" style={{ position: "absolute", left: "60%" }} />
                </Button>
              )
            ) : (
              <Button containerStyle={styles.button} onPress={handleSubmit as any} title="">
                <ActivityIndicator animating size={22} color="#FA58B6" style={{ position: "absolute" }}></ActivityIndicator>
              </Button>
            )}

            <Button containerStyle={[styles.button, styles.delete]} onPress={confirmDelete} title="Delete" />
          </View>
        )}
      </Formik>
      <View style={styles.imageFilter}></View>
      <Image source={{ uri: POSTER_BASE + movie.posterPath }} resizeMode="cover" style={styles.backdrop}></Image>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
  delete: {
    backgroundColor: "#F00100",
    marginTop: 10,
  },
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
    position: "relative",
  },

  dialogButton: {
    width: "40%",
    marginTop: 0,
    marginBottom: 5,
    height: 50,
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

  modalTitle: {
    marginBottom: 40,
    textAlign: "center",
  },

  modalContent: {
    backgroundColor: "#11112A",
    alignSelf: "center",
    borderRadius: 12,
    padding: 20,
    maxWidth: "90%",
  },

  dialogButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default EditMovie;
