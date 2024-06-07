import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:saathi/LoginPage.dart';
import 'package:saathi/screens/home_screen.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: FirebaseAuth.instance.authStateChanges().first,
      builder: (context, AsyncSnapshot<User?> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        } else {
          if (snapshot.hasData && snapshot.data != null) {
            // User is authenticated, navigate to home screen
            print('homescreen');
            return HomeScreen();
          } else {
            // User is not authenticated, navigate to login screen
            print('login screen');
            return LoginPage();
          }
        }
      },
    );
  }
}
