const homeUrl = "/VirtualVisit/TCL.sh3d";
const onerror = function (err) {
  if (err == "No WebGL") {
    alert("Sorry, your browser doesn't support WebGL.");
  } else {
    console.log(err.stack);
    alert(
      "Error: " +
        (err.message ? err.constructor.name + " " + err.message : err) +
        (window.location.href.indexOf("file://") === 0
          ? "\nCheck your browser is allowed to access local files."
          : "")
    );
  }
};
const onprogression = function (part, info, percentage) {
  var progress = document.getElementById("viewerProgress");
  if (part === HomeRecorder.READING_HOME) {
    // Home loading is finished
    progress.value = percentage * 100;
    info = info.substring(info.lastIndexOf("/") + 1);
  } else if (part === Node3D.READING_MODEL) {
    // Models loading is finished
    progress.value = 100 + percentage * 100;
    if (percentage === 1) {
      document.getElementById("viewerProgressDiv").style.visibility = "hidden";
    }
  }

  document.getElementById("viewerProgressLabel").innerHTML =
    (percentage ? Math.floor(percentage * 100) + "% " : "") + part + " " + info;
};
// Display home in canvas 3D
// Mouse and keyboard navigation explained at
// http://sweethome3d.cvs.sf.net/viewvc/sweethome3d/SweetHome3D/src/com/eteks/sweethome3d/viewcontroller/resources/help/en/editing3DView.html
// You may also switch between aerial view and virtual visit with the space bar
// For browser compatibility, see http://caniuse.com/webgl

viewHome(
  "viewerCanvas", // Id of the canvas
  homeUrl, // URL or relative URL of the home to display
  () => {}, // Callback called in case of error
  onprogression, // Callback called while loading
  {
    roundsPerMinute: 6, // Rotation speed of the animation launched once home is loaded in rounds per minute, no animation if missing or equal to 0
    navigationPanel: "default", // Displayed navigation arrows, "none" or "default" for default one or an HTML string containing elements with data-simulated-key
    // attribute set "UP", "DOWN", "LEFT", "RIGHT"... to replace the default navigation panel, "none" if missing
    aerialViewButtonId: "aerialView", // Id of the aerial view radio button, radio buttons hidden if missing
    virtualVisitButtonId: "virtualVisit", // Id of the aerial view radio button, radio buttons hidden if missing
    levelsAndCamerasListId: "levelsAndCameras", // Id of the levels and cameras select component, hidden if missing
    /* level: "Roof", */ // Uncomment to select the displayed level, default level if missing */
    selectableLevels: ["Ground Floor", "Second Floor"], // Uncomment to choose the list of displayed levels, no select component if empty array */
    /* camera: "Exterior view", */ // Uncomment to select a camera, default camera if missing */
    /* selectableCameras: ["Exterior view", "Kitchen"], */ // Uncomment to choose the list of displayed cameras, no camera if missing */
    activateCameraSwitchKey: true, // Switch between top view / virtual visit with space bar if not false or missing */
  }
);

const viewerCanvas = document.getElementById("viewerCanvas");
viewerCanvas.width = window.innerWidth;
viewerCanvas.height = window.innerHeight;
