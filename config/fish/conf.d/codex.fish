# Keep native permissions; avoid sharing a server across Safehouse boundaries.
function codex
    safe codex --no-daemon \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        $argv
end

function codex-infra
    safe-infra codex --no-daemon \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        $argv
end

function codex-unsafe
    command codex --no-daemon \
        -c 'sandbox_workspace_write.network_access=true' \
        -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]' \
        $argv
end

complete -c codex-infra -w codex
complete -c codex-unsafe -w codex
