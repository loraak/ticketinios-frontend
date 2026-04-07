import {
  BaseInput
} from "./chunk-BGTYKO2Y.js";
import {
  InputText
} from "./chunk-6XQYFWXR.js";
import "./chunk-F7FTBWPP.js";
import "./chunk-EUS2EJPP.js";
import {
  AutoFocus
} from "./chunk-IKKLYUAG.js";
import {
  TimesIcon
} from "./chunk-FVGV2FPQ.js";
import "./chunk-VROP2WXL.js";
import "./chunk-36KXAK7C.js";
import "./chunk-LDWDVKOC.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-LDORZGCS.js";
import {
  Bind,
  BindModule
} from "./chunk-GNPLYQPD.js";
import {
  BaseStyle
} from "./chunk-QMQGJMQI.js";
import "./chunk-HYLAYPUA.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-R4XS44BK.js";
import {
  Nt,
  tt
} from "./chunk-C4SPPOQ4.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-IC4SRBI3.js";
import {
  CommonModule,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-EBE62M6Q.js";
import "./chunk-T3SMBNPX.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-IL2LTTTN.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-MARUHEWW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-H2SRQSE4.js";

// node_modules/primeng/fesm2022/primeng-inputmask.mjs
var _c0 = ["clearicon"];
var _c1 = ["input"];
function InputMask_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 5);
    ɵɵlistener("click", function InputMask_ng_container_2__svg_svg_1_Template_svg_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
  }
}
function InputMask_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function InputMask_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputMask_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputMask_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 6);
    ɵɵlistener("click", function InputMask_ng_container_2_span_2_Template_span_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear());
    });
    ɵɵtemplate(1, InputMask_ng_container_2_span_2_1_Template, 1, 0, null, 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r1.ptm("clearIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function InputMask_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputMask_ng_container_2__svg_svg_1_Template, 1, 3, "svg", 3)(2, InputMask_ng_container_2_span_2_Template, 2, 4, "span", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clearIconTemplate && !ctx_r1._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
var style = (
  /*css*/
  `
    /* For PrimeNG */
    p-inputmask {
        position: relative;
    }

    .p-inputmask-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    p-inputMask:has(.p-inputtext-fluid),
    p-input-mask:has(.p-inputtext-fluid),
    p-inputmask:has(.p-inputtext-fluid) {
        width: 100%;
    }

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
    }

    p-inputMask.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-input-mask.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-inputmask.ng-invalid.ng-dirty > .p-inputtext::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`
);
var classes = {
  root: ({
    instance
  }) => ["p-inputmask p-component p-inputwrapper", {
    "p-variant-filled": instance.$variant() === "filled"
  }],
  clearIcon: "p-inputmask-clear-icon"
};
var InputMaskStyle = class _InputMaskStyle extends BaseStyle {
  name = "inputmask";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputMaskStyle_BaseFactory;
    return function InputMaskStyle_Factory(__ngFactoryType__) {
      return (ɵInputMaskStyle_BaseFactory || (ɵInputMaskStyle_BaseFactory = ɵɵgetInheritedFactory(_InputMaskStyle)))(__ngFactoryType__ || _InputMaskStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputMaskStyle,
    factory: _InputMaskStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputMaskStyle, [{
    type: Injectable
  }], null, null);
})();
var InputMaskClasses;
(function(InputMaskClasses2) {
  InputMaskClasses2["root"] = "p-inputmask";
  InputMaskClasses2["clearIcon"] = "p-inputmask-clear-icon";
})(InputMaskClasses || (InputMaskClasses = {}));
var INPUTMASK_INSTANCE = new InjectionToken("INPUTMASK_INSTANCE");
var INPUTMASK_DIRECTIVE_INSTANCE = new InjectionToken("INPUTMASK_DIRECTIVE_INSTANCE");
var InputMaskDirective = class _InputMaskDirective extends BaseComponent {
  $pcInputMaskDirective = inject(INPUTMASK_DIRECTIVE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  _componentStyle = inject(InputMaskStyle);
  /**
   * Used to pass attributes to DOM elements inside the InputMask directive.
   * @defaultValue undefined
   * @group Props
   */
  pInputMaskPT = input(...ngDevMode ? [void 0, {
    debugName: "pInputMaskPT"
  }] : []);
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pInputMaskUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pInputMaskUnstyled"
  }] : []);
  /**
   * Mask pattern.
   * @group Props
   */
  pInputMask = input(...ngDevMode ? [void 0, {
    debugName: "pInputMask"
  }] : []);
  /**
   * Placeholder character in mask, default is underscore.
   * @group Props
   */
  slotChar = input("_", ...ngDevMode ? [{
    debugName: "slotChar"
  }] : []);
  /**
   * Clears the incomplete value on blur.
   * @group Props
   */
  autoClear = input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "autoClear"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Regex pattern for alpha characters.
   * @group Props
   */
  characterPattern = input("[A-Za-z]", ...ngDevMode ? [{
    debugName: "characterPattern"
  }] : []);
  /**
   * When present, it specifies that whether to clean buffer value from model.
   * @group Props
   */
  keepBuffer = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "keepBuffer"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Callback to invoke when the mask is completed.
   * @group Emits
   */
  onCompleteEvent = output({
    alias: "onComplete"
  });
  /**
   * Callback to invoke when value changes, emits unmasked value.
   * @group Emits
   */
  onUnmaskedChange = output();
  defs;
  tests;
  partialPosition;
  firstNonMaskPos;
  lastRequiredNonMaskPos;
  len;
  oldVal;
  buffer;
  defaultBuffer;
  focusText;
  caretTimeoutId;
  androidChrome = true;
  focused;
  _inputElement = null;
  _listeners = [];
  isInputVisible(input2) {
    const style2 = getComputedStyle(input2);
    return style2.display !== "none" && style2.visibility !== "hidden";
  }
  get inputElement() {
    if (!this._inputElement) {
      const host = this.el.nativeElement;
      this._inputElement = host.querySelector("[data-p-maskable]") || Array.from(host.querySelectorAll("input")).find((input2) => this.isInputVisible(input2)) || host;
    }
    return this._inputElement;
  }
  constructor() {
    super();
    effect(() => {
      const pt = this.pInputMaskPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pInputMaskUnstyled() && this.directiveUnstyled.set(this.pInputMaskUnstyled());
    });
    effect(() => {
      const maskValue = this.pInputMask();
      if (maskValue) {
        this.initMask();
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      const ua = navigator.userAgent;
      this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
    }
  }
  onAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.inputElement) {
      const events = [["focus", (e) => this.onInputFocus(e)], ["blur", (e) => this.onInputBlur(e)], ["keydown", (e) => this.onInputKeydown(e)], ["keypress", (e) => this.onKeyPress(e)], ["input", (e) => this.onInputChange(e)], ["paste", (e) => this.onPaste(e)]];
      events.forEach(([event, handler]) => {
        this.inputElement.addEventListener(event, handler);
        this._listeners.push(() => this.inputElement.removeEventListener(event, handler));
      });
    }
  }
  onDestroy() {
    this._listeners.forEach((unlisten) => unlisten());
  }
  initMask() {
    const maskValue = this.pInputMask();
    if (!maskValue) {
      return;
    }
    this.tests = [];
    this.partialPosition = maskValue.length;
    this.len = maskValue.length;
    this.firstNonMaskPos = null;
    this.defs = {
      "9": "[0-9]",
      a: this.characterPattern(),
      "*": `${this.characterPattern()}|[0-9]`
    };
    const maskTokens = maskValue.split("");
    for (let i = 0; i < maskTokens.length; i++) {
      const c = maskTokens[i];
      if (c == "?") {
        this.len--;
        this.partialPosition = i;
      } else if (this.defs[c]) {
        this.tests.push(new RegExp(this.defs[c]));
        if (this.firstNonMaskPos === null) {
          this.firstNonMaskPos = this.tests.length - 1;
        }
        if (i < this.partialPosition) {
          this.lastRequiredNonMaskPos = this.tests.length - 1;
        }
      } else {
        this.tests.push(null);
      }
    }
    this.buffer = [];
    for (let i = 0; i < maskTokens.length; i++) {
      const c = maskTokens[i];
      if (c != "?") {
        if (this.defs[c]) this.buffer.push(this.getPlaceholder(i));
        else this.buffer.push(c);
      }
    }
    this.defaultBuffer = this.buffer.join("");
  }
  onInputFocus(event) {
    if (this.inputElement.readOnly || !this.pInputMask()) {
      return;
    }
    this.focused = true;
    this.focusText = this.inputElement.value;
    clearTimeout(this.caretTimeoutId);
    const pos = this.checkVal();
    this.caretTimeoutId = setTimeout(() => {
      if (this.inputElement !== this.inputElement.ownerDocument.activeElement) {
        return;
      }
      this.writeBuffer();
      if (pos == this.pInputMask()?.replace("?", "").length) {
        this.caret(0, pos);
      } else {
        this.caret(pos);
      }
    }, 10);
  }
  onInputBlur(e) {
    if (!this.pInputMask()) {
      return;
    }
    this.focused = false;
    if (!this.keepBuffer()) {
      const valueBefore = this.inputElement.value;
      this.checkVal();
      if (this.inputElement.value !== valueBefore) {
        this.dispatchInputEvent();
      }
    }
  }
  onInputKeydown(e) {
    if (this.inputElement.readOnly || !this.pInputMask()) {
      return;
    }
    const k = e.which || e.keyCode;
    let pos;
    let begin;
    let end;
    let iPhone = false;
    if (isPlatformBrowser(this.platformId)) {
      iPhone = /iphone/i.test(Nt());
    }
    this.oldVal = this.inputElement.value;
    if (k === 8 || k === 46 || iPhone && k === 127) {
      pos = this.caret();
      begin = pos.begin;
      end = pos.end;
      if (end - begin === 0) {
        begin = k !== 46 ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
        end = k === 46 ? this.seekNext(end) : end;
      }
      this.clearBuffer(begin, end);
      if (this.keepBuffer()) {
        this.shiftL(begin, end - 2);
      } else {
        this.shiftL(begin, end - 1);
      }
      this.dispatchInputEvent();
      e.preventDefault();
    } else if (k === 13) {
      this.onInputBlur(e);
    } else if (k === 27) {
      this.inputElement.value = this.focusText;
      this.caret(0, this.checkVal());
      e.preventDefault();
    }
  }
  onKeyPress(e) {
    if (this.inputElement.readOnly || !this.pInputMask()) {
      return;
    }
    const k = e.which || e.keyCode;
    const pos = this.caret();
    let p;
    let c;
    let next;
    let completed;
    if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || k > 34 && k < 41) {
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end);
        this.shiftL(pos.begin, pos.end - 1);
      }
      p = this.seekNext(pos.begin - 1);
      if (p < this.len) {
        c = String.fromCharCode(k);
        if (this.tests[p].test(c)) {
          this.shiftR(p);
          this.buffer[p] = c;
          this.writeBuffer();
          this.dispatchInputEvent();
          next = this.seekNext(p);
          if (tt() && /android/i.test(Nt())) {
            const proxy = () => {
              this.caret(next);
            };
            setTimeout(proxy, 0);
          } else {
            this.caret(next);
          }
          if (pos.begin <= this.lastRequiredNonMaskPos) {
            completed = this.isCompleted();
          }
        }
      }
      e.preventDefault();
    }
    if (completed) {
      this.onCompleteEvent.emit();
    }
  }
  onInputChange(event) {
    if (!this.pInputMask()) {
      return;
    }
    if (!event.isTrusted) {
      return;
    }
    if (this.androidChrome) this.handleAndroidInput(event);
    else this.handleInputChange(event);
  }
  onPaste(event) {
    if (!this.pInputMask()) {
      return;
    }
    this.handleInputChange(event);
  }
  // Helper methods
  caret(first, last) {
    let range;
    let begin;
    let end;
    if (!this.inputElement.offsetParent || this.inputElement !== this.inputElement.ownerDocument.activeElement) {
      return;
    }
    if (typeof first == "number") {
      begin = first;
      end = typeof last === "number" ? last : begin;
      if (typeof this.inputElement.setSelectionRange === "function") {
        this.inputElement.setSelectionRange(begin, end);
      } else if (this.inputElement["createTextRange"]) {
        range = this.inputElement["createTextRange"]();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", begin);
        range.select();
      }
    } else {
      if (typeof this.inputElement.setSelectionRange === "function") {
        begin = this.inputElement.selectionStart;
        end = this.inputElement.selectionEnd;
      } else if (this.document["selection"] && this.document["selection"].createRange) {
        range = this.document["selection"].createRange();
        begin = 0 - range.duplicate().moveStart("character", -1e5);
        end = begin + range.text.length;
      }
      return {
        begin,
        end
      };
    }
  }
  isCompleted() {
    for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
      if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
        return false;
      }
    }
    return true;
  }
  getPlaceholder(i) {
    const slotCharValue = this.slotChar();
    if (i < slotCharValue.length) {
      return slotCharValue.charAt(i);
    }
    return slotCharValue.charAt(0);
  }
  seekNext(pos) {
    while (++pos < this.len && !this.tests[pos]) ;
    return pos;
  }
  seekPrev(pos) {
    while (--pos >= 0 && !this.tests[pos]) ;
    return pos;
  }
  shiftL(begin, end) {
    let i, j;
    if (begin < 0) {
      return;
    }
    for (i = begin, j = this.seekNext(end); i < this.len; i++) {
      if (this.tests[i]) {
        if (j < this.len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j];
          this.buffer[j] = this.getPlaceholder(j);
        } else {
          break;
        }
        j = this.seekNext(j);
      }
    }
    this.writeBuffer();
    this.caret(Math.max(this.firstNonMaskPos, begin));
  }
  shiftR(pos) {
    let i, c, j, t;
    for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
      if (this.tests[i]) {
        j = this.seekNext(i);
        t = this.buffer[i];
        this.buffer[i] = c;
        if (j < this.len && this.tests[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  }
  handleAndroidInput(e) {
    const curVal = this.inputElement.value;
    const pos = this.caret();
    if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
      this.checkVal(true);
      while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
      if (pos.begin === 0) {
        while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) pos.begin++;
      }
      setTimeout(() => {
        this.caret(pos.begin, pos.begin);
        this.onUnmaskedChange.emit(this.getUnmaskedValue());
        if (this.isCompleted()) {
          this.onCompleteEvent.emit();
        }
      }, 0);
    } else {
      this.checkVal(true);
      while (pos.begin < this.len && !this.tests[pos.begin]) pos.begin++;
      setTimeout(() => {
        this.caret(pos.begin, pos.begin);
        this.onUnmaskedChange.emit(this.getUnmaskedValue());
        if (this.isCompleted()) {
          this.onCompleteEvent.emit();
        }
      }, 0);
    }
  }
  handleInputChange(event) {
    if (this.inputElement.readOnly) {
      return;
    }
    setTimeout(() => {
      const pos = this.checkVal(true);
      this.caret(pos);
      this.onUnmaskedChange.emit(this.getUnmaskedValue());
      if (this.isCompleted()) {
        this.onCompleteEvent.emit();
      }
    }, 0);
  }
  clearBuffer(start, end) {
    if (!this.keepBuffer()) {
      let i;
      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    }
  }
  writeBuffer() {
    if (this.buffer && this.inputElement) {
      this.inputElement.value = this.buffer.join("");
    }
  }
  /**
   * Dispatches an input event on the host element.
   * This is needed to notify parent components of value changes
   * since programmatic value changes don't trigger native input events.
   */
  dispatchInputEvent() {
    const event = new Event("input", {
      bubbles: true,
      cancelable: true
    });
    this.inputElement.dispatchEvent(event);
    this.onUnmaskedChange.emit(this.getUnmaskedValue());
  }
  checkVal(allow) {
    const test = this.inputElement.value;
    let lastMatch = -1;
    let i;
    let c;
    let pos;
    for (i = 0, pos = 0; i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.getPlaceholder(i);
        while (pos++ < test.length) {
          c = test.charAt(pos - 1);
          if (this.tests[i].test(c)) {
            if (!this.keepBuffer()) {
              this.buffer[i] = c;
            }
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) {
          this.clearBuffer(i + 1, this.len);
          break;
        }
      } else {
        if (this.buffer[i] === test.charAt(pos)) {
          pos++;
        }
        if (i < this.partialPosition) {
          lastMatch = i;
        }
      }
    }
    if (allow) {
      this.writeBuffer();
    } else if (lastMatch + 1 < this.partialPosition) {
      if (this.autoClear() || this.buffer.join("") === this.defaultBuffer) {
        if (this.inputElement.value) this.inputElement.value = "";
        this.clearBuffer(0, this.len);
      } else {
        this.writeBuffer();
      }
    } else {
      this.writeBuffer();
      this.inputElement.value = this.inputElement.value.substring(0, lastMatch + 1);
    }
    return this.partialPosition ? i : this.firstNonMaskPos;
  }
  getUnmaskedValue() {
    const unmaskedBuffer = [];
    for (let i = 0; i < this.buffer.length; i++) {
      const c = this.buffer[i];
      if (this.tests[i] && c != this.getPlaceholder(i)) {
        unmaskedBuffer.push(c);
      }
    }
    return unmaskedBuffer.join("");
  }
  static ɵfac = function InputMaskDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputMaskDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _InputMaskDirective,
    selectors: [["", "pInputMask", ""]],
    hostVars: 2,
    hostBindings: function InputMaskDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("p-inputmask", !ctx.$unstyled());
      }
    },
    inputs: {
      pInputMaskPT: [1, "pInputMaskPT"],
      pInputMaskUnstyled: [1, "pInputMaskUnstyled"],
      pInputMask: [1, "pInputMask"],
      slotChar: [1, "slotChar"],
      autoClear: [1, "autoClear"],
      characterPattern: [1, "characterPattern"],
      keepBuffer: [1, "keepBuffer"]
    },
    outputs: {
      onCompleteEvent: "onComplete",
      onUnmaskedChange: "onUnmaskedChange"
    },
    features: [ɵɵProvidersFeature([InputMaskStyle, {
      provide: INPUTMASK_DIRECTIVE_INSTANCE,
      useExisting: _InputMaskDirective
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputMaskDirective
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputMaskDirective, [{
    type: Directive,
    args: [{
      selector: "[pInputMask]",
      standalone: true,
      providers: [InputMaskStyle, {
        provide: INPUTMASK_DIRECTIVE_INSTANCE,
        useExisting: InputMaskDirective
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputMaskDirective
      }],
      host: {
        "[class.p-inputmask]": "!$unstyled()"
      }
    }]
  }], () => [], {
    pInputMaskPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pInputMaskPT",
        required: false
      }]
    }],
    pInputMaskUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pInputMaskUnstyled",
        required: false
      }]
    }],
    pInputMask: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pInputMask",
        required: false
      }]
    }],
    slotChar: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "slotChar",
        required: false
      }]
    }],
    autoClear: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "autoClear",
        required: false
      }]
    }],
    characterPattern: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "characterPattern",
        required: false
      }]
    }],
    keepBuffer: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "keepBuffer",
        required: false
      }]
    }],
    onCompleteEvent: [{
      type: Output,
      args: ["onComplete"]
    }],
    onUnmaskedChange: [{
      type: Output,
      args: ["onUnmaskedChange"]
    }]
  });
})();
var INPUTMASK_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMask),
  multi: true
};
var InputMask = class _InputMask extends BaseInput {
  componentName = "InputMask";
  _componentStyle = inject(InputMaskStyle);
  $pcInputMask = inject(INPUTMASK_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["root", "host"]));
  }
  ptmParams = computed(() => ({
    context: {
      filled: this.$variant() === "filled"
    }
  }), ...ngDevMode ? [{
    debugName: "ptmParams"
  }] : []);
  /**
   * HTML5 input type.
   * @group Props
   */
  type = "text";
  /**
   * Placeholder character in mask, default is underscore.
   * @group Props
   */
  slotChar = "_";
  /**
   * Clears the incomplete value on blur.
   * @group Props
   */
  autoClear = true;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * Inline style of the input field.
   * @group Props
   */
  style;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * Style class of the input field.
   * @group Props
   */
  styleClass;
  /**
   * Advisory information to display on input.
   * @group Props
   */
  placeholder;
  /**
   * Specifies tab order of the element.
   * @group Props
   */
  tabindex;
  /**
   * Title text of the input text.
   * @group Props
   */
  title;
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Used to indicate that user input is required on an element before a form can be submitted.
   * @group Props
   */
  ariaRequired;
  /**
   * When present, it specifies that an input field is read-only.
   * @group Props
   */
  readonly;
  /**
   * Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value.
   * @group Props
   */
  unmask;
  /**
   * Regex pattern for alpha characters
   * @group Props
   */
  characterPattern = "[A-Za-z]";
  /**
   * When present, the input gets a focus automatically on load.
   * @group Props
   */
  autofocus;
  /**
   * Used to define a string that autocomplete attribute the current element.
   * @group Props
   */
  autocomplete;
  /**
   * When present, it specifies that whether to clean buffer value from model.
   * @group Props
   */
  keepBuffer = false;
  /**
   * Mask pattern.
   * @group Props
   */
  get mask() {
    return this._mask;
  }
  set mask(val) {
    this._mask = val;
    this.initMask();
    this.writeValue("");
    this.onModelChange(this.value);
  }
  /**
   * Callback to invoke when the mask is completed.
   * @group Emits
   */
  onComplete = new EventEmitter();
  /**
   * Callback to invoke when the component receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the component loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke on input.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onInput = new EventEmitter();
  /**
   * Callback to invoke on input key press.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onKeydown = new EventEmitter();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate;
  templates;
  inputViewChild;
  value;
  _mask;
  input;
  defs;
  tests;
  partialPosition;
  firstNonMaskPos;
  lastRequiredNonMaskPos;
  len;
  oldVal;
  buffer;
  defaultBuffer;
  focusText;
  caretTimeoutId;
  androidChrome = true;
  focused;
  onInit() {
    if (isPlatformBrowser(this.platformId)) {
      let ua = navigator.userAgent;
      this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
    }
    this.initMask();
  }
  _clearIconTemplate;
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
      }
    });
  }
  initMask() {
    if (!this.mask) {
      return;
    }
    this.tests = [];
    this.partialPosition = this.mask.length;
    this.len = this.mask.length;
    this.firstNonMaskPos = null;
    this.defs = {
      "9": "[0-9]",
      a: this.characterPattern,
      "*": `${this.characterPattern}|[0-9]`
    };
    let maskTokens = this.mask.split("");
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c == "?") {
        this.len--;
        this.partialPosition = i;
      } else if (this.defs[c]) {
        this.tests.push(new RegExp(this.defs[c]));
        if (this.firstNonMaskPos === null) {
          this.firstNonMaskPos = this.tests.length - 1;
        }
        if (i < this.partialPosition) {
          this.lastRequiredNonMaskPos = this.tests.length - 1;
        }
      } else {
        this.tests.push(null);
      }
    }
    this.buffer = [];
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c != "?") {
        if (this.defs[c]) this.buffer.push(this.getPlaceholder(i));
        else this.buffer.push(c);
      }
    }
    this.defaultBuffer = this.buffer.join("");
  }
  caret(first, last) {
    let range, begin, end;
    if (!this.inputViewChild?.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
      return;
    }
    if (typeof first == "number") {
      begin = first;
      end = typeof last === "number" ? last : begin;
      if (this.inputViewChild.nativeElement.setSelectionRange) {
        this.inputViewChild.nativeElement.setSelectionRange(begin, end);
      } else if (this.inputViewChild.nativeElement["createTextRange"]) {
        range = this.inputViewChild.nativeElement["createTextRange"]();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", begin);
        range.select();
      }
    } else {
      if (this.inputViewChild.nativeElement.setSelectionRange) {
        begin = this.inputViewChild.nativeElement.selectionStart;
        end = this.inputViewChild.nativeElement.selectionEnd;
      } else if (this.document && this.document["selection"].createRange) {
        range = this.document.createRange();
        begin = 0 - range.duplicate().moveStart("character", -1e5);
        end = begin + range.text.length;
      }
      return {
        begin,
        end
      };
    }
  }
  isCompleted() {
    let completed;
    for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
      if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
        return false;
      }
    }
    return true;
  }
  getPlaceholder(i) {
    if (i < this.slotChar.length) {
      return this.slotChar.charAt(i);
    }
    return this.slotChar.charAt(0);
  }
  seekNext(pos) {
    while (++pos < this.len && !this.tests[pos]) ;
    return pos;
  }
  seekPrev(pos) {
    while (--pos >= 0 && !this.tests[pos]) ;
    return pos;
  }
  shiftL(begin, end) {
    let i, j;
    if (begin < 0) {
      return;
    }
    for (i = begin, j = this.seekNext(end); i < this.len; i++) {
      if (this.tests[i]) {
        if (j < this.len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j];
          this.buffer[j] = this.getPlaceholder(j);
        } else {
          break;
        }
        j = this.seekNext(j);
      }
    }
    this.writeBuffer();
    this.caret(Math.max(this.firstNonMaskPos, begin));
  }
  shiftR(pos) {
    let i, c, j, t;
    for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
      if (this.tests[i]) {
        j = this.seekNext(i);
        t = this.buffer[i];
        this.buffer[i] = c;
        if (j < this.len && this.tests[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  }
  handleAndroidInput(e) {
    var curVal = this.inputViewChild?.nativeElement.value;
    var pos = this.caret();
    if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
      this.checkVal(true);
      while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
      if (pos.begin === 0) {
        while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin]) pos.begin++;
      }
      setTimeout(() => {
        this.caret(pos.begin, pos.begin);
        this.updateModel(e);
        if (this.isCompleted()) {
          this.onComplete.emit();
        }
      }, 0);
    } else {
      this.checkVal(true);
      while (pos.begin < this.len && !this.tests[pos.begin]) pos.begin++;
      setTimeout(() => {
        this.caret(pos.begin, pos.begin);
        this.updateModel(e);
        if (this.isCompleted()) {
          this.onComplete.emit();
        }
      }, 0);
    }
  }
  onInputBlur(e) {
    this.focused = false;
    this.onModelTouched();
    if (!this.keepBuffer) {
      this.checkVal();
    }
    this.onBlur.emit(e);
    if (this.modelValue() != this.focusText || this.modelValue() != this.value) {
      this.updateModel(e);
      let event = this.document.createEvent("HTMLEvents");
      event.initEvent("change", true, false);
      this.inputViewChild?.nativeElement.dispatchEvent(event);
    }
  }
  onInputKeydown(e) {
    if (this.readonly) {
      return;
    }
    let k = e.which || e.keyCode, pos, begin, end;
    let iPhone;
    if (isPlatformBrowser(this.platformId)) {
      iPhone = /iphone/i.test(Nt());
    }
    this.oldVal = this.inputViewChild?.nativeElement.value;
    this.onKeydown.emit(e);
    if (k === 8 || k === 46 || iPhone && k === 127) {
      pos = this.caret();
      begin = pos.begin;
      end = pos.end;
      if (end - begin === 0) {
        begin = k !== 46 ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
        end = k === 46 ? this.seekNext(end) : end;
      }
      this.clearBuffer(begin, end);
      if (this.keepBuffer) {
        this.shiftL(begin, end - 2);
      } else {
        this.shiftL(begin, end - 1);
      }
      this.updateModel(e);
      this.onInput.emit(e);
      e.preventDefault();
    } else if (k === 13) {
      this.onInputBlur(e);
      this.updateModel(e);
    } else if (k === 27) {
      this.inputViewChild.nativeElement.value = this.focusText;
      this.caret(0, this.checkVal());
      this.updateModel(e);
      e.preventDefault();
    }
  }
  onKeyPress(e) {
    if (this.readonly) {
      return;
    }
    var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
    if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || k > 34 && k < 41) {
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end);
        this.shiftL(pos.begin, pos.end - 1);
      }
      p = this.seekNext(pos.begin - 1);
      if (p < this.len) {
        c = String.fromCharCode(k);
        if (this.tests[p].test(c)) {
          this.shiftR(p);
          this.buffer[p] = c;
          this.writeBuffer();
          next = this.seekNext(p);
          if (tt() && /android/i.test(Nt())) {
            let proxy = () => {
              this.caret(next);
            };
            setTimeout(proxy, 0);
          } else {
            this.caret(next);
          }
          if (pos.begin <= this.lastRequiredNonMaskPos) {
            completed = this.isCompleted();
          }
          this.onInput.emit(e);
        }
      }
      e.preventDefault();
    }
    this.updateModel(e);
    if (completed) {
      this.onComplete.emit();
    }
  }
  clearBuffer(start, end) {
    if (!this.keepBuffer) {
      let i;
      for (i = start; i < end && i < this.len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.getPlaceholder(i);
        }
      }
    }
  }
  writeBuffer() {
    if (this.buffer && this.inputViewChild?.nativeElement) {
      this.inputViewChild.nativeElement.value = this.buffer.join("");
    }
  }
  checkVal(allow) {
    let test = this.inputViewChild?.nativeElement.value, lastMatch = -1, i, c, pos;
    for (i = 0, pos = 0; i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.getPlaceholder(i);
        while (pos++ < test.length) {
          c = test.charAt(pos - 1);
          if (this.tests[i].test(c)) {
            if (!this.keepBuffer) {
              this.buffer[i] = c;
            }
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) {
          this.clearBuffer(i + 1, this.len);
          break;
        }
      } else {
        if (this.buffer[i] === test.charAt(pos)) {
          pos++;
        }
        if (i < this.partialPosition) {
          lastMatch = i;
        }
      }
    }
    if (allow) {
      this.writeBuffer();
    } else if (lastMatch + 1 < this.partialPosition) {
      if (this.autoClear || this.buffer.join("") === this.defaultBuffer) {
        if (this.inputViewChild?.nativeElement.value) this.inputViewChild.nativeElement.value = "";
        this.clearBuffer(0, this.len);
      } else {
        this.writeBuffer();
      }
    } else {
      this.writeBuffer();
      this.inputViewChild.nativeElement.value = this.inputViewChild?.nativeElement.value.substring(0, lastMatch + 1);
    }
    return this.partialPosition ? i : this.firstNonMaskPos;
  }
  onInputFocus(event) {
    if (this.readonly) {
      return;
    }
    this.focused = true;
    clearTimeout(this.caretTimeoutId);
    let pos;
    this.focusText = this.inputViewChild?.nativeElement.value;
    pos = this.keepBuffer ? this.inputViewChild?.nativeElement.value.length : this.checkVal();
    this.caretTimeoutId = setTimeout(() => {
      if (this.inputViewChild?.nativeElement !== this.inputViewChild?.nativeElement.ownerDocument.activeElement) {
        return;
      }
      this.writeBuffer();
      if (pos == this.mask?.replace("?", "").length) {
        this.caret(0, pos);
      } else {
        this.caret(pos);
      }
    }, 10);
    this.onFocus.emit(event);
  }
  onInputChange(event) {
    if (this.androidChrome) this.handleAndroidInput(event);
    else this.handleInputChange(event);
    this.onInput.emit(event);
  }
  handleInputChange(event) {
    if (this.readonly) {
      return;
    }
    setTimeout(() => {
      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(event);
      if (this.isCompleted()) {
        this.onComplete.emit();
      }
    }, 0);
  }
  getUnmaskedValue() {
    let unmaskedBuffer = [];
    for (let i = 0; i < this.buffer.length; i++) {
      let c = this.buffer[i];
      if (this.tests[i] && c != this.getPlaceholder(i)) {
        unmaskedBuffer.push(c);
      }
    }
    return unmaskedBuffer.join("");
  }
  updateModel(e) {
    const target = e.target;
    if (!target) {
      return;
    }
    const updatedValue = this.unmask ? this.getUnmaskedValue() : target.value;
    if (updatedValue !== null && updatedValue !== void 0) {
      this.value = updatedValue;
      this.writeModelValue(this.value);
      this.onModelChange(this.value);
    }
  }
  focus() {
    this.inputViewChild?.nativeElement.focus();
  }
  clear() {
    this.inputViewChild.nativeElement.value = "";
    this.value = null;
    this.onModelChange(this.value);
    this.onClear.emit();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value = value;
    setModelValue(this.value);
    if (this.inputViewChild && this.inputViewChild.nativeElement) {
      if (this.value == void 0 || this.value == null) this.inputViewChild.nativeElement.value = "";
      else this.inputViewChild.nativeElement.value = this.value;
      this.checkVal();
      this.focusText = this.inputViewChild.nativeElement.value;
    }
    this.cd.markForCheck();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputMask_BaseFactory;
    return function InputMask_Factory(__ngFactoryType__) {
      return (ɵInputMask_BaseFactory || (ɵInputMask_BaseFactory = ɵɵgetInheritedFactory(_InputMask)))(__ngFactoryType__ || _InputMask);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _InputMask,
    selectors: [["p-inputmask"], ["p-inputMask"], ["p-input-mask"]],
    contentQueries: function InputMask_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function InputMask_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c1, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inputViewChild = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function InputMask_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      type: "type",
      slotChar: "slotChar",
      autoClear: [2, "autoClear", "autoClear", booleanAttribute],
      showClear: [2, "showClear", "showClear", booleanAttribute],
      style: "style",
      inputId: "inputId",
      styleClass: "styleClass",
      placeholder: "placeholder",
      tabindex: "tabindex",
      title: "title",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      ariaRequired: [2, "ariaRequired", "ariaRequired", booleanAttribute],
      readonly: [2, "readonly", "readonly", booleanAttribute],
      unmask: [2, "unmask", "unmask", booleanAttribute],
      characterPattern: "characterPattern",
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      autocomplete: "autocomplete",
      keepBuffer: [2, "keepBuffer", "keepBuffer", booleanAttribute],
      mask: "mask"
    },
    outputs: {
      onComplete: "onComplete",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onInput: "onInput",
      onKeydown: "onKeydown",
      onClear: "onClear"
    },
    features: [ɵɵProvidersFeature([INPUTMASK_VALUE_ACCESSOR, InputMaskStyle, {
      provide: INPUTMASK_INSTANCE,
      useExisting: _InputMask
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputMask
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 27,
    consts: [["input", ""], ["pInputText", "", 3, "focus", "blur", "keydown", "keypress", "input", "paste", "pt", "unstyled", "invalid", "ngStyle", "pSize", "variant", "pAutoFocus", "fluid"], [4, "ngIf"], ["data-p-icon", "times", 3, "class", "pBind", "click", 4, "ngIf"], [3, "class", "pBind", "click", 4, "ngIf"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet"]],
    template: function InputMask_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "input", 1, 0);
        ɵɵlistener("focus", function InputMask_Template_input_focus_0_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function InputMask_Template_input_blur_0_listener($event) {
          return ctx.onInputBlur($event);
        })("keydown", function InputMask_Template_input_keydown_0_listener($event) {
          return ctx.onInputKeydown($event);
        })("keypress", function InputMask_Template_input_keypress_0_listener($event) {
          return ctx.onKeyPress($event);
        })("input", function InputMask_Template_input_input_0_listener($event) {
          return ctx.onInputChange($event);
        })("paste", function InputMask_Template_input_paste_0_listener($event) {
          return ctx.handleInputChange($event);
        });
        ɵɵelementEnd();
        ɵɵtemplate(2, InputMask_ng_container_2_Template, 3, 2, "ng-container", 2);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("pt", ctx.ptm("pcInputText", ctx.ptmParams()))("unstyled", ctx.unstyled())("invalid", ctx.invalid())("ngStyle", ctx.style)("pSize", ctx.size())("variant", ctx.$variant())("pAutoFocus", ctx.autofocus)("fluid", ctx.hasFluid);
        ɵɵattribute("id", ctx.inputId)("type", ctx.type)("name", ctx.name())("placeholder", ctx.placeholder)("title", ctx.title)("size", ctx.inputSize())("autocomplete", ctx.autocomplete)("maxlength", ctx.maxlength())("minlength", ctx.minlength())("tabindex", ctx.tabindex)("aria-label", ctx.ariaLabel)("aria-labelledBy", ctx.ariaLabelledBy)("aria-required", ctx.ariaRequired)("required", ctx.required() ? "" : void 0)("readonly", ctx.readonly ? "" : void 0)("disabled", ctx.$disabled() ? "" : void 0);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.value != null && ctx.$filled() && ctx.showClear && !ctx.$disabled());
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, InputText, AutoFocus, TimesIcon, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputMask, [{
    type: Component,
    args: [{
      selector: "p-inputmask, p-inputMask, p-input-mask",
      standalone: true,
      imports: [CommonModule, InputText, AutoFocus, TimesIcon, SharedModule, BindModule],
      template: `
        <input
            #input
            pInputText
            [pt]="ptm('pcInputText', ptmParams())"
            [unstyled]="unstyled()"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name()"
            [invalid]="invalid()"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [pSize]="size()"
            [attr.size]="inputSize()"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength()"
            [attr.minlength]="minlength()"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            [variant]="$variant()"
            [pAutoFocus]="autofocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [fluid]="hasFluid"
        />
        <ng-container *ngIf="value != null && $filled() && showClear && !$disabled()">
            <svg data-p-icon="times" *ngIf="!clearIconTemplate && !_clearIconTemplate" [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear()" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear()">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `,
      providers: [INPUTMASK_VALUE_ACCESSOR, InputMaskStyle, {
        provide: INPUTMASK_INSTANCE,
        useExisting: InputMask
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputMask
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      hostDirectives: [Bind],
      host: {
        "[class]": "cx('root')"
      }
    }]
  }], null, {
    type: [{
      type: Input
    }],
    slotChar: [{
      type: Input
    }],
    autoClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    ariaRequired: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    unmask: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    characterPattern: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autocomplete: [{
      type: Input
    }],
    keepBuffer: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    mask: [{
      type: Input
    }],
    onComplete: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onInput: [{
      type: Output
    }],
    onKeydown: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    inputViewChild: [{
      type: ViewChild,
      args: ["input", {
        static: true
      }]
    }]
  });
})();
var InputMaskModule = class _InputMaskModule {
  static ɵfac = function InputMaskModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputMaskModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputMaskModule,
    imports: [InputMask, InputMaskDirective, SharedModule],
    exports: [InputMask, InputMaskDirective, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputMask, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputMaskModule, [{
    type: NgModule,
    args: [{
      imports: [InputMask, InputMaskDirective, SharedModule],
      exports: [InputMask, InputMaskDirective, SharedModule]
    }]
  }], null, null);
})();
export {
  INPUTMASK_VALUE_ACCESSOR,
  InputMask,
  InputMaskClasses,
  InputMaskDirective,
  InputMaskModule,
  InputMaskStyle
};
//# sourceMappingURL=primeng_inputmask.js.map
