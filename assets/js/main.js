var configs = {
  "modules": {
    "Re_orient_radiological": false,
    "Lesion_correction": false,
    "Lesion_load_calculation": false,
    "Visual_QC": false
  },

  "common_settings": {
    "input_dir": "/input/",
    "output_dir": "/output/",
    "t1_id": "",
    "lesion_mask_id": "this_field_is_deliberately_left_like_this",
    "same_anatomical_space": false
  },

  "module_settings": {
    "Lesion_correction": {
      "bet_performed": false,
      "bet_identifier": "",
      "wms_performed": false,
      "wms_identifier": "",
      "t1_intensity_percent": 5.0
    },

    "Lesion_load_calculation": {
      "bet_performed": false,
      "bet_identifier": "",
      "roi_names": {
        "default": {
          "corticospinal_tracts": [],
          "fs_cortical": [],
          "fs_sub_cortical": [],
          "additional": []
        },
        "free_surfer": {
          "fs_cortical": [],
          "fs_sub_cortical": []
        },
        "own": {
          "template_brain": "",
          "own_rois": false
        }
      }
    }
  }
};

function onTextChange(element) {
  var element_name = element.name;
  var value = element.value.trim();
  switch (element_name) {
    case "input_dir":
      configs.common_settings.input_dir = value;
      break;
    case "output_dir":
      configs.common_settings.output_dir = value;
      break;
    case "t1_id":
      configs.common_settings.t1_id = value;
      break;
    case "lesion_mask_id":
      configs.common_settings.lesion_mask_id = value || 'this_field_is_deliberately_left_like_this';
      break;
    case "bet_identifier_1":
      configs.module_settings.Lesion_correction.bet_identifier = value;
      break;
    case "bet_identifier_2":
      configs.module_settings.Lesion_load_calculation.bet_identifier = value;
      break;
    case "wms_identifier":
      configs.module_settings.Lesion_correction.wms_identifier = value;
      break;
    case "template_brain":
      configs.module_settings.Lesion_load_calculation.roi_names.own.template_brain = value;
      break;
    default:
      console.log("No handler for this text change");
  }
  itemsUpdated();
}

function toggleTextBox(textBoxId, toggle) {
  $("#" + textBoxId).prop( "disabled", toggle);
}

function toggleDiv(div_id, enable) {
  if (enable) {
    $("#" + div_id).removeClass("disable_div");
  }
  else {
    $("#" + div_id).addClass("disable_div");
  }
}

function toggleComponent(component_id, ms, show) {
  if (show){
    $("#" + component_id).show(ms);
  }
  else {
    $("#" + component_id).hide(ms);
  }
}

function lesionLoadToggle(is_selected) {
  configs.modules.Lesion_load_calculation = is_selected;
  document.getElementById("Lesion_load_calculation-1").checked = is_selected;
  toggleComponent("lesion-load-calculation-1", 500, is_selected);
  toggleComponent("lesion-load-calculation-2", 500, is_selected);
  toggleComponent("lesion-load-calculation-3", 500, is_selected);
  toggleComponent("lesion-load-calculation-4", 500, is_selected);
  toggleComponent("lesion-load-calculation-5", 500, is_selected);
  toggleComponent("lesion-load-calculation-6", 500, is_selected);
  toggleComponent("lesion-load-calculation-7", 500, is_selected);
  toggleComponent("lesion-load-calculation-8", 500, is_selected);
  toggleComponent("lesion-load-calculation-9", 500, is_selected);
  if (is_selected) {
    visualQCToggle(false);
  }
}

function reOrientToggle(is_selected) {
  configs.modules.Re_orient_radiological = is_selected;
  document.getElementById("rad_reorient-1").checked = is_selected;
  if (is_selected) {
    visualQCToggle(false);
  }
}

function lesionCorrectionToggle(is_selected) {
  configs.modules.Lesion_correction = is_selected;
  document.getElementById("Lesion_correction-1").checked = is_selected;
  toggleComponent("lesion-correction", 500, is_selected);
  if (is_selected) {
    visualQCToggle(false);
  }
}

