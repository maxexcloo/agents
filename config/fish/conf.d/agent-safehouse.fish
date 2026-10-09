function safe
    command safehouse \
        --add-dirs="$HOME/Library/Caches/prek:$HOME/Library/Caches/uv" \
        --add-dirs-ro="$HOME/.agents" \
        $argv
end

function safe-docker
    safe-infra --enable=docker $argv
end

function safe-infra
    safe \
        --append-profile="$__fish_config_dir/conf.d/agent-safehouse-infra.sb" \
        --enable=1password,kubectl,ssh \
        $argv
end
