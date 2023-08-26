var configs = {
  Analysis: {
    Reorient: false,
    Orientation: "LAS",
    Registration: false,
    RegistrationMethod: "FLIRT",
    BrainExtraction: false,
    BrainExtractionMethod: "BET",
    WhiteMatterSegmentation: false,
    LesionCorrection: false,
    LesionLoadCalculation: false,
    LesionHeatMap: false,
  },
  BrainExtraction: {
    frac: 0.5,
    mask: false,
  },
  Registration: {
    cost_func: "normmi",
    reference: "",
  },
  LesionCorrection: {
    ImageNormMin: 0,
    ImageNormMax: 255,
    WhiteMatterSpread: 0.05,
  },
  BIDSRoot: "",
  Subject: "",
  Session: "",
  LesionRoot: "",
  WhiteMatterSegmentationRoot: "",
  ROIDir: "",
  ROIList: [],
  Multiprocessing: 1,
  T1Entities: {
    desc: "",
    space: "",
  },
  LesionEntities: {
    suffix: "",
    space: "",
    label: "",
  },
  HeatMap: {
    Reference: "",
    Transparency: 0.4,
  },
  Outputs: {
    Root: "/output/",
    StartRegistrationSpace: "",
    OutputRegistrationSpace: "",
    RegistrationTransform: "",
    Reorient: "",
    BrainExtraction: "",
    LesionCorrected: "",
  },
};

var common_input_dir = "";
var common_input_dir_replace = "/input/"
var common_output_dir = "";

function onTextChange(element) {
  var element_name = element.name;
  var value = element.value.trim();
  switch (element_name) {
    case "input_root_dir":
      common_input_dir = "";
      if (value.endsWith("/")) {
        value = value.slice(0, -1);
      }
      common_input_dir = value;
      document
        .getElementsByName("common_input_dir")
        .forEach((element) => (element.value = value));
      break;
    case "rad-reorient-method":
      configs.Analysis.Orientation = value;
      break;
    case "registration-method":
      configs.Analysis.RegistrationMethod = value;
      break;
    case "brain-extraction-method":
      configs.Analysis.BrainExtractionMethod = value;
      break;
    case "bids_root_dir":
      if (value.startsWith("/")) {
        value = value.slice(1);
      }
      document
        .getElementsByName("bids_root_dir")
        .forEach((element) => (element.value = value));
      configs.BIDSRoot = common_input_dir_replace + value;
      break;
    case "rois_dir":
      if (value.startsWith("/")) {
        value = value.slice(1);
      }
      document
        .getElementsByName("rois_dir")
        .forEach((element) => (element.value = value));
      configs.ROIDir = common_input_dir_replace + value;
      break;
    case "t1_desc":
      configs.T1Entities.desc = value;
      break;
    case "t1_space":
      configs.T1Entities.space = value;
      break;
    case "lesion_mask_suffix":
      configs.LesionEntities.suffix = value;
      break;
    case "lesion_mask_space":
      configs.LesionEntities.space = value;
      break;
    case "lesion_mask_label":
      configs.LesionEntities.label = value;
      break;
    case "subject":
      configs.Subject = value;
      break;
    case "session":
      configs.Session = value;
      break;
    case "wm_seg_dir":
      if (value.startsWith("/")) {
        value = value.slice(1);
      }
      document
        .getElementsByName("wm_seg_dir")
        .forEach((element) => (element.value = value));
      configs.WhiteMatterSegmentationRoot = common_input_dir_replace + value;
      break;
    case "lesion_root_dir":
      if (value.startsWith("/")) {
        value = value.slice(1);
      }
      document
        .getElementsByName("lesion_root_dir")
        .forEach((element) => (element.value = value));
      configs.LesionRoot = common_input_dir_replace + value;
      break;
    case "multiprocessing":
      configs.Multiprocessing = value;
      break;

    case "multiprocessing":
      configs.Multiprocessing = value;
      break;
    case "output_dir":
      configs.Outputs.Root = configs.Outputs.Root;
      common_output_dir = value;
      break;
    case "out_start_reg_space":
      configs.Outputs.StartRegistrationSpace = value;
      break;
    case "output_reg_space":
      configs.Outputs.OutputRegistrationSpace = value;
      break;
    case "out_reg_transform":
      configs.Outputs.RegistrationTransform = value;
      break;
    case "out_reorient":
      configs.Outputs.Reorient = value;
      break;
    case "out_brain_reg":
      configs.Outputs.BrainExtraction = value;
      break;
    case "out_lesion_corr":
      configs.Outputs.LesionCorrected = value;
      break;
    case "bet_frac":
      configs.BrainExtraction.frac = value;
      break;
    case "reg_cost_func":
      configs.Registration.cost_func = value;
      break;
    case "reg_ref":
      configs.Registration.reference = common_input_dir_replace + value;
      break;
    case "img_norm_min":
      configs.LesionCorrection.ImageNormMin = value;
      break;
    case "img_norm_max":
      configs.LesionCorrection.ImageNormMax = value;
      break;
    case "wm_spread":
      configs.LesionCorrection.WhiteMatterSpread = value;
      break;
    case "heatmap_transparency":
      configs.HeatMap.Transparency = value;
      break;
    case "heatmap_ref":
      configs.HeatMap.Reference = common_input_dir_replace + value;
      break;
    default:
      console.log("No handler for this text change");
  }
  itemsUpdated();
}

