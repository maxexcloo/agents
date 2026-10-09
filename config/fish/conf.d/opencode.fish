function opencode
    safe --add-dirs="$HOME/Library/Caches/opencode" opencode $argv
end

function opencode-infra
    safe-infra --add-dirs="$HOME/Library/Caches/opencode" opencode $argv
end

function opencode-unsafe
    command opencode $argv
end

complete -c opencode-infra -w opencode
complete -c opencode-unsafe -w opencode
