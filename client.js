window.__ModuleLoader__.load({
  id: 'dsh-persian-rtl',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const ATTR = 'data-persian-rtl';
    const STORE_PREFIX = 'dsh-persian-rtl:';

    const ROOT = '[data-chat-flow-kind="assistant-step"]';

    const CSS = `
/* dsh-persian-rtl: automatic per-paragraph direction for assistant answers
   (including while streaming). unicode-bidi: plaintext makes EACH paragraph
   follow its own first strong character: Persian paragraphs go RTL, English
   ones stay LTR. */
${ROOT} p,
${ROOT} li,
${ROOT} h1,
${ROOT} h2,
${ROOT} h3,
${ROOT} h4,
${ROOT} h5,
${ROOT} h6,
${ROOT} blockquote,
${ROOT} td,
${ROOT} th,
${ROOT} figcaption {
  unicode-bidi: plaintext;
  text-align: start;
}
/* Manual per-answer overrides applied by the toggle button. */
${ROOT}[${ATTR}="rtl"] p,
${ROOT}[${ATTR}="rtl"] li,
${ROOT}[${ATTR}="rtl"] blockquote,
${ROOT}[${ATTR}="rtl"] td,
${ROOT}[${ATTR}="rtl"] th {
  direction: rtl;
  unicode-bidi: normal;
  text-align: right;
}
${ROOT}[${ATTR}="ltr"] p,
${ROOT}[${ATTR}="ltr"] li,
${ROOT}[${ATTR}="ltr"] blockquote,
${ROOT}[${ATTR}="ltr"] td,
${ROOT}[${ATTR}="ltr"] th {
  direction: ltr;
  unicode-bidi: normal;
  text-align: left;
}
/* Latin runs (code, keys, links) keep their order inside Persian text. */
${ROOT} pre,
${ROOT} code,
${ROOT} kbd,
${ROOT} samp,
${ROOT} a {
  direction: ltr;
  unicode-bidi: isolate;
}
${ROOT} pre {
  text-align: left;
}
/* The toggle button next to copy/branch actions. */
.fa-rtl-toggle {
  font-size: 12px;
  line-height: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.75;
  white-space: nowrap;
}
.fa-rtl-toggle:hover {
  opacity: 1;
  background: rgba(127, 127, 127, 0.15);
}
`;

    function readMode(messageId) {
      try {
        const v = window.localStorage.getItem(STORE_PREFIX + messageId);
        return v === 'rtl' || v === 'ltr' ? v : 'auto';
      } catch (e) {
        return 'auto';
      }
    }

    function writeMode(messageId, mode) {
      try {
        if (mode === 'auto') window.localStorage.removeItem(STORE_PREFIX + messageId);
        else window.localStorage.setItem(STORE_PREFIX + messageId, mode);
      } catch (e) {}
    }

    // Walk up from the toggle button (rendered inside the assistant message's
    // own action row) to the message container. Attribute-driven, so no
    // dependency on shipped class names.
    function findMessageRoot(el) {
      if (!el || typeof el.closest !== 'function') return null;
      return (
        el.closest('[data-chat-flow-kind="assistant-step"]') ||
        el.closest('[data-chat-anchor-key]') ||
        null
      );
    }

    const MODE_LABEL = { auto: 'خودکار', rtl: 'راست‌چین', ltr: 'چپ‌چین' };
    const MODE_NEXT = { auto: 'rtl', rtl: 'ltr', ltr: 'auto' };

    function RtlToggle(props) {
      const messageId = props.messageId;
      const ref = React.useRef(null);
      const [mode, setMode] = React.useState(() => readMode(messageId));

      React.useEffect(() => {
        const root = findMessageRoot(ref.current);
        if (!root) return;
        if (!root.hasAttribute(ATTR)) {
          root.setAttribute(ATTR, readMode(messageId));
        } else {
          const cur = root.getAttribute(ATTR);
          if (cur === 'rtl' || cur === 'ltr' || cur === 'auto') setMode(cur);
        }
      }, [messageId]);

      const applyMode = (next) => {
        setMode(next);
        writeMode(messageId, next);
        const root = findMessageRoot(ref.current);
        if (root) root.setAttribute(ATTR, next);
      };

      const next = MODE_NEXT[mode] || 'auto';
      const title =
        mode === 'auto'
          ? 'جهت متن: خودکار (هر پاراگراف از روی زبان خودش). کلیک: راست‌چین دستی'
          : mode === 'rtl'
            ? 'جهت متن: راست‌چین دستی. کلیک: چپ‌چین دستی'
            : 'جهت متن: چپ‌چین دستی. کلیک: برگشت به خودکار';

      return h(
        'span',
        { ref: ref, className: 'fa-rtl-toggle-wrap' },
        h(
          'button',
          {
            type: 'button',
            className: 'fa-rtl-toggle',
            title: title,
            'aria-label': title,
            onClick: () => applyMode(next),
          },
          '⇄ ' + (MODE_LABEL[mode] || MODE_LABEL.auto),
        ),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute(ATTR, '');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => {
            style.remove();
          };
        }, 'dsh-persian-rtl: global direction styles');
        ctx.slots.inject('conversation.chat.assistant-actions', () =>
          ctx.slots.register(
            {
              name: 'conversation.chat.assistant-actions',
              id: 'persian-rtl-toggle',
              order: 60,
            },
            RtlToggle,
          ),
        );
      },
    };
  },
});
