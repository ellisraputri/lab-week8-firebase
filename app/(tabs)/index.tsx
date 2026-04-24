import { Image, StyleSheet, View, Button, Alert, TextInput, SafeAreaView, Text } from 'react-native';
import {Link, useLocalSearchParams} from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../../firebase.js";
import {createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

export default function HomeScreen() {
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  
const [loginout, setloginout] = useState('Login');
const [created, setCreate] = useState('create');
const [pword, setPword] = useState('password');
const [email, setEmail] = useState('email@mail.com');

let n = 0;

async function debug(tag: String, str: String) {
  console.log(tag + "No. " + n.toString(), str);
  n++;
  
}

function loginA() {
  setEmail(email);
  setPword(pword);

  signInWithEmailAndPassword(auth, email, pword).
  then((userCredential) => {
    const user = userCredential.user;
    debug("already signed in: ", "success " + user.email);
    setloginout("login: " + user.email);
  }).catch((error) => {
    setloginout("login failed: ");
    debug("login failed", error.code + " "+ error.message);
  })
    
  debug("loginA", "login: " + email + " password: " + pword + "success");   
}


function createA() {
  setEmail(email);
  setPword(pword);
  setCreate('created');

  createUserWithEmailAndPassword(auth, email, pword).
  then((userCredential) => {
    const user = userCredential.user;
    debug("already sign up : ", "success " + user.email);
    setloginout("signup: " + user.email);
  }).catch((error) => {
    setloginout("signup failed: ");
    debug("signup failed", error.code + " "+ error.message);
  })


    debug("createA", "created: "  + email + " password: " + pword);      
}

function logoutA() {
  setEmail(email);
  setPword(pword);

  signOut(auth).
  then((userCredential) => {
    debug("already signed out: ", "success " + email);
    setloginout("signout: " + email);
  }).catch((error) => {
    setloginout("signout failed: ");
    debug("signout failed", error.code + " "+ error.message);
  })

  debug("createA", "created: "  + email + " password: " + pword);      
}
function deleteA() {
  setEmail(email);
  setPword(pword);

  deleteUser(auth.currentUser!). 
  then((userCredential) => {
    debug("already deleteuser: ", "success " + email);
    setloginout("delete user: " + email);
  }).catch((error) => {
    setloginout("delete user failed: ");
    debug("delete user failed", error.code + " "+ error.message);
  })

  debug("deleteA", "Delete: "  + email + " password: " + pword);      

}

  return (
    <SafeAreaProvider style = {styles.bg}>
    <SafeAreaView style = {styles.header}>
          <View style = {styles.colContainer}>
          <View style = {styles.rowContainer}>
            <Text>
              {loginout}
            </Text>
            <Text>
              {created}
            </Text>
          </View>
          <View style = {styles.rowContainer}>
            <TextInput style = {styles.sUser}
            onChangeText = {setEmail}
            value={email} />
            <TextInput style = {styles.sUser}
            secureTextEntry={true}
            onChangeText = {setPword}
            value={pword}/>
          </View>

          <View style = {styles.rowContainer}>
            <Button
              title = "login"
              onPress={()=>loginA()} >
             </Button>
             <Button
              title = "Create"
              onPress={()=>createA()} >
             </Button>
             <Button
              title = "Logout"
              onPress={()=>logoutA()} >
             </Button>
             <Button
              title = "Delete"
              onPress={()=>deleteA()} >
             </Button>
          </View>
       </View>
       </SafeAreaView>
       </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bg : {
    backgroundColor: "white",
  },
  header: {
    padding: 40,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  colContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
 sUser: {},
});