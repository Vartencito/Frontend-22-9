import React, {
  useState,
  useEffect,
  useContext,
  useDebugValue,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserContext from "../context/UserContext";
import TokenContext from "../context/AuthContext";
import GridImageView from "react-native-grid-image-viewer";

const Profile = ({ navigation }) => {
  const IP = "192.168.157.241";
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [data, setData] = useState([]);
  const [dataPublication, setDataPublication] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [url, setUrl] = useState([]);

  useEffect(() => {
    getDataUser();
    getDataPublication();
    // if (dataPublication.length >= 0) {
    //   getUrl();
    // }
  }, []);

  // useEffect(()=>{
  //   getUrl();
  // },[dataPublication])

  const getUrl = () => {
    const url = [];
    console.log("publicaciones dentro de gerUrl: ", dataPublication);
    dataPublication.map((item) => {
      url.push(item.image);
    });
    setUrl(url);
  };

  console.log("estas son las url: ", url);

  const getDataUser = async () => {
    await axios
      .post(`http://${IP}:4000/usuarios/usuario`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          setData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getDataPublication = async () => {
    await axios
      .post(`http://${IP}:4000/publicaciones/username`, user, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("esta es la respuesta", response.data);
        setDataPublication(response.data);
      })
      .then(() => {
        getUrl();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDataPublication();
    setRefreshing(false);
  };

  return (
    <>
      <View style={styles.cuadrado}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="arrow-back"
            color="#fff"
            size={35}
            style={{ padding: 7 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewPublication")}
          >
            <Ionicons
              name="add"
              color="#fff"
              size={35}
              style={{
                paddingLeft: 6,
                marginRight: 20,
                marginTop: 5,
                borderColor: "#fff",
                borderWidth: 2,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.user}>{data.username}</Text>
          </View>
          <Image
            source={
              data.profilePicture
                ? { uri: data.profilePicture }
                : require("../img/User.png")
            }
            style={styles.image}
          />
          <Text style={styles.occupation}>{data.occupation}</Text>
          <View
            style={{
              flexDirection: "row",
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            <View style={{ alignItems: "center", marginRight: "6%" }}>
              <Text style={styles.numbers}>300</Text>
              <Text style={styles.numbers2}>Members</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>300</Text>
              <Text style={styles.numbers2}>Followers</Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: "6%" }}>
              <Text style={styles.numbers}>{dataPublication.length}</Text>
              <Text style={styles.numbers2}>Works</Text>
            </View>
          </View>
          <Ionicons
            name="grid"
            color="#160F0A"
            size={35}
            style={{ marginTop: "10%" }}
          />
          <View style={{ height: "100%", width: "100%", padding: 5 }}>
            <GridImageView data={url} />
          </View>
          <GridImageView
            data={dataPublication.map((publicacion) => {
              const url = publicacion.image;
              return url;
            })}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E49C7A",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "59%",
    height: 260,
    borderRadius: 500,
    marginTop: 20,
  },
  cuadrado: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
    width: 435,
    zIndex: 2,
    height: 60,
    backgroundColor: "#80341E",
    borderBottomWidth: 7,
    borderColor: "#9D2932",
  },
  user: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C2211",
    marginTop: 740,
  },
  occupation: {
    color: "white",
    fontSize: 16,
  },
  numbers: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  numbers2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  align: {
    textAlign: "center",
  },
  contenedorDePublicaciones: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  publicacion: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").height / 5,
  },
});

export default Profile;