function visualQCToggle(is_selected) {
  configs.modules.Visual_QC = is_selected;
  document.getElementById("visual-qc-1").checked = is_selected;
  if (is_selected){
    lesionLoadToggle(false);
    reOrientToggle(false);
    lesionCorrectionToggle(false);
  }
}

function onCheckboxToggle(element) {
  var element_name = element.name;
  var value = element.checked;
  switch (element_name) {
    case "Re_orient_radiological":
      reOrientToggle(value);
      break;

    case "Lesion_correction":
      lesionCorrectionToggle(value);
      break;

    case "Lesion_load_calculation":
      lesionLoadToggle(value);
      break;

    case "bet_performed_1":
      configs.module_settings.Lesion_correction.bet_performed = value;
      toggleTextBox("bet_identifier_1", !value);
      break;

    case "bet_performed_2":
      configs.module_settings.Lesion_load_calculation.bet_performed = value;
      toggleTextBox("bet_identifier_2", !value);
      break;

    case "wms_performed":
      configs.module_settings.Lesion_correction.wms_performed = value;
      toggleTextBox("wms_identifier", !value);
      break;

    case "verify_fs":
      toggleDiv("lesion-load-calculation-6_1", value);
      break;

    case "own_rois":
      configs.module_settings.Lesion_load_calculation.roi_names.own.own_rois = value;
      break;

    case "Visual_QC":
      visualQCToggle(value);
      break;

    default:
      console.log("Invalid selections");
  }
  itemsUpdated();
}

function updateSelectedROIS() {
  configs.module_settings.Lesion_load_calculation.roi_names.default.corticospinal_tracts = $("#default_corticospinal_tracts").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.default.fs_cortical = $("#default_fs_cortical").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.default.fs_sub_cortical = $("#default_fs_sub_cortical").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.default.additional = $("#additional_rois").val() || [];

  configs.module_settings.Lesion_load_calculation.roi_names.free_surfer.fs_cortical = $("#fs_cortical").val() || [];

  configs.module_settings.Lesion_load_calculation.roi_names.free_surfer.fs_sub_cortical = $("#fs_sub_cortical").val() || [];

  itemsUpdated();

  console.log(configs);
}

$('select').selectpicker();

$('select').on('change', function(e){
  updateSelectedROIS();
});

$(document).ready(function () {
  // toggleComponent("lesion-mask", 0);
  toggleComponent("lesion-correction", 0, false);
  toggleComponent("lesion-load-calculation-1", 0, false);
  toggleComponent("lesion-load-calculation-2", 0, false);
  toggleComponent("lesion-load-calculation-3", 0, false);
  toggleComponent("lesion-load-calculation-4", 0, false);
  toggleComponent("lesion-load-calculation-5", 0, false);
  toggleComponent("lesion-load-calculation-6", 0, false);
  toggleComponent("lesion-load-calculation-7", 0, false);
  toggleComponent("lesion-load-calculation-8", 0, false);
  toggleComponent("lesion-load-calculation-9", 0, false);
  toggleTextBox("wms_identifier", true);
  toggleTextBox("bet_identifier_1", true);
  toggleTextBox("bet_identifier_2", true);
  itemsUpdated();
  toggleDiv("lesion-load-calculation-6_1", false);
  initializeToolTips();
});

function itemsUpdated() {
  download();
}


function download() {
  var button = document.getElementById("download-btn");

  if (configs.common_settings.t1_id === '' || configs.common_settings.lesion_mask_id === '' || configs.common_settings.lesion_mask_id === 'this_field_is_deliberately_left_like_this') {
    button.href = "";
    if (configs.modules.Lesion_correction === true || configs.modules.Lesion_load_calculation === true) {
      button.text = "T1 Identifier and Lesion Mask Id are required fields. Provide values for these fields to download the config file";
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
      return;
    }
    if(configs.common_settings.t1_id === '') {
      button.text = "T1 Identifier is the required field. Provide a valid value to download the config file";
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
      return;
    }
  }

  button.classList.remove("btn-secondary");
  button.classList.add("btn-primary");

  var text = JSON.stringify(configs, null, 4);
  var file = new Blob([text], {type: 'text/plain'});
  button.text = "Click here to download the config file";
  button.href = URL.createObjectURL(file);
  button.download = 'config.json';
}

