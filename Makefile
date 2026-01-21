.PHONY: clean
clean: 
	@echo Deep cleanning project environment...
	@echo Purging .next...
	@rm -fr .next
	@echo Purging .vscode...
	@rm -fr .vscode
	@echo Purging node_modules...
	@rm -fr node_modules
	@echo Reinstalling dependencies modules...
	bun

.PHONY: dev
dev:
	bun dev

dev-clean: clean dev

.PHONY: production
production:
	@echo Building production AP client app...
	bun run build
	@echo Starting production AP client app...
	bun start

production-clean: clean production

add-gitlab-remote:
	@echo Adding Gitlab Remote
	git remote add gitlab https://gitlab.com/quiet-node/ap-gift-card-client

push-gitlab:
	@echo Pushing production Ap Client app to gitlab
	git push gitlab main
	