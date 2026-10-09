# Keep native permissions; avoid sharing a server across Safehouse boundaries.

function codex
    safe codex \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        --no-daemon \
        $argv
end

function codex-docker
    safe-docker codex \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        --no-daemon \
        $argv
end

function codex-infra
    safe-infra codex \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        --no-daemon \
        $argv
end

function codex-unsafe
    command codex \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        --no-daemon \
        $argv
end

complete -c codex-docker -w codex
complete -c codex-infra -w codex
complete -c codex-unsafe -w codex
