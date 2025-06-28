.PHONY: serve
serve:
	pnpm run build && pnpx serve ./dist
