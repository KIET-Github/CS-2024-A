import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class location extends StatefulWidget {
  @override
  _locationState createState() => _locationState();
}

class _locationState extends State<location> {
  static const _initialCameraPosition = CameraPosition(
    target: LatLng(28.75304173784404, 77.4965410152737),
    zoom: 13.5,
  );
  // late GoogleMapController _googleMapController;
  // late Marker origin;
  // late Marker destination;
//@override
  // void dispose() {
  //   _googleMapController.dispose();
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
            preferredSize: const Size.fromHeight(60),
            child: AppBar(
              backgroundColor: Color.fromARGB(255, 53, 148, 130),
              centerTitle: true,
              title: const Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Location",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
                    ),
                  ]),
            )),
        body: GoogleMap(
          myLocationButtonEnabled: false,
          zoomControlsEnabled: false,
          initialCameraPosition: _initialCameraPosition,
          //onMapCreated: (controller) => _googleMapController = controller,
//  markers: {
//   if (origin != null) origin,
//   if(destination != null) destination
//  },
        ));
  }
}
