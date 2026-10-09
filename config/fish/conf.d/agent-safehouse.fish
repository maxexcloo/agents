function safe
    command safehouse \
        --add-dirs-ro="$HOME/.agents" \
        --add-dirs="$HOME/Library/Caches/prek:$HOME/Library/Caches/uv" \
        $argv
end

function safe-infra
    safe \
        --enable=1password,kubectl,ssh \
        --append-profile="$__fish_config_dir/conf.d/agent-safehouse-infra.sb" \
        $argv
end

function safe-docker
    safe-infra --enable=docker $argv
end
