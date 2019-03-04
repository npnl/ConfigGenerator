var configs = {
  "modules": {
    "Re_orient_radiological": false,
    "Lesion_correction": false,
    "Lesion_load_calculation": false,
    "Visual_QC": false
  },

  "common_settings": {
    "input_dir": "/pals/input/",
    "output_dir": "/pals/output/",
    "t1_id": "",
    "lesion_mask_id": "",
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
          "fs_sub_cortical": []
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
  var value = element.value;
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
      configs.common_settings.lesion_mask_id = value;
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

function toggleComponent(component_id, ms) {
  $("#" + component_id).toggle(ms);
}

function onCheckboxToggle(element) {
  var element_name = element.name;
  var value = element.checked;
  switch (element_name) {
    case "Re_orient_radiological":
      configs.modules.Re_orient_radiological = value;
      break;

    case "Lesion_correction":
      configs.modules.Lesion_correction = value;
      toggleComponent("lesion-correction", 500);
      break;

    case "Lesion_load_calculation":
      configs.modules.Lesion_load_calculation = value;
      toggleComponent("lesion-load-calculation-1", 500);
      toggleComponent("lesion-load-calculation-2", 500);
      toggleComponent("lesion-load-calculation-3", 500);
      toggleComponent("lesion-load-calculation-4", 500);
      toggleComponent("lesion-load-calculation-5", 500);
      toggleComponent("lesion-load-calculation-6", 500);
      toggleComponent("lesion-load-calculation-7", 500);
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


    default:
      console.log("Invalid selections");
  }
  itemsUpdated();
}

function updateSelectedROIS() {
  configs.module_settings.Lesion_load_calculation.roi_names.default.corticospinal_tracts = $("#default_corticospinal_tracts").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.default.fs_cortical = $("#default_fs_cortical").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.default.fs_sub_cortical = $("#default_fs_sub_cortical").val() || [];

  configs.module_settings.Lesion_load_calculation.roi_names.free_surfer.fs_cortical = $("#fs_cortical").val() || [];
  configs.module_settings.Lesion_load_calculation.roi_names.free_surfer.fs_sub_cortical = $("#fs_sub_cortical").val() || [];

  itemsUpdated();

  console.log(configs);
}

function printConfigs() {
  console.log(configs);
}

$('select').selectpicker();

$('select').on('change', function(e){
  updateSelectedROIS();
});

$(document).ready(function () {
  toggleComponent("lesion-correction", 0);
  toggleComponent("lesion-load-calculation-1", 0);
  toggleComponent("lesion-load-calculation-2", 0);
  toggleComponent("lesion-load-calculation-3", 0);
  toggleComponent("lesion-load-calculation-4", 0);
  toggleComponent("lesion-load-calculation-5", 0);
  toggleComponent("lesion-load-calculation-6", 0);
  toggleComponent("lesion-load-calculation-7", 0);
  toggleTextBox("wms_identifier", true);
  toggleTextBox("bet_identifier_1", true);
  toggleTextBox("bet_identifier_2", true);
  itemsUpdated();
  toggleDiv("lesion-load-calculation-6_1", false);
});

function itemsUpdated() {
  download();
}


function download() {
  var text = JSON.stringify(configs, null, 4);
  var a = document.getElementById("a");
  var file = new Blob([text], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'config.json';
}