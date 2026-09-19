# dsh-persian-rtl

Persian (Farsi) RTL fix for [DeepSeek Harness](https://github.com/deepseek-ai) assistant answers.

## What it does

- **Automatic per-paragraph direction** — every paragraph of an assistant answer follows its own first strong character (`unicode-bidi: plaintext`): Persian paragraphs render right-to-left, English ones stay left-to-right. Mixed-language answers just work.
- **Latin runs stay intact** — `code`, `pre`, `kbd`, and links are isolated LTR, so English words and numbers keep their order inside Persian text instead of jumping around.
- **Manual toggle per answer** — a small `⇄` button next to the copy/branch actions cycles each answer through `خودکار (auto) → راست‌چین (RTL) → چپ‌چین (LTR)`. The choice persists in `localStorage`.

Only assistant answers are touched. User messages, the composer, sidebar, and settings are left alone, and no shipped renderer is replaced — the plugin only adds CSS plus one action button.

## Install

In any DeepSeek Harness session with the plugin-manager tool:

```
install_bundle with target = /path/to/dsh-persian-rtl
```

Or publish the folder to npm and install by package name.

## How it works

- A `<style>` element is mounted via `shell.overlay`-free `ctx.effect` (global, no visual output of its own).
- The `conversation.chat.assistant-actions` slot gains a `persian-rtl-toggle` entry receiving the durable `messageId`; clicking it sets a `data-persian-rtl="auto|rtl|ltr"` attribute on the message container, which the CSS reads.
- Slot choice follows the supported path: `assistant-actions` has `replaceRisk: none`, unlike `conversation.chat.node` renderers which would shadow shipped UI.

## License

MIT
