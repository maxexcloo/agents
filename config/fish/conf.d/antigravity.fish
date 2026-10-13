alias agy='antigravity'
alias agy-docker='antigravity-docker'
alias agy-infra='antigravity-infra'
alias agy-unsafe='antigravity-unsafe'

alias antigravity='safe --add-dirs="$HOME/.gemini" antigravity'
alias antigravity-docker='safe-docker --add-dirs="$HOME/.gemini" antigravity'
alias antigravity-infra='safe-infra --add-dirs="$HOME/.gemini" antigravity'
alias antigravity-unsafe='command antigravity'

complete -c agy -w antigravity
complete -c agy-docker -w antigravity
complete -c agy-infra -w antigravity
complete -c agy-unsafe -w antigravity
complete -c antigravity-docker -w antigravity
complete -c antigravity-infra -w antigravity
complete -c antigravity-unsafe -w antigravity
