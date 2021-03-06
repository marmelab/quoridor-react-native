.PHONY: test

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install the environment
	cd quoridor-app && npm install && cp -n environment.js.dist environment.js

start: ## Start the server
	cd quoridor-app && npm start

test: ## Run tests
	cd quoridor-app && npm test
