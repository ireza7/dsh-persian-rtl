# dsh-persian-rtl

Persian (Farsi) RTL fix for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — until RTL is handled officially.

## What it does

Fully automatic per-paragraph text direction (`unicode-bidi: plaintext`): every paragraph follows its own first strong character — Persian paragraphs render right-to-left, English ones stay left-to-right. No buttons, no settings.

Covered surfaces:

- **Assistant answers** — including while streaming
- **User + steering message bubbles** — including composer submit echoes
- **Thinking / reasoning cells** (`turn-process` members and inline reasoning, reasoning flow nodes)
- **Tool-call / tool-result cells** — any `data-tool` row (including `ask_user_question` rendered inside the chat flow)
- **Question boxes + plan-review cards** (composer-takeover cards)

**Latin runs stay intact** — `code`, `pre`, `kbd`, and links are isolated LTR, so English words and numbers keep their order inside Persian text instead of jumping around.

**Logical geometry fixed** — lists, blockquotes, and task checkboxes use `inline-start` padding/borders, so RTL paragraphs get correctly-sided bullets, quote bars, and gaps.

The composer, sidebar, and settings are left alone, and no shipped renderer is replaced — the plugin only adds CSS.

## Install

Pick whichever is easiest — no local clone needed in any of them.

**Web UI:** open **Plugins** in the sidebar → install → enter the spec:

```
github:ireza7/dsh-persian-rtl
```

**Agent tool** (Creator mode session):

```
install_bundle with target = github:ireza7/dsh-persian-rtl
```

**CLI:**

```bash
dsh plugin --profile web add github:ireza7/dsh-persian-rtl
```

The bundle takes effect immediately in live profiles (no restart).

Alternatives:

- Full repo URL: `https://github.com/ireza7/dsh-persian-rtl`
- From a local clone: `install_bundle with target = /path/to/dsh-persian-rtl`
- From npm (if published): `install_bundle with target = dsh-persian-rtl`

To remove it later: `remove_bundle` with the bundle name.

## How it works

- A `<style>` element is mounted via `ctx.effect` (global, no visual output of its own).
- Pure CSS with attribute selectors over shipped DOM markers (`data-chat-flow-kind="assistant-step"`, `data-turn-process-messages`, `data-tool="ask_user_question"`); no slot registrations, no renderer replacement.

## License

MIT
