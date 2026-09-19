# dsh-persian-rtl

Persian (Farsi) RTL fix for [DeepSeek Harness](https://github.com/deepseek-ai).

## What it does

Fully automatic per-paragraph text direction (`unicode-bidi: plaintext`): every paragraph follows its own first strong character — Persian paragraphs render right-to-left, English ones stay left-to-right. No buttons, no settings.

Covered surfaces:

- **Assistant answers** — including while streaming
- **Thinking / reasoning cells** (`turn-process`)
- **Question boxes** (`ask_user_question` tool rows, plan-review and question composer cards)

**Latin runs stay intact** — `code`, `pre`, `kbd`, and links are isolated LTR, so English words and numbers keep their order inside Persian text instead of jumping around.

User messages, the composer, sidebar, and settings are left alone, and no shipped renderer is replaced — the plugin only adds CSS.

## Install

In any DeepSeek Harness session with the plugin-manager tool:

```
install_bundle with target = /path/to/dsh-persian-rtl
```

Or publish the folder to npm and install by package name.

## How it works

- A `<style>` element is mounted via `ctx.effect` (global, no visual output of its own).
- Pure CSS with attribute selectors over shipped DOM markers (`data-chat-flow-kind="assistant-step"`, `data-turn-process-messages`, `data-tool="ask_user_question"`); no slot registrations, no renderer replacement.

## License

MIT
