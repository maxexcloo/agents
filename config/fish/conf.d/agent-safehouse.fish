alias safe='command safehouse --add-dirs="$HOME/Library/Caches/prek:$HOME/Library/Caches/uv" --add-dirs-ro="$HOME/.agents"'
alias safe-docker='safe-infra --enable=docker'
alias safe-infra='safe --append-profile="$__fish_config_dir/conf.d/agent-safehouse-infra.sb" --enable=1password,kubectl,ssh'
