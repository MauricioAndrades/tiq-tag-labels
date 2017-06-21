utui.labels.helper.getLabelExpandedClass();

$('.manage_container').each(function(i, elem) {
    utui.labels.helper.redrawLabels(utui.labels.getLabels(), elem.id, 'manage');
})

var children = $('.manage_container').children(),
labelsExpanded = utui.labels.helper.getLabelsExpandedForTab();

for (var i = 0; i < children.length; i++) {
    this.setTitle(children[i].id, labelsExpanded);
}


$('.container_label').each(function(i, elem) {
    var $elem = $(elem);
    $elem.css('border', '1px dotted blue');
    if (!elem.hasChildNodes())
        $elem.css('width', '1px');
    $elem.offset({
        left: ($elem.position()).left + 400;
    });

})

utui.util.pubsub.subscribe(utui.constants.views.TAB_CLICK, function() {
    function get_checkbox_state() {
        var current_tab = utui.config.currentTab;
        var selector = '.chkbox' + '_' + current_tab;
        var checked = false;
        var check_boxes = document.querySelectorAll(selector);
        if (check_boxes) {
            for (let i = 0; i < check_boxes.length; i++) {
                if (check_boxes[i].checked) {
                    checked = true;
                    break;
                }
            }
        }
        return checked;
    }
    if (get_checkbox_state()) {
        window.requestAnimationFrame(function(){
            $('.container_labels').css('display', 'none');
        })
    }
})

var events = [
  "accordion_expanded_tag",
  "added_data_layer_spec",
  "added_environment",
  "added_label",
  "added_tag",
  "added_test_config",
  "added_variable",
  "assigned_label",
  "audit_details_view",
  "audit_details_view_scan_companion",
  "audits_account_status_changed_reports",
  "audits_create_site_scan",
  "audits_run_site_scan",
  "before_save_profile",
  "cancelled_save_profile",
  "changed_account",
  "changed_label",
  "changed_profile",
  "cleared_profile",
  "core_resources_loaded",
  "created_users",
  "custom_targets_status_changed",
  "focused_data_layer_spec",
  "focused_extension",
  "focused_loadrule",
  "focused_tag",
  "focused_test_config",
  "focused_variable",
  "intro_init",
  "latest_version_changed_profile",
  "library_import",
  "library_imported",
  "loaded_account",
  "loaded_profile",
  "loaded_users",
  "menu_closing",
  "menu_opening",
  "message_posted",
  "others_updated_revision",
  "profile_created",
  "publish_configuration_updated_publish",
  "published_profile",
  "quickstart",
  "removed_environment",
  "removed_label",
  "removed_profile",
  "removed_tag",
  "removed_test_config",
  "removed_variable",
  "saved_as_profile",
  "saved_profile",
  "set_publish_data_profile",
  "settings_updated_profile",
  "svrstream_account_status_changed",
  "tab_clicked",
  "tagging_event",
  "tutorial_ended",
  "tutorial_step",
  "unassigned_label",
  "updated_data_layer_spec",
  "updated_extension_condition",
  "updated_profile_template",
  "updated_tag",
  "updated_tag_mappings",
  "updated_test_config",
  "updated_user",
  "updated_variable",
  "updated_version_template",
  "version_created",
  "workflow_approve_complete_publish",
  "workflow_approve_start_publish",
  "workflow_ask_publish",
  "workflow_cancelled_publish",
  "workflow_decline_publish",
  "workflow_pending_publish",
  "wrike_request"
]

utui.util.pubsub.subscribe(utui.constants.profile.LOADED, function() {
    console.timeStamp('profile loaded');
    var selector = '#customizeContainer_headerControls';
      var node = document.querySelector(selector);
      console.log(node)
});


var find_selected_extension = function() {
    return $('#customize_content').find('.ui-accordion-content-active').closest('.customize_container').get(0);
};

var get_active_tab = function() {
    return document.querySelector('#tabs_content > .ui-state-active').textContent.trim().toLowerCase();
};

$('#tabs').on('mousedown', function(e) {
    e.target.textContent.trim().toLowerCase();
});

        utui.loadrules.view.renderTitle(loadruleObj, utui.labels.helper.getLabelsExpandedForTab());

$labelContainers.each(function() {
                utui.labels.helper.bindLabelHoverList($(this));
            });