function setToolTips(element_id, text) {
  $(element_id).attr('title', text)
    .tooltip('show')
    .tooltip('hide');
}

function initializeToolTips() {
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  var text = "This module will check that all subject inputs are in the same orientation, flag subjects that have mismatched input orientations, and convert all remaining inputs to radiological convention. This is recommended for all datasets, and especially for multi-site data.";
  setToolTips("#rad_reorient-1", text);
  setToolTips("#rad_reorient-2", text);

  text = "This module is for manually segmented lesions. This aims to correct for intact white matter voxels that may have been inadvertently included in a manually segmented mask by removing voxels in the lesion mask that are within the intensity range of a white matter mask.";
  setToolTips("#Lesion_correction-1", text);
  setToolTips("#Lesion_correction-2", text);

  text = "This module will perform lesion load for several different ROI selections: default ROIs, freesurfer segmentations, and user-input ROIs.";
  setToolTips("#Lesion_load_calculation-1", text);
  setToolTips("#Lesion_load_calculation-2", text);

  text = "This module can only be selected if none of the other modules are selected. This will create a visual inspection page with lesion masks overlaid on T1s. Visual control will be performed by default for the lesion load and lesion correction modules";
  setToolTips("#visual-qc-1", text);
  setToolTips("#visual-qc-2", text);

  text = "Provide the T1 identifier to your whole-brain anatomical images. Note: this identifier should be unique to the anatomical whole-brain image only. For example, put 'T1' if subject1's T1 file is subj01_T1.nii.gz.";
  setToolTips("#t1_id-1", text);
  setToolTips("#t1_id-2", text);

  text = "Provide the identifier for your lesion mask. For example, put 'Lesion' if subject1's lesion mask files is subj01_Lesion.nii.gz.";
  setToolTips("#lesion_mask_id-1", text);
  setToolTips("#lesion_mask_id-2", text);

  text = "Indicate if you have already performed brain extraction for all subjects. Each subject directory should contain a skull-stripped brain. If not, PALS will perform brain extraction for all subjects using FSL BET. *NOTE: Skull-stripped brain files must be present in each subject directory. If any subject is missing a brain file, PALS will run brain extraction on all subjects.";
  setToolTips("#bet_performed_1-1", text);
  setToolTips("#bet_performed_1-2", text);
  setToolTips("#bet_performed_2-1", text);
  setToolTips("#bet_performed_2-2", text);

  text = "Indicate the unique identifier for skull-stripped brain files. For example, 'Brain' if subject1's brain file is subj01_Brain.nii.gz.";
  setToolTips("#bet_identifier_1", text);
  setToolTips("#bet_identifier_1-1", text);
  setToolTips("#bet_identifier_2", text);
  setToolTips("#bet_identifier_2-1", text);

  text = "Indicate if you have already performed white matter segmentation on all subjects. Each subject directory should contain a white matter mask. If not, PALS will perform white matter segmentation for all subjects using FSL FAST. *NOTE: White matter mask files must be present in each subject directory. If any subject is missing a white matter mask, PALS will run white matter segmentation on all subjects.";
  setToolTips("#wms_performed-1", text);
  setToolTips("#wms_performed-2", text);

  text = "Indicate the unique identifier for white matter masks. For example, 'wm' if subject1's white matter mask filename is subj01_wm.nii.gz.";
  setToolTips("#wms_identifier", text);
  setToolTips("#wms_identifier-1", text);

  text = "NOTE: all of these template ROIs are in 2mm MNI152 template space.";
  setToolTips("#default_corticospinal_tracts-1", text);
  setToolTips("#default_fs_cortical-1", text);
  setToolTips("#default_fs_sub_cortical-1", text);

  text = "Select if you would like to use subject-specific Freesurfer segmentations to calculate lesion load. This operation requires that Freesurfer cortical and subcortical segmentation has already been performed for each subject, and each subject directory must contain an aparc+aseg.mgz and T1.mgz file.";
  setToolTips("#verify_fs-1", text);
  setToolTips("#verify_fs-2", text);

  text = "Select if you would like import your own regions of interest to calculate lesion load. NOTE: these ROIs must all be in the same space.";
  setToolTips("#own_rois-1", text);

};