function toggleTextBox(textBoxId, toggle) {
  $("#" + textBoxId).prop("disabled", toggle);
}

function toggleDiv(div_id, enable) {
  if (enable) {
    $("#" + div_id).removeClass("disable_div");
  } else {
    $("#" + div_id).addClass("disable_div");
  }
}

function toggleComponent(component_id, ms, show) {
  if (show) {
    $("#" + component_id).show(ms);
  } else {
    $("#" + component_id).hide(ms);
  }
}

function onCheckboxToggle(element) {
  var element_name = element.name;
  var value = element.checked;
  switch (element_name) {
    case "Re_orient_radiological":
      configs.Analysis.Reorient = value;
      toggleTextBox("rad_reorient-4", !value);
      document.getElementById("rad_reorient-4").value = value
        ? configs.Analysis.Orientation
        : "";
      document.getElementById("rad_reorient-1").checked = value;
      break;
    case "Registration":
      configs.Analysis.Registration = value;
      toggleTextBox("registration-4", !value);
      document.getElementById("registration-4").value = value
        ? configs.Analysis.RegistrationMethod
        : "";
      toggleDiv("registration_div", value);
      document.getElementById("registration-1").checked = value;
      document.getElementById("reg-2").value = configs.Registration.cost_func;
      break;
    case "brain_extraction":
      configs.Analysis.BrainExtraction = value;
      toggleTextBox("brain_extraction-4", !value);
      document.getElementById("brain_extraction-4").value = value
        ? configs.Analysis.BrainExtractionMethod
        : "";
      toggleDiv("brain_extraction_div", value);
      document.getElementById("brain_extraction-1").checked = value;
      document.getElementById("bet_mask").checked = configs.BrainExtraction.mask;
      document.getElementById("bet_frac").checked = configs.BrainExtraction.frac;
      break;
    case "wm_segmentation":
      configs.Analysis.WhiteMatterSegmentation = value;
      document.getElementById("wm_segmentation-1").checked = value;
      break;
    case "Lesion_correction":
      configs.Analysis.LesionCorrection = value;
      toggleDiv("lesion_correction_div", value);
      document.getElementById("Lesion_correction-1").checked = value;
      document.getElementById("lc-2").value = configs.LesionCorrection.ImageNormMin;
      document.getElementById("lc-4").value = configs.LesionCorrection.ImageNormMax;
      document.getElementById("lc-6").value = configs.LesionCorrection.WhiteMatterSpread;
      break;

    case "Lesion_load_calculation":
      configs.Analysis.LesionLoadCalculation = value;
      document.getElementById("Lesion_load_calculation-1").checked = value;
      break;

    case "heatmap":
      configs.Analysis.HeatMap = value;
      toggleDiv("heatmap_div", value);
      document.getElementById("heatmap-1").checked = value;
      document.getElementById("heatmap-4").value = configs.HeatMap.Transparency
      break;
    case "bet_mask":
      configs.BrainExtraction.mask = value;
      document.getElementById("bet_identifier-2").checked = value;
      break;
    default:
      console.log("Invalid selections");
  }
  itemsUpdated();
}

