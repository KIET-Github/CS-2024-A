import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 53, 148, 130),
        title: Text(
          "Profile",
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
        ),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: ProfileDetails(),
        ),
      ),
    );
  }
}

class ProfileDetails extends StatefulWidget {
  @override
  State<ProfileDetails> createState() => _ProfileDetailsState();
}

class _ProfileDetailsState extends State<ProfileDetails> {
  final ref = FirebaseDatabase.instance.ref().child('UserID');

  Map<String, dynamic>? vehicleData;

  @override
  void initState() {
    super.initState();
    ref.child('User1').child('Details').onValue.listen((event) {
      if (event.snapshot.value != null) {
        setState(() {
          vehicleData = Map<String, dynamic>.from(
              event.snapshot.value as Map<dynamic, dynamic>);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        const CircleAvatar(
          radius: 70,
          backgroundImage: NetworkImage(
              'https://cdn.imgbin.com/10/20/3/imgbin-car-driving-computer-icons-truck-driver-car-cgicc0xxLBdT4RP4mu93N6XEe.jpg'),
        ),
        const SizedBox(height: 28),
        DetailRow(label: 'OwnerName', value: vehicleData?['OwnerName']),
        DetailRow(label: 'OwnerNumber', value: vehicleData?['OwnerNumber']),
        DetailRow(label: 'VehicleNumber', value: vehicleData?['VehicleNumber']),
        DetailRow(label: 'OwnerEmail', value: vehicleData?['OwnerEmail']),
        DetailRow(label: 'OwnerDOB', value: vehicleData?['OwnerDOB']),
        DetailRow(
            label: 'DateOfPurchase', value: vehicleData?['DateOfPurchase']),
        DetailRow(label: 'EngineNumber', value: vehicleData?['EngineNumber']),
        DetailRow(label: 'ChasisNumber', value: vehicleData?['ChasisNumber']),
        DetailRow(
            label: 'InsuranceValidUpto',
            value: vehicleData?['InsuranceValidUpto']),
        DetailRow(
            label: 'DrivingLicenseID', value: vehicleData?['DrivingLicenseID']),
        DetailRow(label: 'Comments', value: vehicleData?['Comments']),
      ],
    );
  }
}

class DetailRow extends StatelessWidget {
  final String label;
  final dynamic value;

  const DetailRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '$label: ',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Text(
            '${value}',
            style: TextStyle(fontSize: 18),
          ),
        ],
      ),
    );
  }
}
