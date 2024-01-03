let scanner = null;

function startScanning() {
  if (scanner) return;
  scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

  scanner.addListener('scan', function (content) {
    processQRCodeContent(content);
  });

  scanner.addListener('error', function (error) {
    displayError("Error: Unable to read QR code from the image.");
  });

  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error("No cameras found on this device.");
    }
  }).catch(function (e) {
    console.error("Error while accessing the camera: " + e);
  });
}

function processQRCodeContent(content) {
  const [link, uid] = content.split("|");

  window.location.href = `${link}?uid=${encodeURIComponent(uid)}`;
}

document.getElementById('scanButton').addEventListener('click', startScanning);