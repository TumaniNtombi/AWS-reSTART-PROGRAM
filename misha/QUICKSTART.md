# Misha Quickstart (Step-by-Step)

If you are new, follow these exact steps in order.

## 1) Open your terminal

Start in the repository root:

```bash
cd /workspace/AWS-reSTART-PROGRAM
```

You should be able to see `misha/` when you run:

```bash
ls
```

## 2) Go to the preview app folder

```bash
cd misha/preview
```

This is the folder that contains:
- `index.html`
- `script.js`
- `styles.css`

## 3) Start a local web server

```bash
python3 -m http.server 8080
```

Keep this terminal open while previewing.

## 4) Open the app in your browser

Go to:

- http://localhost:8080

If `localhost` does not work, try:

- http://127.0.0.1:8080

## 5) Use the prototype

1. Fill in **Community**, **Farm ID**, **Hazard Signal**, and **Severity**.
2. Click **Submit Observation**.
3. Check **Collective Climate Memory Feed** update.
4. Check **Community Early Warning** status.
5. Click **Find Climate Twin** to see peer-match suggestions.

## 6) Stop the server

In the terminal where the server is running, press:

- `Ctrl + C`

## 7) If you get stuck

### Port 8080 already in use

Run with another port:

```bash
python3 -m http.server 8081
```

Then open:
- http://localhost:8081

### `python3` not found

Try:

```bash
python -m http.server 8080
```

### Blank page

Make sure you started the server from `misha/preview` (not from another folder).

## 8) Next step after preview

Read these docs in this order:
1. `misha/README.md`
2. `misha/architecture.md`
3. `misha/security-controls.md`
4. `misha/agents.md`
5. `misha/data-model.md`
6. `misha/implementation-plan.md`

