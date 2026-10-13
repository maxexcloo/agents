set -g codex_sandbox_flags \
    -c 'sandbox_workspace_write.network_access=true' \
    -c 'sandbox_workspace_write.writable_roots=["/Users/max.schaefer/Library/Caches/prek","/Users/max.schaefer/Library/Caches/uv"]'

alias codex='safe codex $codex_sandbox_flags --no-daemon'
alias codex-docker='safe-docker codex $codex_sandbox_flags --no-daemon'
alias codex-infra='safe-infra codex $codex_sandbox_flags --no-daemon'
alias codex-unsafe='command codex $codex_sandbox_flags --no-daemon'

complete -c codex-docker -w codex
complete -c codex-infra -w codex
complete -c codex-unsafe -w codex
