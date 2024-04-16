import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:saathi/notification.dart';
import 'package:slidable_button/slidable_button.dart';

class DashBoardScreen extends StatefulWidget {
  const DashBoardScreen({super.key});

  @override
  State<DashBoardScreen> createState() => _DashBoardScreenState();
}

class _DashBoardScreenState extends State<DashBoardScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60),
        child: AppBar(
          actions: [
            GestureDetector(
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => notification()),
                );
              },
              child: const Padding(
                padding: EdgeInsets.only(right: 6),
                child: Icon(
                  Icons.notifications,
                  size: 35,
                ),
              ),
            )
          ],
          centerTitle: true,
          backgroundColor: Color.fromARGB(255, 53, 148, 130),
          title: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                "Dashboard",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              Image.asset(
                'lib/images/truck_icon.png',
                width: MediaQuery.of(context).size.width * 0.2,
              ),
            ],
          ),
        ),
      ),
      body: const DriverList(),
    );
  }
}

class DriverList extends StatefulWidget {
  const DriverList({super.key});

  @override
  State<DriverList> createState() => _DriverListState();
}

class _DriverListState extends State<DriverList> {
  final driverStatsRef = FirebaseDatabase.instance
      .ref()
      .child('UserID')
      .child('User1')
      .child('DriverStats');
  final cargoDetailsRef = FirebaseDatabase.instance
      .ref()
      .child('UserID')
      .child('User1')
      .child('CargoDetails');

  Map<String, dynamic>? vehicleData;
  Map<String, dynamic>? cargoData;

  bool showCargoDetails = false;

  @override
  void initState() {
    super.initState();
    driverStatsRef.onValue.listen((event) {
      if (event.snapshot.value != null) {
        setState(() {
          vehicleData = Map<String, dynamic>.from(
              event.snapshot.value as Map<dynamic, dynamic>);
        });
      }
    });

    cargoDetailsRef.onValue.listen((event) {
      if (event.snapshot.value != null) {
        setState(() {
          cargoData = Map<String, dynamic>.from(
              event.snapshot.value as Map<dynamic, dynamic>);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    String acd = vehicleData?['CarSpeed'] != 0 ? 'Active' : 'Inactive';
    return ListView.builder(
      itemCount: vehicleData != null ? 1 : 0,
      itemBuilder: (context, index) {
        return Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(children: [
              CustomExpansionTile(
                title: 'Vehicle 1: ${acd}',
                color:
                    vehicleData!['alert'] == false ? Colors.green : Colors.red,
                children: [
                  DetailCard(
                      label: 'Alert',
                      value: Text(vehicleData!['alert'] ? 'Yes' : 'No')),
                  DetailCard(
                      label: 'Car Speed',
                      value: Text('${vehicleData!['CarSpeed']} km/h')),
                  DetailCard(
                      label: 'Total Drowsy Incidents',
                      value: Text('${vehicleData!['TotalDrowsyIncidents']}')),
                  DetailCard(
                      label: 'Blinks per Minute',
                      value: Text('${vehicleData!['blinksPerMinute']}')),
                  DetailCard(
                      label: 'Driver in Drowsy State',
                      value: Text(vehicleData!['isDrowsy'] ? 'Yes' : 'No')),
                  DetailCard(
                      label: 'Harmful gas present',
                      value: Text(vehicleData!['isSafe'] ? 'Yes' : 'No')),
                  DetailCard(
                    label: 'Cargo details',
                    value: HorizontalSlidableButton(
                      width: MediaQuery.of(context).size.width * 0.14,
                      height: 28,
                      buttonWidth: 28.0,
                      color: Colors.grey.withOpacity(1),
                      buttonColor: Theme.of(context).primaryColor,
                      dismissible: false,
                      child: const Padding(
                        padding: EdgeInsets.all(6.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Off'),
                            Text('On'),
                          ],
                        ),
                      ),
                      onChanged: (position) {
                        setState(() {
                          if (position == SlidableButtonPosition.end) {
                            showCargoDetails =
                                position == SlidableButtonPosition.end;
                          } else {
                            showCargoDetails =
                                position == SlidableButtonPosition.end;
                          }
                        });
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 10,
              ),
              if (showCargoDetails)
                CustomExpansionTile(
                  title: 'Vehicle 1 cargo details: ${acd}',
                  color:
                      cargoData!['isOkay'] == true ? Colors.green : Colors.red,
                  children: [
                    DetailCard(
                        label: 'Current Humidity',
                        value: Text('${cargoData!['currHumidity']}')),
                    DetailCard(
                        label: 'Current Temperature',
                        value: Text('${cargoData!['currTemperature']}')),
                    DetailCard(
                        label: 'isOkay',
                        value: Text(cargoData!['isOkay'] ? 'Yes' : 'No')),
                    DetailCard(
                        label: 'isValid',
                        value: Text(cargoData!['isValid'] ? 'Yes' : 'No')),
                    DetailCard(
                        label: 'Harmful gas present',
                        value: Text(vehicleData!['isSafe'] ? 'Yes' : 'No')),
                  ],
                ),
            ]));
      },
    );
  }
}

class CustomExpansionTile extends StatelessWidget {
  final String title;
  final Color color;
  final List<Widget> children;

  const CustomExpansionTile({
    required this.title,
    required this.color,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ExpansionTile(
        childrenPadding: const EdgeInsets.only(bottom: 10),
        iconColor: Colors.white,
        initiallyExpanded: true,
        title: Text(
          title,
          style:
              const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        children: children,
      ),
    );
  }
}

class DetailCard extends StatelessWidget {
  final String label;
  final dynamic value;

  const DetailCard({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          value
        ],
      ),
    );
  }
}
