function agy
    antigravity $argv
end

function agy-docker
    antigravity-docker $argv
end

function agy-infra
    antigravity-infra $argv
end

function agy-unsafe
    antigravity-unsafe $argv
end

function antigravity
    safe --add-dirs="$HOME/.gemini" antigravity $argv
end

function antigravity-docker
    safe-infra --enable=docker --add-dirs="$HOME/.gemini" antigravity $argv
end

function antigravity-infra
    safe-infra --add-dirs="$HOME/.gemini" antigravity $argv
end

function antigravity-unsafe
    command antigravity $argv
end

complete -c agy -w antigravity
complete -c agy-docker -w antigravity
complete -c agy-infra -w antigravity
complete -c agy-unsafe -w antigravity
complete -c antigravity-docker -w antigravity
complete -c antigravity-infra -w antigravity
complete -c antigravity-unsafe -w antigravity
