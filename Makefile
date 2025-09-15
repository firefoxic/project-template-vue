start: ## 🚀 Start the project in development mode
	@trap "exit 0" INT; node --run vite

build: ## 🏗️  Build the project for production
	@node --run vite -- build

preview: build ## 🧐 Preview the production built
	@node --run vite -- preview

clean: ## 🧹 Clean the project
	@rm -rf dist

lint: ## 🧬 Check code by eslint and stylelint
	@bash -c '\
		node --run eslint & pid1=$$! ; \
		node --run stylelint & pid2=$$! ; \
		wait $$pid1 ; code1=$$? ; \
		wait $$pid2 ; code2=$$? ; \
		if [ $$code1 -ne 0 ] || [ $$code2 -ne 0 ]; then exit 1 ; fi \
	'

test: lint ## 🧪 Run tests
	@node --run test

optimize: ## 🖼️  Optimize graphic assets
	@pnpm exec optimize assets

setup: ## 🛠️  Setup the project environment
	$(call remove_wrong_installation)
	$(call install_pnpm)
	$(call update_pnpm)
	$(call install_dependencies)
	$(call setup_githooks)

help: ## 🧾 Print this message
	@printf "\n\t📜 $(ANSI_BOLD)Available targets:$(ANSI_RESET)\n\n"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## ' $(MAKEFILE_LIST) \
	| awk -F ':|##' '\
	BEGIN { \
		ANSI_BOLD_CYAN = "$(ANSI_BOLD_CYAN)"; \
		ANSI_RESET = "$(ANSI_RESET)"; \
	} \
	{ \
		targets[NR]=$$1; descs[NR]=$$3; \
		if (length($$1) > max) max = length($$1); \
	} \
	END { \
		for (i = 1; i <= NR; i++) { \
			printf "\t%s%" max "s%s —%s\n", ANSI_BOLD_CYAN, targets[i], ANSI_RESET, descs[i]; \
		} \
		printf "\n" \
	}'

.PHONY: prepare start build preview lint help clean optimize

REQUIRED_PNPM := ^10.14.0

ANSI_RESET := \033[0m
ANSI_BOLD := \033[1m
ANSI_BOLD_CYAN := \033[1;36m

define remove_wrong_installation
    @test ! -f package-lock.json -o -f yarn.lock || rm -rf package-lock.json yarn.lock node_modules
endef

define install_pnpm
	@command -v pnpm >/dev/null 2>&1 || curl -fsSL https://get.pnpm.io/install.sh | sh -
endef

define update_pnpm
	@pnpm dlx semver -- $$(pnpm -v) -r $(REQUIRED_PNPM) >/dev/null 2>&1 || pnpm self-update
endef

define install_dependencies
	@test -d node_modules || pnpm install
endef

define setup_githooks
	@git config --local core.hooksPath .githooks
endef
