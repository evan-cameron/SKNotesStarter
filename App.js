import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw, { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";
import { store } from "./store";
import MasonryList from "@react-native-seoul/masonry-list";

// database links
import {
  useFetchNotesQuery,
  useSearchNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "./db";

// function HomeScreen({ navigation }) {
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const {
//     data: searchData,
//     error,
//     isLoading,
//   } = useSearchNotesQuery(searchQuery); // Fetch notes based on search query
//   const [deleteNote] = useDeleteNoteMutation();
//   const [selectedNote, setSelectedNote] = useState(null);

//   const handleDeleteNote = (item) => {
//     setSelectedNote(item); // Set selected note for modal
//   };

//   const confirmDeleteNote = () => {
//     deleteNote(selectedNote);
//     setSelectedNote(null);
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={tw`w-full mb-2 px-1`}>
//       <View
//         style={tw`bg-yellow-200 rounded-sm p-3 border border-gray-800 `}
//       >
//         <TouchableOpacity
//           onPress={() => navigation.navigate("View", { data: item })}
//         >
//           <Text style={tw`font-bold`}>{item.title}</Text>
//           <Text>{item.content}</Text>
//         </TouchableOpacity>
//         <View style={tw`flex-row justify-end mt-2`}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Edit", { data: item })}
//             style={tw`bg-yellow-200 px-2 py-1 rounded mr-2 mt-4 border`}
//           >
//             <Text style={tw`text-black`}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handleDeleteNote(item)}
//             style={tw`bg-yellow-200 px-2 py-1 rounded  mt-4 border`}
//           >
//             <Text style={tw`text-black`}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   const renderFooter = () => (
//     <View
//       style={tw`flex-row justify-between items-center p-4 bg-yellow-200 h-full`}
//     >
//       <TextInput
//         style={tw`h-12 border border-dashed border-gray-800 rounded-lg px-4 w-4/6`}
//         onChangeText={setSearchQuery}
//         value={searchQuery}
//         placeholder="Search..."
//       />
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Add")}
//         style={tw`bg-yellow-200 rounded-full w-12 h-12 items-center justify-center border`}
//       >
//         <Text style={tw`text-white text-center text-3xl text-gray-900`}>
//           +
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={tw`flex-1 items-center bg-yellow-200 relative`}>
//       <View style={tw`w-full h-full`}>
//         <View style={tw`h-[85%] w-[98%] mx-auto`}>
//           {searchData && (
//             <MasonryList
//               style={tw`px-0.5 pt-0.5 pb-20`}
//               data={searchData}
//               numColumns={2}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={tw`px-2`}
//             />
//           )}
//         </View>
//         <View style={tw`h-[15%] w-full`}>{renderFooter()}</View>
//       </View>
//       <Modal
//         transparent={true}
//         visible={selectedNote !== null}
//         animationType="slide"
//         onRequestClose={() => setSelectedNote(null)}
//       >
//         <View
//           style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
//         >
//           <View style={tw`w-4/5 bg-white p-6 rounded-lg`}>
//             <Text style={tw`text-lg mb-4`}>
//               Are you sure you want to delete this note?
//             </Text>
//             <View style={tw`flex-row justify-end`}>
//               <TouchableOpacity
//                 onPress={() => setSelectedNote(null)}
//                 style={tw`mr-4`}
//               >
//                 <Text style={tw`text-gray-800`}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={confirmDeleteNote}
//               >
//                 <Text style={tw`text-gray-800`}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const {
    data: searchData,
    error,
    isLoading,
  } = useSearchNotesQuery(searchQuery); // Fetch notes based on search query
  const [deleteNote] = useDeleteNoteMutation();
  const [selectedNote, setSelectedNote] = useState(null);

  const handleDeleteNote = (item) => {
    setSelectedNote(item); // Set selected note for modal
  };

  const confirmDeleteNote = () => {
    deleteNote(selectedNote);
    setSelectedNote(null);
  };

  const renderItem = ({ item, index }) => (
    <View style={tw`w-full mb-2 px-1`}>
      <View
        style={tw`bg-yellow-200 rounded-lg p-3 border border-dashed border-gray-800`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("View", { data: item })}
        >
          <Text style={tw`font-bold`}>{item.title}</Text>
          <Text>{item.content}</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-end mt-2`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", { data: item })}
            style={tw`bg-yellow-200 px-2 py-1 rounded mr-2 mt-4 border border-dashed`}
          >
            <Text style={tw`text-black`}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteNote(item)}
            style={tw`bg-yellow-200 px-2 py-1 rounded mt-4 border border-dashed`}
          >
            <Text style={tw`text-black`}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View
      style={tw`flex-row justify-between items-center p-4 bg-yellow-200 h-full`}
    >
      <TextInput
        style={tw`h-12 border border-dashed border-gray-800 rounded-lg px-4 w-4/6`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search..."
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={tw`bg-yellow-200 rounded-full w-12 h-12 items-center justify-center border`}
      >
        <Text style={tw`text-white text-center text-3xl text-gray-900`}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 items-center bg-yellow-200 relative`}>
      <View style={tw`w-full h-full`}>
        <View style={tw`h-[85%] w-[98%] mx-auto`}>
          {searchData && (
            <MasonryList
              style={tw`px-0.5 pt-0.5 pb-20`}
              data={searchData}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`px-2`}
            />
          )}
        </View>
        <View style={tw`h-[15%] w-full`}>{renderFooter()}</View>
      </View>
      <Modal
        transparent={true}
        visible={selectedNote !== null}
        animationType="slide"
        onRequestClose={() => setSelectedNote(null)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`w-4/5 bg-white p-6 rounded-lg`}>
            <Text style={tw`text-lg mb-4`}>
              Are you sure you want to delete this note?
            </Text>
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => setSelectedNote(null)}
                style={tw`mr-4`}
              >
                <Text style={tw`text-gray-800`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDeleteNote}
              >
                <Text style={tw`text-gray-800`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


// function AddScreen({ navigation }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [addNote, { data: addNoteData }] = useAddNoteMutation();

//   useEffect(() => {
//     if (addNoteData != undefined) {
//       console.log(addNoteData.id);
//       navigation.navigate("Home");
//     }
//   }, [addNoteData]);

//   // Set header options
//   navigation.setOptions({
//     headerStyle: tw`bg-yellow-200 border-0`, // Change header color to yellow-200
//     headerTintColor: tw`text-black`, // Change header text color to black
//     headerTitleStyle: tw`font-bold`,
//     headerShadowVisible: false,
//   });

//   return (
//     <View style={tw`flex-1 p-4 bg-yellow-200`}>
//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Title"
//         style={tw`h-12 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
//       />
//       <TextInput
//         value={content}
//         onChangeText={setContent}
//         placeholder="Content"
//         style={tw`h-48 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
//         multiline
//       />
//       <TouchableOpacity
//         onPress={() => {
//           addNote({
//             title,
//             content,
//           });
//         }}
//         style={tw`bg-yellow-200 p-4 rounded-lg border`}
//       >
//         <Text style={tw`text-white text-black`}>Save Note</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

function AddScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNote, { data: addNoteData }] = useAddNoteMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (addNoteData) {
      navigation.navigate("Home");
    }
  }, [addNoteData, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-yellow-200 border-0`,
      headerTintColor: tw`text-black`,
      headerTitleStyle: tw`font-bold`,
      headerShadowVisible: false,
    });
  }, [navigation]);

  const handleSaveNote = () => {
    addNote({
      title,
      content,
    });
  };

  return (
    <View style={tw`flex-1 p-4 bg-yellow-200`}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={tw`h-12 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        style={tw`h-48 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
        multiline
      />
      <TouchableOpacity
        onPress={handleSaveNote}
        style={tw`bg-yellow-200 p-4 rounded-lg border`}
      >
        <Text style={tw`text-black`}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}


function EditScreen({ route, navigation }) {
  const { data } = route.params;
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content.trim()); // Trim content on load
  const [updateNote, { data: updateNoteData }] = useUpdateNoteMutation();
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data.title,
      headerStyle: tw`bg-yellow-200 border-0`,
      headerTintColor: tw`text-black`,
      headerTitleStyle: tw`font-bold`,
      headerShadowVisible: false,
    });
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (updateNoteData) {
      navigation.navigate("Home");
    }
  }, [updateNoteData]);

  return (
    <View style={tw`flex-1 p-4 bg-yellow-200`}>
      <TextInput
        ref={inputRef}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={tw`h-12 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        style={tw`h-48 p-2 bg-yellow-200 rounded-lg mb-4 border border-dashed`}
        multiline
      />
      <TouchableOpacity
        onPress={() => {
          updateNote({
            ...data,
            title,
            content,
          });
        }}
        style={tw`bg-yellow-200 p-4 rounded-lg border`}
      >
        <Text style={tw`text-white text-black`}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}


function ViewScreen({ route, navigation }) {
  const { data } = route.params;
  const [deleteNote] = useDeleteNoteMutation();
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <ScrollView
      style={tw`bg-yellow-200`}
      contentContainerStyle={tw`flex-1 p-4`}
    >
      <Text style={tw`text-xl font-bold mb-2 bg-yellow-200 p-2`}>
        {data.title}
      </Text>
      <Text style={tw`text-lg mb-4 bg-yellow-200 p-2`}>{data.content}</Text>
      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit", { data })}
          style={tw`bg-yellow-200 px-4 py-2 mb-4 rounded mr-2 border`}
        >
          <Text style={tw`text-black`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedNote(data)}
          style={tw`bg-yellow-200 px-4 py-2 mb-4 rounded border `}
        >
          <Text style={tw`text-black`}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={selectedNote !== null}
        animationType="slide"
        onRequestClose={() => setSelectedNote(null)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`w-4/5 bg-white p-6 rounded-lg`}>
            <Text style={tw`text-lg mb-4`}>
              Are you sure you want to delete this note?
            </Text>
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                onPress={() => setSelectedNote(null)}
                style={tw`mr-4`}
              >
                <Text style={tw`text-gray-800`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteNote(selectedNote);
                  setSelectedNote(null);
                  navigation.goBack();
                }}
              >
                <Text style={tw`text-gray-800`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{
              headerStyle: tw`bg-yellow-200 border-0`, // Background color set to yellow
              headerTintColor: tw`bg-gray-800`, // Dark purple color for header text
              headerTitleStyle: tw`font-bold px-3`, // Make header text bold
              headerShadowVisible: false, // Hide header shadow
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              // headerStyle: tw`bg-purple-300 border-0`,
              // headerTintColor: "#fff",
              headerTitleStyle: tw`font-bold`,
              headerShadowVisible: false,
            }}
            name="Add"
            component={AddScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: tw`bg-yellow-200 border-0`,
              // headerTintColor: "#000",
              headerTitleStyle: tw`font-bold`,
              headerShadowVisible: false,
            }}
            name="Edit"
            component={EditScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: tw`bg-yellow-200 border-0`,
              // headerTintColor: "#000",
              headerTitleStyle: tw`font-bold`,
              headerShadowVisible: false,
            }}
            name="View"
            component={ViewScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
