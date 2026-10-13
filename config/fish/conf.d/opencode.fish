set -g opencode_dirs "$HOME/Library/Caches/opencode:$HOME/.local/share/opencode:$HOME/.local/state/opencode:$HOME/.config/opencode"
set -g opencode_subcommands acp api auth debug mcp mini models pair plugin reload run serve service session stats uninstall update upgrade

function __opencode_flags
    if test (count $argv) -eq 0; or not contains -- $argv[1] $opencode_subcommands
        echo --standalone
    end
end

alias opencode='safe --add-dirs="$opencode_dirs" opencode (__opencode_flags $argv)'
alias opencode-docker='safe-docker --add-dirs="$opencode_dirs" opencode (__opencode_flags $argv)'
alias opencode-infra='safe-infra --add-dirs="$opencode_dirs" opencode (__opencode_flags $argv)'
alias opencode-unsafe='command opencode (__opencode_flags $argv)'
alias opencode2='opencode'
alias opencode2-docker='opencode-docker'
alias opencode2-infra='opencode-infra'
alias opencode2-unsafe='opencode-unsafe'

complete -c opencode2 -w opencode
complete -c opencode2-docker -w opencode
complete -c opencode2-infra -w opencode
complete -c opencode2-unsafe -w opencode
complete -c opencode-docker -w opencode
complete -c opencode-infra -w opencode
complete -c opencode-unsafe -w opencode
