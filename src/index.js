import { install } from './install'
import { inBrowser } from './util/dom'
const VCI = {
  install: install,
  version: '__VERSION__'
}
export default VCI
if (inBrowser && window.Vue) {
  window.Vue.use(VCI,{
    noInspect:['ElPagination', 'ElDialog', 'ElAutocomplete', 'ElDropdown', 'ElDropdownMenu', 'ElDropdownItem', 'ElMenu', 'ElSubmenu', 'ElMenuItem', 'ElMenuItemGroup', 'ElInput', 'ElInputNumber', 'ElRadio', 'ElRadioGroup', 'ElRadioButton', 'ElCheckbox', 'ElCheckboxButton', 'ElCheckboxGroup', 'ElSwitch', 'ElSelect', 'ElOption', 'ElOptionGroup', 'ElButtonGroup', 'ElTable', 'ElTableColumn', 'ElDatePicker', 'ElTimeSelect', 'ElTimePicker', 'ElPopover', 'ElTooltip', 'ElBreadcrumb', 'ElBreadcrumbItem', 'ElForm', 'ElFormItem', 'ElTabs', 'ElTabPane', 'ElTag', 'ElTree', 'ElAlert', 'ElSlider', 'ElIcon', 'ElRow', 'ElCol', 'ElUpload', 'ElProgress', 'ElSpinner', 'ElBadge', 'ElCard', 'ElRate', 'ElSteps', 'ElStep', 'ElCarousel', 'ElScrollbar', 'ElCarouselItem', 'ElCollapse', 'ElCollapseItem', 'ElCascader', 'ElColorPicker', 'ElTransfer', 'ElContainer', 'ElHeader', 'ElAside', 'ElMain', 'ElFooter', 'ElTimeline', 'ElTimelineItem', 'ElLink', 'ElDivider', 'ElImage', 'ElCalendar', 'ElBacktop', 'ElPageHeader', 'ElCascaderPanel', 'ElAvatar', 'ElDrawer', 'ElPopconfirm', 'ElCollapseTransition', 'ElTreeNode', undefined, 'SvgIcon', 'SidebarItem','ElTableBody','ElTableHeader','ElSelectDropdown']
  })
}
