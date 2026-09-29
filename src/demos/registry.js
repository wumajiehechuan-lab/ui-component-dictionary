/**
 * ★ 核心扩展点：demo.type → 渲染器映射。
 *
 * 新增组件：
 *  1. 常见情形：demo.type 已存在 → 只在 data/components/*.json 加一条数据，零代码。
 *  2. 新形态：写一个 XxxDemo.jsx，在此注册一行，数据里用新 type。
 * 未注册的 type 由 FallbackDemo 兜底显示「演示待实现」。
 */
import FallbackDemo from './FallbackDemo.jsx'

import SelectDemo from './selection/SelectDemo.jsx'
import MultiSelectDemo from './selection/MultiSelectDemo.jsx'
import ComboboxDemo from './selection/ComboboxDemo.jsx'
import AutocompleteDemo from './selection/AutocompleteDemo.jsx'
import CascaderDemo from './selection/CascaderDemo.jsx'
import TreeSelectDemo from './selection/TreeSelectDemo.jsx'

import UnderlinedTabsDemo from './tabs/UnderlinedTabsDemo.jsx'
import SlidingIndicatorTabsDemo from './tabs/SlidingIndicatorTabsDemo.jsx'
import PillTabsDemo from './tabs/PillTabsDemo.jsx'
import SegmentedControlDemo from './tabs/SegmentedControlDemo.jsx'
import ContainedTabsDemo from './tabs/ContainedTabsDemo.jsx'
import FolderTabsDemo from './tabs/FolderTabsDemo.jsx'
import VerticalTabsDemo from './tabs/VerticalTabsDemo.jsx'
import IconTabsDemo from './tabs/IconTabsDemo.jsx'
import IconLabelTabsDemo from './tabs/IconLabelTabsDemo.jsx'
import ScrollableTabsDemo from './tabs/ScrollableTabsDemo.jsx'
import ClosableTabsDemo from './tabs/ClosableTabsDemo.jsx'
import DraggableTabsDemo from './tabs/DraggableTabsDemo.jsx'

import OtpDemo from './input/OtpDemo.jsx'
import TagInputDemo from './input/TagInputDemo.jsx'
import ChipInputDemo from './input/ChipInputDemo.jsx'
import MentionsDemo from './input/MentionsDemo.jsx'
import InlineEditDemo from './input/InlineEditDemo.jsx'
import RichTextDemo from './input/RichTextDemo.jsx'
import MarkdownDemo from './input/MarkdownDemo.jsx'
import CodeEditorDemo from './input/CodeEditorDemo.jsx'

import ButtonDemo from './button/ButtonDemo.jsx'
import StepperDemo from './stepper/StepperDemo.jsx'
import SliderDemo from './slider/SliderDemo.jsx'
import CalendarDemo from './datetime/CalendarDemo.jsx'
import NativeSelectDemo from './select/NativeSelectDemo.jsx'
import UploadDemo from './upload/UploadDemo.jsx'
import MenuDemo from './menu/MenuDemo.jsx'
import NavDemo from './navigation/NavDemo.jsx'
import CardDemo from './card/CardDemo.jsx'
import DataDemo from './data/DataDemo.jsx'
import TagDemo from './tag/TagDemo.jsx'
import AccordionDemo from './accordion/AccordionDemo.jsx'
import OverlayDemo from './overlay/OverlayDemo.jsx'
import FeedbackDemo from './feedback/FeedbackDemo.jsx'
import LoadingDemo from './loading/LoadingDemo.jsx'
import EmptyDemo from './empty/EmptyDemo.jsx'
import LayoutDemo from './layout/LayoutDemo.jsx'
import TreeViewDemo from './tree/TreeViewDemo.jsx'
import SaasDemo from './saas/SaasDemo.jsx'
import MobileDemo from './mobile/MobileDemo.jsx'
import DesktopDemo from './desktop/DesktopDemo.jsx'

import { RatingDemo, ColorPickerDemo, SearchInputDemo, PhoneInputDemo, AmountInputDemo, SignatureDemo, EmojiPickerDemo } from './special/SpecialDemo.jsx'

const registry = {
  // Selection
  select: SelectDemo,
  'multi-select': MultiSelectDemo,
  combobox: ComboboxDemo,
  autocomplete: AutocompleteDemo,
  cascader: CascaderDemo,
  'tree-select': TreeSelectDemo,
  // Tabs
  'underlined-tabs': UnderlinedTabsDemo,
  'sliding-indicator-tabs': SlidingIndicatorTabsDemo,
  'pill-tabs': PillTabsDemo,
  'segmented-control': SegmentedControlDemo,
  'contained-tabs': ContainedTabsDemo,
  'folder-tabs': FolderTabsDemo,
  'vertical-tabs': VerticalTabsDemo,
  'icon-tabs': IconTabsDemo,
  'icon-label-tabs': IconLabelTabsDemo,
  'scrollable-tabs': ScrollableTabsDemo,
  'closable-tabs': ClosableTabsDemo,
  'draggable-tabs': DraggableTabsDemo,
  // Input
  otp: OtpDemo,
  'tag-input': TagInputDemo,
  'chip-input': ChipInputDemo,
  mentions: MentionsDemo,
  'inline-edit': InlineEditDemo,
  'rich-text': RichTextDemo,
  markdown: MarkdownDemo,
  'code-editor': CodeEditorDemo,
  // Button / Stepper / Slider / DateTime
  button: ButtonDemo,
  stepper: StepperDemo,
  slider: SliderDemo,
  calendar: CalendarDemo,
  // Special
  rating: RatingDemo,
  'color-picker': ColorPickerDemo,
  'search-input': SearchInputDemo,
  'phone-input': PhoneInputDemo,
  'amount-input': AmountInputDemo,
  signature: SignatureDemo,
  'emoji-picker': EmojiPickerDemo,
  // Upload / Select / Menu / Navigation
  upload: UploadDemo,
  'native-select': NativeSelectDemo,
  menu: MenuDemo,
  nav: NavDemo,
  // Card / Data / Tag / Accordion
  'card-demo': CardDemo,
  'data-demo': DataDemo,
  'tag-demo': TagDemo,
  accordion: AccordionDemo,
  // Overlay / Feedback / Loading / Empty
  'overlay-demo': OverlayDemo,
  'feedback-demo': FeedbackDemo,
  'loading-demo': LoadingDemo,
  'empty-demo': EmptyDemo,
  // Layout / Tree / SaaS / Mobile / Desktop
  'layout-demo': LayoutDemo,
  'tree-view': TreeViewDemo,
  'saas-demo': SaasDemo,
  'mobile-demo': MobileDemo,
  'desktop-demo': DesktopDemo,
}

export function getDemoRenderer(type) {
  return registry[type] ?? FallbackDemo
}

export { FallbackDemo }
