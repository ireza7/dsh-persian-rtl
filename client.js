window.__ModuleLoader__.load({
  id: 'dsh-persian-rtl',
  factory(require) {
    const CSS = `
/* dsh-persian-rtl: automatic per-paragraph direction for Persian text.
   unicode-bidi: plaintext makes EACH paragraph follow its own first strong
   character: Persian paragraphs go RTL, English ones stay LTR.
   Covered surfaces:
   - assistant answers, incl. while streaming (assistant-step)
   - thinking/reasoning cells (turn-process members + inline reasoning)
   - tool-call / tool-result cells (any data-tool row incl. ask_user_question)
   - question boxes + plan-review cards (composer takeover cards)
   - user + steering message bubbles (incl. submit echoes)
   Plus logical-geometry fixes (lists, blockquotes, task checkboxes) so RTL
   paragraphs also get correctly-sided bullets, quote bars and gaps. */
/* A. Prose blocks: per-paragraph direction, logical alignment. */
[data-chat-flow-kind="assistant-step"] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-chat-flow-kind="tool-call"] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-chat-flow-kind="tool-result"] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-chat-flow-kind="reasoning"] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-turn-process-member] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-turn-process-inline] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-tool] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary),
[data-question-key] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary, span),
[data-plan-review-key] :is(p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary, span),
[data-question-key],
[data-plan-review-key] {
  unicode-bidi: plaintext;
  text-align: start;
}
/* Option buttons ship text-align:left (physical): Persian labels would stick
   to the left. Scoped to the radiogroup/group options so footer/action
   buttons keep their own alignment. */
[data-question-key] :is([role="radiogroup"], [role="group"]) button {
  text-align: start;
}
/* B. User + steering bubbles: plain-text content lives directly in nested
   divs (no <p>), so the direction must be set on the divs themselves.
   Includes composer submit echoes, which reuse the same bubble outside
   the chat flow. Flex layout is untouched (text-align only aligns inline
   content; row/stack alignment stays with align-items). */
[data-chat-flow-kind="user"] :is(div),
[data-chat-flow-kind="steering"] :is(div),
[data-submission-echo],
[data-submission-echo] :is(div),
[data-pending-steering],
[data-pending-steering] :is(div) {
  unicode-bidi: plaintext;
  text-align: start;
}
/* C. Latin runs (code, keys) keep LTR order inside Persian text; links are
   isolated so surrounding punctuation does not jump, while Persian link
   text still follows its paragraph. */
[data-chat-flow-kind="assistant-step"] :is(pre, code, kbd, samp),
[data-chat-flow-kind="tool-call"] :is(pre, code, kbd, samp),
[data-chat-flow-kind="tool-result"] :is(pre, code, kbd, samp),
[data-chat-flow-kind="reasoning"] :is(pre, code, kbd, samp),
[data-turn-process-member] :is(pre, code, kbd, samp),
[data-turn-process-inline] :is(pre, code, kbd, samp),
[data-tool] :is(pre, code, kbd, samp),
[data-question-key] :is(pre, code, kbd, samp),
[data-plan-review-key] :is(pre, code, kbd, samp) {
  direction: ltr;
  unicode-bidi: isolate;
}
[data-chat-flow-kind="assistant-step"] :is(a),
[data-chat-flow-kind="tool-call"] :is(a),
[data-chat-flow-kind="tool-result"] :is(a),
[data-chat-flow-kind="reasoning"] :is(a),
[data-turn-process-member] :is(a),
[data-turn-process-inline] :is(a),
[data-tool] :is(a),
[data-question-key] :is(a),
[data-plan-review-key] :is(a) {
  unicode-bidi: isolate;
}
[data-chat-flow-kind="assistant-step"] :is(pre),
[data-chat-flow-kind="tool-call"] :is(pre),
[data-chat-flow-kind="tool-result"] :is(pre),
[data-turn-process-member] :is(pre),
[data-turn-process-inline] :is(pre),
[data-tool] :is(pre),
[data-question-key] :is(pre),
[data-plan-review-key] :is(pre) {
  text-align: left;
}
/* D. Logical geometry: shipped sheets use physical left padding/border for
   lists, blockquotes and task checkboxes, which puts RTL bullets, quote
   bars and gaps on the wrong side. Swap to inline-start equivalents. */
[data-chat-flow-kind="assistant-step"] :is(ul, ol),
[data-chat-flow-kind="tool-call"] :is(ul, ol),
[data-chat-flow-kind="tool-result"] :is(ul, ol),
[data-turn-process-member] :is(ul, ol),
[data-turn-process-inline] :is(ul, ol),
[data-tool] :is(ul, ol),
[data-question-key] :is(ul, ol),
[data-plan-review-key] :is(ul, ol) {
  padding-left: 0;
  padding-inline-start: 18px;
}
[data-chat-flow-kind="assistant-step"] :is(ul, ol) :is(ol),
[data-chat-flow-kind="tool-call"] :is(ul, ol) :is(ol),
[data-chat-flow-kind="tool-result"] :is(ul, ol) :is(ol),
[data-turn-process-member] :is(ul, ol) :is(ol),
[data-turn-process-inline] :is(ul, ol) :is(ol),
[data-tool] :is(ul, ol) :is(ol),
[data-question-key] :is(ul, ol) :is(ol),
[data-plan-review-key] :is(ul, ol) :is(ol) {
  padding-inline-start: 0;
}
[data-chat-flow-kind="assistant-step"] :is(blockquote),
[data-chat-flow-kind="tool-call"] :is(blockquote),
[data-chat-flow-kind="tool-result"] :is(blockquote),
[data-turn-process-member] :is(blockquote),
[data-turn-process-inline] :is(blockquote),
[data-tool] :is(blockquote),
[data-question-key] :is(blockquote),
[data-plan-review-key] :is(blockquote) {
  border-left: 0 !important;
  padding-left: 0 !important;
  border-inline-start: 2px solid var(--dsw-alias-label-caption);
  padding-inline-start: 14px;
}
[data-chat-flow-kind="assistant-step"] :is(input[type="checkbox"]),
[data-tool] :is(input[type="checkbox"]),
[data-question-key] :is(input[type="checkbox"]),
[data-plan-review-key] :is(input[type="checkbox"]) {
  margin: 0 !important;
  margin-inline-end: 8px !important;
}
/* E. Detected RTL: elements marked with data-dsh-rtl / dir="rtl".
   Overrides unicode-bidi: plaintext so that paragraphs starting with Latin
   words (e.g. "React یک کتابخانه است") are strictly resolved as RTL base
   direction instead of being treated as LTR by first-strong-character rules. */
[data-dsh-rtl],
:is(p, li, ul, ol, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary, div)[data-dsh-rtl],
:is(p, li, ul, ol, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary, div)[dir="rtl"] {
  direction: rtl !important;
  unicode-bidi: isolate !important;
  text-align: start !important;
}
`;

    const RTL_REGEX = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
    const LTR_REGEX = /[a-zA-Z\u00C0-\u024F]/g;

    function checkRtl(text) {
      if (!text) return false;
      const rtl = text.match(RTL_REGEX);
      if (!rtl) return false;
      const rtlCount = rtl.length;
      const ltr = text.match(LTR_REGEX);
      const ltrCount = ltr ? ltr.length : 0;
      return rtlCount / (rtlCount + ltrCount) >= 0.20;
    }

    const PROSE_SELECTOR = 'p, li, ul, ol, h1, h2, h3, h4, h5, h6, blockquote, td, th, figcaption, label, summary, [data-question-key] span, [data-plan-review-key] span';
    const USER_BUBBLE_CONTAINERS = '[data-chat-flow-kind="user"], [data-chat-flow-kind="steering"], [data-submission-echo], [data-pending-steering]';

    function updateElementDirection(el) {
      if (!el || el.nodeType !== 1) return;
      if (el.tagName === 'PRE' || el.tagName === 'CODE' || el.tagName === 'KBD' || el.tagName === 'SAMP') return;
      if (el.closest('pre, code, kbd, samp')) return;

      const isRtl = checkRtl(el.textContent);
      const hadRtl = el.hasAttribute('data-dsh-rtl');

      if (isRtl && !hadRtl) {
        el.setAttribute('data-dsh-rtl', '');
        el.setAttribute('dir', 'rtl');
      } else if (!isRtl && hadRtl) {
        el.removeAttribute('data-dsh-rtl');
        el.removeAttribute('dir');
      }
    }

    function findTargets(node, set) {
      if (!node || node.nodeType !== 1) return;
      if (node.tagName === 'PRE' || node.tagName === 'CODE' || node.tagName === 'KBD' || node.tagName === 'SAMP') return;
      if (node.closest('pre, code, kbd, samp')) return;

      if (node.matches(PROSE_SELECTOR)) {
        set.add(node);
      } else {
        const ancestor = node.closest(PROSE_SELECTOR);
        if (ancestor && !ancestor.closest('pre, code, kbd, samp')) {
          set.add(ancestor);
        }
      }

      const children = node.querySelectorAll(PROSE_SELECTOR);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child.closest('pre, code, kbd, samp')) {
          set.add(child);
        }
      }

      const bubble = node.closest(USER_BUBBLE_CONTAINERS);
      if (bubble) {
        const divs = bubble.querySelectorAll('div');
        for (let i = 0; i < divs.length; i++) {
          const d = divs[i];
          if (!d.querySelector('div, p, ul, ol') && d.textContent.trim()) {
            set.add(d);
          }
        }
      } else {
        const nestedBubbles = node.querySelectorAll(USER_BUBBLE_CONTAINERS);
        for (let i = 0; i < nestedBubbles.length; i++) {
          const divs = nestedBubbles[i].querySelectorAll('div');
          for (let j = 0; j < divs.length; j++) {
            const d = divs[j];
            if (!d.querySelector('div, p, ul, ol') && d.textContent.trim()) {
              set.add(d);
            }
          }
        }
      }
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-persian-rtl', '');
          style.textContent = CSS;
          document.head.appendChild(style);

          const queue = new Set();
          let scheduled = false;
          let scheduleId = null;

          function processQueue() {
            for (const el of queue) {
              if (el.isConnected) {
                updateElementDirection(el);
              }
            }
            queue.clear();
          }

          function scheduleProcess() {
            if (scheduled) return;
            scheduled = true;
            const scheduler = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout;
            scheduleId = scheduler(() => {
              scheduled = false;
              scheduleId = null;
              processQueue();
            }, 16);
          }

          const observer = new MutationObserver((mutations) => {
            for (let i = 0; i < mutations.length; i++) {
              const record = mutations[i];
              if (record.type === 'characterData') {
                const parent = record.target.parentElement;
                if (parent) findTargets(parent, queue);
              } else if (record.type === 'childList') {
                for (let j = 0; j < record.addedNodes.length; j++) {
                  const n = record.addedNodes[j];
                  if (n.nodeType === 1) {
                    findTargets(n, queue);
                  } else if (n.nodeType === 3 && n.parentElement) {
                    findTargets(n.parentElement, queue);
                  }
                }
              }
            }
            if (queue.size > 0) {
              scheduleProcess();
            }
          });

          if (document.body) {
            observer.observe(document.body, {
              childList: true,
              subtree: true,
              characterData: true,
            });
            findTargets(document.body, queue);
            if (queue.size > 0) {
              processQueue();
            }
          }

          return () => {
            observer.disconnect();
            if (scheduleId !== null) {
              if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(scheduleId);
              clearTimeout(scheduleId);
              scheduleId = null;
            }
            scheduled = false;
            queue.clear();
            document.querySelectorAll('[data-dsh-rtl]').forEach((el) => {
              el.removeAttribute('data-dsh-rtl');
              el.removeAttribute('dir');
            });
            style.remove();
          };
        }, 'dsh-persian-rtl: direction styles and dynamic observer');
      },
    };
  },
});
