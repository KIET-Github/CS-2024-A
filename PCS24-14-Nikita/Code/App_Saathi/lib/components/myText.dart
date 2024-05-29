import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget{
  final controller;
  final String hintText;
  final bool obscureText;

  const MyTextField({super.key,
  required this.controller,
  required this.hintText,
  required this.obscureText,});

  @override
  Widget build(BuildContext context) {

    return Padding(padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child:TextField(
          controller: controller,
          obscureText: obscureText,
          decoration: InputDecoration(
            enabledBorder: OutlineInputBorder
              (borderSide: BorderSide(color: Colors.blue.shade500),

            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blue.shade100
              ),
            ),
            fillColor: Colors.blue.shade100,
            filled: true,
            hintText: hintText,
            hintStyle: TextStyle(color: Colors.blue.shade900, ),
          ),
        )
    );
  }
}

