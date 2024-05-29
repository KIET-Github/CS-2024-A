import 'package:flutter/material.dart';

class notification extends StatelessWidget {
  const notification({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 53, 148, 130),
        title: Text(
          "Notifications",
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
        ),
        // centerTitle: true,
      ),
      body: Container(
          child: Column(children: [
        const SizedBox(height: 100),
        Center(
          child: Text(
            "No recent alerts",
            style: TextStyle(
                color: Colors.grey.shade400,
                fontSize: 40,
                fontWeight: FontWeight.bold),
          ),
        )
        //  )
      ])),
    );
  }
}
