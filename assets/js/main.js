var configs = {
  session_id: "",
  im_path: "",
  les_path: "",
  out_dir: "",
  run: "all",
  space: "orig",
  ants_path: "",
  fsl_path: "",
  rois_path: "",
  template_directory: "",
  out_format: "",
  reg_method: "flirt",
  reg_costfn: "corratio",
  reg_partmask: false,
  reg_nomask: false,
  bet_g: -0.25,
  gif_duration: 0.5,
};

function onTextChange(element) {
  var element_name = element.name;
  var value = element.value.trim();
  switch (element_name) {
    case "session_id":
      configs.session_id = value;
      break;
    case "im_path":
      configs.im_path = value;
      break;
    case "les_path":
      configs.les_path = value;
      break;
    case "out_dir":
      configs.out_dir = value;
      break;
    case "run":
      configs.run = value;
      break;
    case "space":
      configs.space = value;
      break;
    case "ants_path":
      configs.ants_path = value;
      break;
    case "fsl_path":
      configs.fsl_path = value;
      break;
    case "rois_path":
      configs.rois_path = value;
      break;
    case "template_directory":
      configs.template_directory = value;
      break;
    case "out_format":
      configs.out_format = value;
      break;
    case "reg_method":
      configs.reg_method = value;
      break;
    case "reg_costfn":
      configs.reg_costfn = value;
      break;
    case "bet_g":
      configs.bet_g = parseFloat(value);
      break;
    case "gif_duration":
      configs.gif_duration = parseFloat(value);
      break;
    default:
      console.log("No handler for this text change");
  }
  itemsUpdated();
}

function onCheckboxToggle(element) {
  var element_name = element.name;
  var value = element.checked;
  switch (element_name) {
    case "reg_partmask":
      configs.reg_partmask = value;
      break;
    case "reg_nomask":
      configs.reg_nomask = value;
      break;
    default:
      console.log("No handler for this checkbox toggle");
  }
  itemsUpdated();
}

function itemsUpdated() {
  download();
}

function download() {
  var button = document.getElementById("download-btn");

  if (!configs.session_id) {
    button.text = "Session ID is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.im_path) {
    button.text = "File path to image is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.les_path) {
    button.text = "File path to mask is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.out_dir) {
    button.text = "Output directory is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.ants_path) {
    button.text = "ANTs Binaries Folder Path is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.fsl_path) {
    button.text = "FSL Binaries Folder Path is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.rois_path) {
    button.text = "ROIs Folder Path is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (!configs.template_directory) {
    button.text = "Template Folder Path is required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  button.classList.remove("btn-secondary");
  button.classList.add("btn-primary");

  var text = JSON.stringify(configs, null, 4);
  var file = new Blob([text], { type: "text/plain" });
  button.text = "Click here to download the config file";
  button.href = URL.createObjectURL(file);
  button.download = "config.json";
}

$(document).ready(function () {
  itemsUpdated();
  initializeToolTips();
});


function setToolTips(element_id, text) {
  $(element_id).attr("title", text).tooltip("show").tooltip("hide");
}

function initializeToolTips() {
  def_session_id = "Identifier for the scan. Ideally follows \"sub-{subject}_ses-{session}\" format specified by BIDS. This will be used in all outputs."
  def_im_path = "Path to the T1-weighted MRI image in NIFTI format";
  def_les_path = "Path to the lesion segmentation mask in NIFTI format.";
  def_out_dir = "Path to output directory to save all PALS outputs. Note that a PALS directory will be generated in this output directory. Recommended to set this path to the derivatives folder of a BIDS-compliant directory."
  def_run = "Option to specify which processing steps to execute. For options other than all, the process will skip any steps that have already been completed, and begin at the specified step. all: Runs all steps, overwriting any previous outputs and results\nbet: Starts from the brain extraction step, overwriting all subsequent outputs and results.\nmnireg: Starts from the registration to the MNI template step, overwriting all subsequent outputs and results.\ncoreg: Starts from the lesion coregistration step, overwriting all subsequent outputs and results.\npals: Starts from the lesion load calculation step, overwriting all subsequent outputs and results.\nskipdone: Starts from the first step that has not yet been completed, skipping any steps that are already finished.";
  def_space = "Description of the input image space. Can either be \"orig\" or \"mni\". \"Orig\" refers to native image space, \"mni\" refers to standard MNI space."
  def_ants_path = "Path to the ANTs binaries folder. Required to run intensity inhomogeneity correction."
  def_fsl_path = "Path to the FSL binaries folder. Required to run brain extraction and affine registration."
  def_rois_path = "Path to the ROIs to use for lesion overlap analysis. This should be pointing to the ROIs folder in the PALS repository."
  def_template_directory = "Path to the Templates folder provided in the PALS repository."

  def_Ide = "Option to specify what format to output the PALS results. By default, PALS outputs a CSV, but a JSON can also be chosen."
  def_reg_method = "Designate which software package to use for registering image to template. Currently only FSL's FLIRT is supported."
  def_reg_costfn = "Designate which cost function to use to register the image to template. Please use a valid FLIRT input. \"corratio\" is the default."
    

  def_reg_partmask = "Specify whether to run the partial weighting option for FLIRT. This allows non-brain structures to have minor influence on the FLIRT registration result."
  def_reg_nomask = "Specify whether to run the no weighting option for FLIRT. This allows non-brain structures to have equal influence as brain structures on the FLIRT registration result."
    
  def_bet_g = "Specify the vertical gradient for BET. Default is -0.25. Positive values indicate brain is shifted more below the midline, negative values indicate brain is shifted more above the midline."
   
  def_gif_duration = "Set the duration for each GIF frame generated in the QC workflow. Default is 0.5 seconds"
    

  $("body").tooltip({ selector: "[data-toggle=tooltip]" });

  setToolTips("#session_id-1", def_session_id);
  setToolTips("#session_id-2", def_session_id);

  setToolTips("#input_path-1", def_im_path);
  setToolTips("#input_path-2", def_im_path);

  setToolTips("#input_path-3", def_les_path);
  setToolTips("#input_path-4", def_les_path);

  setToolTips("#output_path-1", def_out_dir);
  setToolTips("#output_path-2", def_out_dir);

  setToolTips("#script_run-1", def_run);
  setToolTips("#script_run-2", def_run);

  setToolTips("#input_path-5", def_space);
  setToolTips("#input_path-6", def_space);

  setToolTips("#output_path-3", def_Ide);
  setToolTips("#output_path-4", def_Ide);

  setToolTips("#output_id-1", def_ants_path);
  setToolTips("#output_id-2", def_ants_path);

  setToolTips("#output_id-3", def_fsl_path);
  setToolTips("#output_id-4", def_fsl_path);

  setToolTips("#output_id-5", def_rois_path);
  setToolTips("#output_id-6", def_rois_path);

  setToolTips("#output_id-7", def_template_directory);
  setToolTips("#output_id-8", def_template_directory);

  setToolTips("#reg-1", def_reg_method);
  setToolTips("#reg-2", def_reg_method);

  setToolTips("#reg-3", def_reg_costfn);
  setToolTips("#reg-4", def_reg_costfn);

  setToolTips("#reg-5", def_reg_partmask);
  setToolTips("#reg-6", def_reg_partmask);

  setToolTips("#reg-7", def_reg_nomask);
  setToolTips("#reg-8", def_reg_nomask);

  setToolTips("#bet-1", def_bet_g);
  setToolTips("#bet-2", def_bet_g);

  setToolTips("#qc-1", def_gif_duration);
  setToolTips("#qc-2", def_gif_duration);

}
