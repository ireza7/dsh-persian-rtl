window.__ModuleLoader__.load({
  id: 'dsh-persian-rtl',
  factory(require) {
    const CSS = `
/* dsh-persian-rtl: automatic per-paragraph direction for Persian text.
   unicode-bidi: plaintext makes EACH paragraph follow its own first strong
   character: Persian paragraphs go RTL, English ones stay LTR.
   Covered surfaces:
   - assistant answers (incl. while streaming)
   - thinking/reasoning cells (turn-process)
   - question boxes (ask_user_question tool rows) */
[data-chat-flow-kind="assistant-step"] p,
[data-chat-flow-kind="assistant-step"] li,
[data-chat-flow-kind="assistant-step"] h1,
[data-chat-flow-kind="assistant-step"] h2,
[data-chat-flow-kind="assistant-step"] h3,
[data-chat-flow-kind="assistant-step"] h4,
[data-chat-flow-kind="assistant-step"] h5,
[data-chat-flow-kind="assistant-step"] h6,
[data-chat-flow-kind="assistant-step"] blockquote,
[data-chat-flow-kind="assistant-step"] td,
[data-chat-flow-kind="assistant-step"] th,
[data-chat-flow-kind="assistant-step"] figcaption,
[data-turn-process-messages] p,
[data-turn-process-messages] li,
[data-turn-process-messages] blockquote,
[data-turn-process-messages] td,
[data-turn-process-messages] th,
[data-tool="ask_user_question"] p,
[data-tool="ask_user_question"] li,
[data-tool="ask_user_question"] blockquote,
[data-tool="ask_user_question"] td,
[data-tool="ask_user_question"] th,
[data-tool="ask_user_question"] label,
[data-question-key] p,
[data-question-key] li,
[data-question-key] label,
[data-plan-review-key] p,
[data-plan-review-key] li {
  unicode-bidi: plaintext;
  text-align: start;
}
/* Latin runs (code, keys, links) keep their order inside Persian text. */
[data-chat-flow-kind="assistant-step"] pre,
[data-chat-flow-kind="assistant-step"] code,
[data-chat-flow-kind="assistant-step"] kbd,
[data-chat-flow-kind="assistant-step"] samp,
[data-chat-flow-kind="assistant-step"] a,
[data-turn-process-messages] pre,
[data-turn-process-messages] code,
[data-tool="ask_user_question"] pre,
[data-tool="ask_user_question"] code,
[data-tool="ask_user_question"] kbd,
[data-tool="ask_user_question"] samp,
[data-tool="ask_user_question"] a {
  direction: ltr;
  unicode-bidi: isolate;
}
[data-chat-flow-kind="assistant-step"] pre,
[data-turn-process-messages] pre,
[data-tool="ask_user_question"] pre {
  text-align: left;
}
`;

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-persian-rtl', '');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => {
            style.remove();
          };
        }, 'dsh-persian-rtl: global direction styles');
      },
    };
  },
});