$("select").selectpicker();

$(document).ready(function () {
  // toggleComponent("lesion-mask", 0);
  toggleComponent("lesion-correction", 0, false);
  toggleTextBox("rad_reorient-4", true); //LAS
  toggleTextBox("registration-4", true); //FLIRT
  toggleTextBox("brain_extraction-4", true); //BET
  toggleDiv("brain_extraction_div", false);
  toggleDiv("registration_div", false);
  toggleDiv("lesion_correction_div", false);
  toggleDiv("heatmap_div", false);
  itemsUpdated();
  initializeToolTips();
});

function itemsUpdated() {
  download();
}

function download() {
  var button = document.getElementById("download-btn");

  if (configs.Analysis.Registration) {
    button.href = "";
    if (!configs.Outputs.OutputRegistrationSpace) {
      button.text = "Output Registration Space must be defined";
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
      return;
    }
  } else {
    configs.Outputs.OutputRegistrationSpace =
      configs.Outputs.StartRegistrationSpace;
  }

  if (
    (configs.WhiteMatterSegmentationRoot === "") &
    !configs.Analysis.WhiteMatterSegmentation &
    configs.Analysis.LesionCorrection
  ) {
    button.text =
      "White Matter Segmentation Root is required for Lesion Correction";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }
  if (
    (configs.Analysis.LesionLoadCalculation || configs.Analysis.HeatMap) &
    (configs.LesionRoot === "")
  ) {
    button.text =
      "Lesion Root input is invalid and required for Lesion Load Calculation and Lesion Heatmap";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (configs.T1Entities.desc === "" || configs.T1Entities.space === "") {
    button.text = "T1 Anatomical Image Identifiers are required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (
    configs.LesionEntities.label === "" ||
    configs.LesionEntities.space === "" ||
    configs.LesionEntities.suffix === ""
  ) {
    button.text = "Lesion Mask Image Identifiers are required.";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (configs.Analysis.Registration & (configs.Registration.reference === '' || configs.Registration.cost_func === '')){
    button.text = "Configuration for registration using FLIRT is required";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (configs.Analysis.HeatMap & (configs.HeatMap.Reference === '' || configs.HeatMap.Transparency === '')){
    button.text = "Configuration for heatmap is required";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (common_input_dir === ''){
    button.text = "BIDS root directory is required";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (configs.ROIDir === ''){
    button.text = "ROIs directory is required";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (common_output_dir === ''){
    button.text = "Output directory is required";
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    return;
  }

  if (configs.Outputs.StartRegistrationSpace === ''){
    button.text = "Start Registration Space is required";
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

function setToolTips(element_id, text) {
  $(element_id).attr("title", text).tooltip("show").tooltip("hide");
}

function initializeToolTips() {
  def_reorient =
    "This module will check that all subject inputs are in the same orientation, flag subjects that have mismatched input orientations, and convert all remaining inputs to radiological convention. This is recommended for all datasets, and especially for multi-site data.";
  def_orientation =
    "Orientation to standardize to. Options: L/R (left/right), A/P (anterior/posterior), I/S (inferior/superior). Default is LAS.";
  def_registration =
    "This module will perform registration to a common template.";
  def_registration_method =
    "Registration method. Example: FLIRT (default) or leave blank (no registration).";
  def_brain_extraction = "This module will perform brain extraction.";
  def_brain_extraction_method =
    "Method to use for brain extraction. Options: BET (default) or leave blank (no brain extraction).";
  def_white_matter_segmentation =
    "This module will perform white matter segmentation. If false, and you want to perform LesionCorrection, you must place file in same location as the input files in the BIDS structure.";
  def_lesion_correction =
    "This module will perform lesion correction. If true, requires white matter segmentation file.";
  def_lesion_load_calculation = "This module will compute lesion load.";
  def_lesion_heatmap = "This module will combine the lesions into a heatmap.";

  def_lc_image_norm_min = "Minimum value for image.";
  def_lc_image_norm_max = "Maximum value for image.";
  def_lc_wm_spread =
    "The deviation of the white matter intensity as a fraction of the mean white matter intensity.";

  def_parent_input_dir = "Direcory path that contains ALL files including reference files and files of subjects."
  def_bids_root_dir =
    "Directory path to the BIDS root directory for the raw data.";
  def_input_subject =
    "ID of the subject to run. Runs all subjects if left blank. Ex: r001s001";
  def_input_session =
    "ID of the session to run. Runs all sessions if left blank. Ex: 1";
  def_input_lesion_root =
    "Path to the BIDS root directory for the lesion masks. Must be present inside BIDS Root Directory.";
  def_white_matter_segmentation_root =
    "Path to the BIDS root directory for the white matter segmentation files. Must be present inside BIDS Root Directory.";
  def_input_ROIDir =
    "Path to the directory containing ROI image files. Must be present inside BIDS Root Directory.";

  def_lesion_identifier_space =
    "Provide the space for your lesion file. For example, put 'MNIEx2009aEx' if your file is sub-r044s001_ses-1_space-MNIEx2009aEx_label-L_desc-T1lesion_mask.nii";
  def_lesion_identifier_label =
    "Provide the label for your lesion file. For example, put 'L' if your file is sub-r044s001_ses-1_space-MNIEx2009aEx_label-L_desc-T1lesion_mask.nii";
  def_lesion_identifier_suffix =
    "Provide the suffix for your lesion file. For example, put 'mask' if your file is sub-r044s001_ses-1_space-MNIEx2009aEx_label-L_desc-T1lesion_mask.nii";

  def_reg_ext_reference =
    "Path to reference file. Must be present inside BIDS Root Directory.";
  def_reg_ext_cost_func = "Cost function for registration";

  def_T1_identifier_space =
    "Provide the space for your T1 file. For example, put 'MNIEx2009aEx' if your file is sub-r044s001_ses-1_space-MNIEx2009aEx_desc-T1FinalResampledNorm.nii";
  def_T1_identifier_desc =
    "Provide the desc for your T1 file. For example, put 'T1FinalResampledNorm' if your file is sub-r044s001_ses-1_space-MNIEx2009aEx_desc-T1FinalResampledNorm.nii";

  def_heatmap_reference =
    "Overlays the heatmap on this image and creates NIFTI file with overlay and NITFI file with the mask only. Also produces 4 PNGS: 9 slices of the lesions from sagittal, axial, and coronal orientations (3 images) and an image with a cross-section of each orientation. If your images are pre-registered, you MUST use your own reference image used for their registration. Must be present inside BIDS Root Directory.";
  def_heatmap_transparency =
    "Transparency to use when mixing the reference image and the heatmap. Smaller values darker reference and lighter heatmap.";

  def_output_root = "Path to directory where to place the output.";
  def_start_reg_space =
    'Value to use for "space" entity in BIDS output filename.';
  def_output_reg_space = "Reserved for future use.";
  def_output_reg_transform = "Path for saving registration transform.";
  def_output_reorient = "Path for saving reoriented volume.";
  def_output_brain_extraction = "Path for saving the brain extracted volume.";
  def_output_lesion_correction =
    "Path for saving the white matter-corrected lesions.";

  $("body").tooltip({ selector: "[data-toggle=tooltip]" });

  setToolTips("#rad_reorient-1", def_reorient);
  setToolTips("#rad_reorient-2", def_reorient);

  setToolTips("#rad_reorient-3", def_orientation);
  setToolTips("#rad_reorient-4", def_orientation);

  setToolTips("#registration-1", def_registration);
  setToolTips("#registration-2", def_registration);

  setToolTips("#registration-3", def_registration_method);
  setToolTips("#registration-4", def_registration_method);

  setToolTips("#brain_extraction-1", def_brain_extraction);
  setToolTips("#brain_extraction-2", def_brain_extraction);

  setToolTips("#brain_extraction-3", def_brain_extraction_method);
  setToolTips("#brain_extraction-4", def_brain_extraction_method);

  setToolTips("#wm_segmentation-1", def_white_matter_segmentation);
  setToolTips("#wm_segmentation-2", def_white_matter_segmentation);

  setToolTips("#Lesion_correction-1", def_lesion_correction);
  setToolTips("#Lesion_correction-2", def_lesion_correction);

  setToolTips("#Lesion_load_calculation-1", def_lesion_load_calculation);
  setToolTips("#Lesion_load_calculation-2", def_lesion_load_calculation);

  setToolTips("#heatmap-1", def_lesion_heatmap);
  setToolTips("#heatmap-2", def_lesion_heatmap);

  setToolTips("#input_dir", def_parent_input_dir);
  setToolTips("#input_dir-2", def_parent_input_dir);

  setToolTips("#input_id-1", def_bids_root_dir);
  setToolTips("#input_id-2", def_bids_root_dir);

  setToolTips("#input_id-3", def_bids_root_dir);
  setToolTips("#input_id-26", def_input_ROIDir);

  setToolTips("#input_id-6", def_T1_identifier_desc);
  setToolTips("#input_id-7", def_T1_identifier_desc);

  setToolTips("#input_id-8", def_T1_identifier_space);
  setToolTips("#input_id-9", def_T1_identifier_space);

  setToolTips("#input_id-11", def_lesion_identifier_suffix);
  setToolTips("#input_id-12", def_lesion_identifier_suffix);

  setToolTips("#input_id-13", def_lesion_identifier_space);
  setToolTips("#input_id-14", def_lesion_identifier_space);

  setToolTips("#input_id-15", def_lesion_identifier_label);
  setToolTips("#input_id-16", def_lesion_identifier_label);

  setToolTips("#input_id-17", def_input_subject);
  setToolTips("#input_id-18", def_input_subject);

  setToolTips("#input_id-19", def_input_session);
  setToolTips("#input_id-20", def_input_session);

  setToolTips("#input_id-21", def_white_matter_segmentation_root);
  setToolTips("#input_id-22", def_white_matter_segmentation_root);

  setToolTips("#input_id-23", def_input_lesion_root);
  setToolTips("#input_id-24", def_input_lesion_root);

  setToolTips("#output_id-1", def_output_root);
  setToolTips("#output_id-2", def_output_root);

  setToolTips("#output_id-3", def_start_reg_space);
  setToolTips("#output_id-4", def_start_reg_space);

  setToolTips("#output_id-5", def_output_reg_space);
  setToolTips("#output_id-6", def_output_reg_space);

  setToolTips("#output_id-7", def_output_reg_transform);
  setToolTips("#output_id-8", def_output_reg_transform);

  setToolTips("#output_id-9", def_output_reorient);
  setToolTips("#output_id-10", def_output_reorient);

  setToolTips("#output_id-11", def_output_brain_extraction);
  setToolTips("#output_id-12", def_output_brain_extraction);

  setToolTips("#output_id-13", def_output_root);
  setToolTips("#output_id-14", def_output_root);

  setToolTips("#reg-1", def_reg_ext_cost_func);
  setToolTips("#reg-2", def_reg_ext_cost_func);

  setToolTips("#reg-3", def_reg_ext_reference);
  setToolTips("#reg-4", def_reg_ext_reference);

  setToolTips("#lc-1", def_lc_image_norm_min);
  setToolTips("#lc-2", def_lc_image_norm_min);

  setToolTips("#lc-3", def_lc_image_norm_max);
  setToolTips("#lc-4", def_lc_image_norm_max);

  setToolTips("#lc-5", def_lc_wm_spread);
  setToolTips("#lc-6", def_lc_wm_spread);

  setToolTips("#heatmap-3", def_heatmap_transparency);
  setToolTips("#heatmap-4", def_heatmap_transparency);

  setToolTips("#heatmap-5", def_heatmap_reference);
  setToolTips("#heatmap-6", def_heatmap_reference);
}
